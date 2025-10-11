import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function SalesCreate() {
  const { id } = useParams();
  const token = localStorage.getItem("accessToken");

  const [visit, setVisit] = useState(null);
  const [salesItems, setSalesItems] = useState([]);
  const [isFinalOrder, setIsFinalOrder] = useState(false);
  const [stage, setStage] = useState("Proposal or Negotiation");
  const [status, setStatus] = useState("");
  const [reasonLost, setReasonLost] = useState(""); // ✅ rename for clarity
  const [paymentAmounts, setPaymentAmounts] = useState({});
  const [saving, setSaving] = useState(false);

  // Fetch visit details
  useEffect(() => {
    if (!id) return;

    axios
      .get(`http://127.0.0.1:8000/visits/visit-details/${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const visitData = res.data;
        setVisit(visitData);
        setStage("Proposal or Negotiation");

        const cachedProducts = JSON.parse(
          localStorage.getItem(`visit_products_${id}`) || "[]"
        );

        const products =
          visitData.products_interested?.length > 0
            ? visitData.products_interested
            : cachedProducts;

        const existingItems = visitData.sales_items || [];

        const newSalesItems = products.map((p, idx) => {
          const savedItem = existingItems.find((si) => si.product === p.id);
          return {
            product: p.id,
            product_name: p.product_name || "Unnamed Product",
            price: savedItem ? savedItem.price : "",
            key: `${p.id}-${idx}`,
          };
        });

        localStorage.setItem(`visit_products_${id}`, JSON.stringify(products));
        setSalesItems(newSalesItems);
      })
      .catch((err) => console.error("Failed to fetch visit details:", err));
  }, [id, token]);

  // Update price for each product
  const handlePriceChange = (index, value) => {
    setSalesItems((prev) => {
      const items = [...prev];
      items[index].price = value;
      return items;
    });
  };

  // Update payment for each product
  const handlePaymentChange = (productId, value) => {
    setPaymentAmounts((prev) => ({ ...prev, [productId]: value }));
  };

  // Submit sales data
  const handleSubmit = async () => {
    if (!visit || saving) return;
    setSaving(true);

    try {
      // Build payments array only if in Payment Followup stage
      const paymentsArray =
        stage === "Payment Followup"
          ? salesItems
              .map((item) => ({
                product: item.product,
                amount: Number(paymentAmounts[item.product]) || 0,
              }))
              .filter((p) => p.amount > 0)
          : [];

      const payload = {
        is_order_final: isFinalOrder,
        items: salesItems.map((item) => ({
          product: item.product,
          price: Number(item.price) || 0,
        })),
        ...(stage === "Closing" && { status }),
        ...(status === "Lost" && { reason_lost: reasonLost }), // ✅ match serializer
        ...(paymentsArray.length > 0 && { payments: paymentsArray }),
      };

      await axios.post(
        `http://127.0.0.1:8000/sales/create-from-visit/${id}/`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Saved successfully!");
    } catch (err) {
      console.error(err);
      const message =
        err.response?.data ? JSON.stringify(err.response.data) : "Failed to save sales.";
      alert(message);
    } finally {
      setSaving(false);
    }
  };

  const handleNextStage = () => {
    if (stage === "Proposal or Negotiation") {
      if (!isFinalOrder) {
        alert("Mark as Final Order to proceed to Closing stage.");
        return;
      }
      setStage("Closing");
    } else if (stage === "Closing") {
      if (!status) {
        alert("Select status to proceed.");
        return;
      }
      if (status === "Lost" && !reasonLost) {
        alert("Enter reason for lost sale to proceed.");
        return;
      }
      if (status === "Won") {
        setStage("Payment Followup");
      }
    }
  };

  const totalPrice = salesItems.reduce(
    (sum, item) => sum + (Number(item.price) || 0),
    0
  );

  return (
    <div className="container mt-5">
      <h4>Sales for {visit?.company_name || "Unknown Company"}</h4>
      <p>
        <strong>Stage:</strong> {stage}
      </p>

      {/* Proposal / Negotiation Stage */}
      {stage === "Proposal or Negotiation" && (
        <>
          {salesItems.length > 0 ? (
            <table className="table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {salesItems.map((item, idx) => (
                  <tr key={item.key}>
                    <td>{item.product_name}</td>
                    <td>
                      <input
                        type="number"
                        className="form-control"
                        value={item.price}
                        onChange={(e) => handlePriceChange(idx, e.target.value)}
                        min={0}
                        placeholder="Enter price"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No products found.</p>
          )}

          <p>
            <strong>Total:</strong> {totalPrice}
          </p>

          <div className="form-check mb-3">
            <input
              type="checkbox"
              className="form-check-input"
              checked={isFinalOrder}
              onChange={(e) => setIsFinalOrder(e.target.checked)}
              id="finalOrderCheck"
            />
            <label htmlFor="finalOrderCheck" className="form-check-label">
              Mark as Final Order
            </label>
          </div>
        </>
      )}

      {/* Closing Stage */}
      {stage === "Closing" && (
        <>
          <div className="mb-3">
            <label>Status</label>
            <select
              className="form-select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">Select status</option>
              <option value="Won">Won</option>
              <option value="Lost">Lost</option>
              <option value="Paid">Paid</option>
            </select>
          </div>

          {status === "Lost" && (
            <div className="mb-3">
              <textarea
                className="form-control"
                placeholder="Enter reason"
                value={reasonLost} // ✅ updated
                onChange={(e) => setReasonLost(e.target.value)}
                rows={3}
              />
            </div>
          )}
        </>
      )}

      {/* Payment Follow-up Stage */}
      {stage === "Payment Followup" && (
        <>
          <h5>Enter Payments</h5>
          <table className="table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Payment Amount</th>
              </tr>
            </thead>
            <tbody>
              {salesItems.map((item) => (
                <tr key={item.key}>
                  <td>{item.product_name}</td>
                  <td>
                    <input
                      type="number"
                      className="form-control"
                      value={paymentAmounts[item.product] || ""}
                      onChange={(e) =>
                        handlePaymentChange(item.product, e.target.value)
                      }
                      min={0}
                      max={Number(item.price) || undefined}
                      placeholder="Enter payment amount"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {/* Action Buttons */}
      <div className="d-flex gap-3 mt-3">
        <button
          className="btn btn-primary"
          onClick={handleSubmit}
          disabled={saving}
        >
          Save
        </button>

        {stage !== "Payment Followup" && (
          <button className="btn btn-success" onClick={handleNextStage}>
            Next Stage →
          </button>
        )}
      </div>
    </div>
  );
}
