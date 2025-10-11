import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa"; // Import search icon

export default function PaymentsList() {
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchCustomer, setSearchCustomer] = useState("");
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/payments/payments-list/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPayments(res.data);
        setFilteredPayments(res.data);
      } catch (err) {
        console.error("Error fetching payments:", err);
        setError("Failed to fetch payments.");
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, [token]);

  // Filter by customer
  useEffect(() => {
    const filtered = payments.filter((p) =>
      p.sales__customer__company_name.toLowerCase().includes(searchCustomer.toLowerCase())
    );
    setFilteredPayments(filtered);
  }, [searchCustomer, payments]);

  if (loading) return <div className="text-center mt-5">Loading payments...</div>;
  if (error) return <div className="alert alert-danger mt-5">{error}</div>;

  const totalCollectedAll = filteredPayments.reduce(
    (sum, p) => sum + parseFloat(p.total_collected || 0),
    0
  );
  const totalRemainingAll = filteredPayments.reduce(
    (sum, p) => sum + parseFloat(p.remaining_balance || 0),
    0
  );

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Customer Payment Summary</h3>
        <div className="text-end">
          <h6 className="mb-1 text-success">
            Total Collected: {totalCollectedAll.toLocaleString()} TZS
          </h6>
          <h6 className="text-danger">
            Total Remaining: {totalRemainingAll.toLocaleString()} TZS
          </h6>
        </div>
      </div>

      {/* Search by Customer */}
      <div className="mb-3" style={{ maxWidth: "400px" }}>
        <div className="input-group">
          <span className="input-group-text bg-white border-end-0">
            <FaSearch />
          </span>
          <input
            type="text"
            className="form-control border-start-0"
            placeholder="Search by Customer"
            value={searchCustomer}
            onChange={(e) => setSearchCustomer(e.target.value)}
          />
        </div>
      </div>

      {filteredPayments.length === 0 ? (
        <div className="alert alert-info">No payments found.</div>
      ) : (
        <table className="table table-striped table-hover shadow-sm">
          <thead className="table-primary">
            <tr>
              <th>#</th>
              <th>Customer</th>
              <th>Total Collected</th>
              <th>Remaining Balance</th>
              <th>Last Payment Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.map((p, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{p.sales__customer__company_name}</td>
                <td>{parseFloat(p.total_collected).toLocaleString()} TZS</td>
                <td
                  className={
                    parseFloat(p.remaining_balance) > 0
                      ? "text-danger fw-bold"
                      : "text-success fw-bold"
                  }
                >
                  {parseFloat(p.remaining_balance).toLocaleString()} TZS
                </td>
                <td>{new Date(p.last_payment_date).toLocaleString()}</td>
                <td>
                  <Link
                    to={`/payments/customer/${p.sales__customer__id}`}
                    className="btn btn-sm btn-outline-primary"
                  >
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
