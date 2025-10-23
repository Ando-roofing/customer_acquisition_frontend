import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaTag, FaCashRegister, FaCheckCircle } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/AddVisit.css";

const STAGES = {
  PROPOSAL: "Proposal",
  CLOSING: "Closing",
  PAYMENT: "Payment Followup",
};

// Stable Payment Input to prevent cursor loss
const PaymentInput = React.memo(({ productId, value, onChange, max }) => {
  return (
    <input
      type="number"
      className="form-control text-end"
      value={value || ""}
      onChange={(e) => onChange(productId, e.target.value)}
      min={0}
      max={Number(max) || undefined}
      placeholder="Enter payment"
    />
  );
});

export default function SalesCreate() {
  const { id } = useParams();
  const token = localStorage.getItem("accessToken");

  const [visit, setVisit] = useState(null);
  const [salesItems, setSalesItems] = useState([]);
  const [isFinalOrder, setIsFinalOrder] = useState(false);
  const [stage, setStage] = useState(STAGES.PROPOSAL);
  const [status, setStatus] = useState("");
  const [reasonLost, setReasonLost] = useState("");
  const [paymentAmounts, setPaymentAmounts] = useState({});
  const [saving, setSaving] = useState(false);

  const lsKey = (k) => `sales_${id}_${k}`;
  const getLocal = (key, fallback = null) => {
    const v = localStorage.getItem(lsKey(key));
    if (v === "true") return true;
    if (v === "false") return false;
    return v || fallback;
  };

  // Reset reasonLost only if status changes from Lost to something else
  useEffect(() => {
    if (status !== "Lost") setReasonLost("");
  }, [status]);

  const fetchVisit = async () => {
    try {
      const visitRes = await axios.get(
        `http://127.0.0.1:8000/visits/visit-details/${id}/`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const visitData = visitRes.data;
      setVisit(visitData);

      let existingSale = null;
      try {
        const saleRes = await axios.get(
          `http://127.0.0.1:8000/sales/from-visit/${id}/`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        existingSale = saleRes.data;
      } catch {
        existingSale = null;
      }

      let newStage = getLocal("stage", STAGES.PROPOSAL);
      if (existingSale) {
        if (existingSale.is_order_final) newStage = STAGES.CLOSING;
        else if (existingSale.status === "Won") newStage = STAGES.PAYMENT;
        else if (existingSale.status) newStage = STAGES.CLOSING;
      } else if (visitData.acquisition_stage === "Closing") newStage = STAGES.CLOSING;
      else if (visitData.acquisition_stage === "Payment Followup") newStage = STAGES.PAYMENT;

      setStage(newStage);
      localStorage.setItem(lsKey("stage"), newStage);

      if (existingSale) {
        setIsFinalOrder(!!existingSale.is_order_final);
        setStatus(existingSale.status || "");
      
        setReasonLost((prev) => existingSale.reason_lost ?? prev ?? "");
      } else {
        setIsFinalOrder(getLocal("isFinal", false));
        setStatus(getLocal("status", ""));
        setReasonLost(getLocal("reason", ""));
      }

      const cachedProducts = JSON.parse(localStorage.getItem(`visit_products_${id}`) || "[]");
      const products = visitData.products_interested?.length
        ? visitData.products_interested
        : cachedProducts;
      localStorage.setItem(`visit_products_${id}`, JSON.stringify(products));

      const existingItems = existingSale?.items || visitData.sales_items || [];
      const savedPrices = JSON.parse(localStorage.getItem(lsKey("prices")) || "{}");

      const items = products.map((p, idx) => {
        const savedItem = existingItems.find((si) => si.product === p.id) || {};
        const priceFromLS = savedPrices[p.id];
        return {
          product: p.id,
          product_name: p.product_name || p.name || `Product ${p.id}`,
          price: priceFromLS !== undefined ? priceFromLS : savedItem.price ?? "",
          key: `${p.id}-${idx}`,
        };
      });
      setSalesItems(items);
    } catch (err) {
      console.error("Error fetching visit:", err);
    }
  };

  useEffect(() => {
    if (!id) return;
    fetchVisit();
  }, [id, token]);

  useEffect(() => {
    if (id) localStorage.setItem(lsKey("isFinal"), isFinalOrder);
  }, [isFinalOrder, id]);

  useEffect(() => {
    if (id) localStorage.setItem(lsKey("status"), status);
  }, [status, id]);

  useEffect(() => {
    if (id) localStorage.setItem(lsKey("reason"), reasonLost);
  }, [reasonLost, id]);

  useEffect(() => {
    if (id) localStorage.setItem(lsKey("stage"), stage);
  }, [stage, id]);

  useEffect(() => {
    if (!id) return;
    const priceMap = {};
    salesItems.forEach((it) => {
      if (it.price !== "" && it.price !== null) priceMap[it.product] = it.price;
    });
    localStorage.setItem(lsKey("prices"), JSON.stringify(priceMap));
  }, [salesItems, id]);

  const handlePriceChange = (index, value) => {
    setSalesItems((prev) => {
      const clone = [...prev];
      clone[index].price = value;
      return clone;
    });
  };

  const handlePaymentChange = (productId, value) => {
    setPaymentAmounts((prev) => ({ ...prev, [productId]: value }));
  };

  const totalPrice = salesItems.reduce((sum, item) => sum + (Number(item.price) || 0), 0);

  const handleSubmit = async () => {
    if (!visit || saving) return;
    setSaving(true);
    try {
      const paymentsArray =
        stage === STAGES.PAYMENT
          ? salesItems
              .map((item) => ({
                product: item.product,
                amount: Number(paymentAmounts[item.product]) || 0,
              }))
              .filter((p) => p.amount > 0)
          : [];

      const payload = {
        items: salesItems.map((item) => ({
          product: item.product,
          price: Number(item.price) || 0,
        })),
        ...(stage === STAGES.PROPOSAL && { is_order_final: isFinalOrder }),
        ...(stage === STAGES.CLOSING && { status }),
        ...(status === "Lost" && { reason_lost: reasonLost }),
        ...(paymentsArray.length > 0 && { payments: paymentsArray }),
      };

      await axios.post(
        `http://127.0.0.1:8000/sales/create-from-visit/${id}/`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Saved successfully!");
      await fetchVisit();
    } catch (err) {
      console.error(err);
      alert("Failed to save sales.");
    } finally {
      setSaving(false);
    }
  };

  const handleNextStage = () => {
    if (stage === STAGES.PROPOSAL && !isFinalOrder) {
      alert("Mark as Final Order before proceeding.");
      return;
    }
    if (stage === STAGES.CLOSING) {
      if (!status) return alert("Select status to proceed.");
      if (status === "Lost" && !reasonLost) return alert("Enter reason before proceeding.");
    }

    const next =
      stage === STAGES.PROPOSAL
        ? STAGES.CLOSING
        : stage === STAGES.CLOSING
        ? STAGES.PAYMENT
        : STAGES.PAYMENT;
    setStage(next);
    localStorage.setItem(lsKey("stage"), next);
  };

  if (!visit)
    return (
      <div className="d-flex justify-content-center align-items-center vh-50">
        <div className="spinner-border text-primary" role="status" />
      </div>
    );

  return (
    <div className="container py-3" style={{ maxWidth: "95%" }}>
      <div
        className="border rounded-4 shadow-sm p-4"
        style={{ background: "transparent", border: "1px solid #ddd" }}
      >
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="fw-bold mb-0 text-primary d-flex align-items-center">
            <FaCashRegister className="me-2" />
            Sales for {visit.company_name}
          </h4>
          <span className="badge bg-light text-dark border px-3 py-2">{stage}</span>
        </div>

        {/* ---------- Bootstrap Table ---------- */}
        <div className="table-responsive mb-3">
          <table className="table table-bordered align-middle">
            <thead className="table-light">
              <tr>
                <th>Product</th>
                <th>Price (TZS)</th>
                {stage === STAGES.PAYMENT && <th>Payment (TZS)</th>}
              </tr>
            </thead>
            <tbody>
              {salesItems.map((item, index) => (
                <tr key={item.key}>
                  <td>{item.product_name}</td>
                  <td>
                    <input
                      type="number"
                      className="form-control text-end"
                      value={item.price}
                      onChange={(e) => handlePriceChange(index, e.target.value)}
                      disabled={isFinalOrder || stage === STAGES.PAYMENT}
                      placeholder="Enter price"
                    />
                  </td>
                  {stage === STAGES.PAYMENT && (
                    <td>
                      <PaymentInput
                        productId={item.product}
                        value={paymentAmounts[item.product]}
                        onChange={handlePaymentChange}
                        max={item.price}
                      />
                    </td>
                  )}
                </tr>
              ))}
              {salesItems.length === 0 && (
                <tr>
                  <td colSpan={stage === STAGES.PAYMENT ? 3 : 2}>No products found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ---------- Proposal Stage ---------- */}
        {stage === STAGES.PROPOSAL && (
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-start gap-3">
            <div>
              <h6>
                Total: <strong>{totalPrice.toLocaleString()} TZS</strong>
              </h6>
              <small className="text-muted">Edit prices until you mark final.</small>
            </div>

            <div className="d-flex flex-wrap gap-3">
              <div className="form-check">
                <input
                  id="finalOrderCheck"
                  className="form-check-input"
                  type="checkbox"
                  checked={isFinalOrder}
                  onChange={(e) => setIsFinalOrder(e.target.checked)}
                />
                <label className="form-check-label" htmlFor="finalOrderCheck">
                  <FaCheckCircle className="me-1" /> Final Order
                </label>
              </div>

              <button className="btn btn-primary btn-sm" onClick={handleSubmit} disabled={saving}>
                {saving ? "Saving..." : "Save"}
              </button>

              <button className="btn btn-success btn-sm" onClick={handleNextStage}>
                Next Stage →
              </button>
            </div>
          </div>
        )}

        {/* ---------- Closing Stage ---------- */}
        {stage === STAGES.CLOSING && (
          <div className="border rounded p-3 mt-3">
            <h6 className="fw-semibold mb-3 d-flex align-items-center">
              <FaTag className="me-2" /> Closing
            </h6>

            <div className="mb-3">
              <label className="form-label fw-semibold">Status</label>
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
                <label className="form-label fw-semibold">Reason for Lost</label>
                <textarea
                  className="form-control"
                  rows={3}
                  value={reasonLost}
                  onChange={(e) => setReasonLost(e.target.value)}
                />
              </div>
            )}

            <div className="d-flex flex-wrap justify-content-end gap-2">
              <button className="btn btn-primary btn-sm" onClick={handleSubmit} disabled={saving}>
                {saving ? "Saving..." : "Save"}
              </button>
              <button className="btn btn-success btn-sm" onClick={handleNextStage}>
                Proceed →
              </button>
            </div>
          </div>
        )}

        {/* ---------- Payment Stage ---------- */}
        {stage === STAGES.PAYMENT && (
          <div className="d-flex justify-content-end mt-3">
            <button className="btn btn-primary btn-sm" onClick={handleSubmit} disabled={saving}>
              {saving ? "Saving..." : "Save Payments"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
