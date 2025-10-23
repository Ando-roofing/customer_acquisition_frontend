import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

export default function SaleDetail() {
  const { id } = useParams();
  const token = localStorage.getItem("accessToken");

  const [sale, setSale] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSale = async () => {
      try {
        const res = await axios.get(
          `http://127.0.0.1:8000/sales/admin-sales-details/${id}/`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setSale(res.data);
      } catch (err) {
        console.error("Error fetching sale details:", err);
        setError("Failed to fetch sale details.");
      } finally {
        setLoading(false);
      }
    };
    fetchSale();
  }, [id, token]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error)
    return (
      <div className="container mt-5 text-center">
        <h5 className="text-danger">{error}</h5>
        <Link to="/sale-list" className="btn btn-secondary mt-3">
          ← Back to Sales List
        </Link>
      </div>
    );

  if (!sale)
    return (
      <div className="container mt-5 text-center">
        <h5 className="text-warning">Sale not found.</h5>
        <Link to="/admin-sale-list" className="btn btn-secondary mt-3">
          ← Back to Sales List
        </Link>
      </div>
    );

  // Helper function for conditional fields
  const renderField = (label, value) =>
    value ? (
      <p className="mb-1">
        <strong>{label}:</strong> {value}
      </p>
    ) : null;

  return (
    <div className="container py-3" style={{ maxWidth: "95%" }}>
      <div
        className="border rounded-4 shadow-sm p-4"
        style={{
          background: "transparent",
          border: "1px solid #ddd",
        }}
      >
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="fw-bold mb-0">
            <i className="bi bi-cash-stack me-2"></i>Sale Details
          </h4>
          <Link to="/sale-list" className="btn btn-outline-secondary btn-sm">
            <i className="bi bi-arrow-left"></i> Back
          </Link>
        </div>

        {/* Sale Overview */}
        <div className="row g-4">
          <div className="col-md-6">
            <h5 className="fw-bold text-dark">
              Customer: {sale.customer_name || "Unknown Customer"}
            </h5>
            {renderField(
              "Total Price",
              `${Number(sale.total_price || 0).toLocaleString()} TZS`
            )}
            {sale.remaining_balance > 0 &&
              renderField(
                "Remaining Balance",
                `${Number(sale.remaining_balance).toLocaleString()} TZS`
              )}
          </div>

          <div className="col-md-6">
            <p className="mb-1">
              <strong>Status:</strong>{" "}
              <span
                className={`badge ${
                  sale.status === "Paid"
                    ? "bg-success"
                    : sale.status === "Open"
                    ? "bg-warning text-dark"
                    : "bg-info text-dark"
                }`}
              >
                {sale.status || "N/A"}
              </span>
            </p>

            <p className="mb-1">
              <strong>Final Order:</strong>{" "}
              {sale.is_order_final ? (
                <span className="badge bg-success">Yes</span>
              ) : (
                <span className="badge bg-secondary">No</span>
              )}
            </p>

            {sale.created_at &&
              renderField(
                "Created At",
                new Date(sale.created_at).toLocaleString()
              )}
          </div>
        </div>

        {/* Products Section */}
        {sale.items?.length > 0 && (
          <>
            <hr className="my-4" />
            <div>
              <h6 className="fw-bold text-dark mb-3">Products</h6>
              <div className="table-responsive">
                <table className="table table-bordered align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th style={{ width: "60px" }}>#</th>
                      <th>Product Name</th>
                      <th>Price (TZS)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sale.items.map((item, index) => (
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>{item.product_name || "Unnamed Product"}</td>
                        <td>{Number(item.price).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* No products fallback */}
        {(!sale.items || sale.items.length === 0) && (
          <>
            <hr className="my-4" />
            <p className="text-muted">No products found for this sale.</p>
          </>
        )}
      </div>
    </div>
  );
}
