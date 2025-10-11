import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function PaymentDetails() {
  const { customer_id } = useParams();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await axios.get(
          `http://127.0.0.1:8000/payments/payments-list/customer/${customer_id}/`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setPayments(res.data);
      } catch (err) {
        console.error("Error fetching customer payments:", err);
        setError("Failed to fetch payments.");
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, [customer_id, token]);

  if (loading) return <div className="text-center mt-5">Loading payments...</div>;
  if (error) return <div className="alert alert-danger mt-5">{error}</div>;

  const totalCollected = payments.reduce((sum, p) => sum + parseFloat(p.amount), 0);

  return (
    <div className="container mt-5">
      <h3 className="mb-4">
        Payments for {payments[0]?.customer_name || "Customer"}
      </h3>
      <h6 className="text-success mb-3">
        Total Collected: {totalCollected.toLocaleString()} TZS
      </h6>

      {payments.length === 0 ? (
        <div className="alert alert-info">No payments found.</div>
      ) : (
        <table className="table table-striped table-hover shadow-sm">
          <thead className="table-primary">
            <tr>
              <th>#</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p, index) => (
              <tr key={p.id}>
                <td>{index + 1}</td>
                <td>{parseFloat(p.amount).toLocaleString()} TZS</td>
                <td>{new Date(p.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
