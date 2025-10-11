import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

export default function SaleDetail() {
  const { id } = useParams();
  const token = localStorage.getItem("accessToken");

  const [sale, setSale] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSale = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/sales/sales-details/${id}/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
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

  if (loading) return <div className="text-center mt-5">Loading sale details...</div>;
  if (error) return <div className="alert alert-danger mt-5">{error}</div>;
  if (!sale) return <div className="alert alert-warning mt-5">Sale not found.</div>;

  return (
    <div className="container mt-5">
      <h3>Sale Details for {sale.customer_name || "Unknown Customer"}</h3>
      <p>
        <strong>Status:</strong>{" "}
        <span className={`badge ${sale.status === "Paid" ? "bg-success" : "bg-info text-dark"}`}>
          {sale.status || "N/A"}
        </span>
      </p>
      <p>
        <strong>Final Order:</strong>{" "}
        {sale.is_order_final ? <span className="badge bg-success">Yes</span> : <span className="badge bg-secondary">No</span>}
      </p>
      <p>
        <strong>Total Price:</strong> {(sale.total_price || 0).toLocaleString()} TZS
      </p>

      <h5>Products</h5>
      {sale.items?.length > 0 ? (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {sale.items.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.product_name || "Unnamed Product"}</td>
                <td>{Number(item.price).toLocaleString()} TZS</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No products found.</p>
      )}

      {sale.remaining_balance > 0 && (
        <p>
          <strong>Remaining Balance:</strong> {Number(sale.remaining_balance).toLocaleString()} TZS
        </p>
      )}

      <Link to="/sale-list" className="btn btn-secondary mt-3">
        ← Back to Sales List
      </Link>
    </div>
  );
}
