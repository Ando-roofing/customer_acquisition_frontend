import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaSearch } from "react-icons/fa"; // search icon

export default function SalesList() {
  const [sales, setSales] = useState([]);
  const [filteredSales, setFilteredSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchCustomer, setSearchCustomer] = useState("");
  const token = localStorage.getItem("accessToken");

  // Fetch sales
  useEffect(() => {
    const fetchSales = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/sales/sales-list/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSales(res.data);
        setFilteredSales(res.data);
      } catch (err) {
        console.error("Error fetching sales:", err);
        setError("Failed to fetch sales.");
      } finally {
        setLoading(false);
      }
    };

    fetchSales();
  }, [token]);

  // Filter by customer dynamically
  useEffect(() => {
    const filtered = sales.filter((sale) =>
      (sale.customer_name || "")
        .toLowerCase()
        .includes(searchCustomer.toLowerCase())
    );
    setFilteredSales(filtered);
  }, [searchCustomer, sales]);

  if (loading) return <div className="text-center mt-5">Loading sales...</div>;
  if (error) return <div className="alert alert-danger mt-5">{error}</div>;

  // Map status to Bootstrap badge classes
  const getStatusBadge = (status) => {
    switch (status) {
      case "Open":
        return "bg-secondary";
      case "Paid":
        return "bg-success";
      case "Won":
        return "bg-primary";
      case "Lost":
        return "bg-danger";
      default:
        return "bg-secondary";
    }
  };

  return (
    <div className="container mt-5">
      <h3 className="mb-4">All Sales Orders</h3>

      {/* Search input */}
      <div className="input-group mb-3">
        <span className="input-group-text" id="search-addon">
          <FaSearch />
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="Search by customer"
          value={searchCustomer}
          onChange={(e) => setSearchCustomer(e.target.value)}
        />
      </div>

      {filteredSales.length === 0 ? (
        <div className="alert alert-info">No sales found.</div>
      ) : (
        <table className="table table-striped table-hover shadow-sm">
          <thead className="table-primary">
            <tr>
              <th>#</th>
              <th>Customer</th>
              <th>Total Price</th>
              <th>Final Order</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredSales.map((sale, index) => (
              <tr key={sale.id}>
                <td>{index + 1}</td>
                <td>{sale.customer_name || "N/A"}</td>
                <td>{sale.total_price ? `${sale.total_price} TZS` : "0"}</td>
                <td>
                  {sale.is_order_final ? (
                    <span className="badge bg-success">Yes</span>
                  ) : (
                    <span className="badge bg-danger">No</span>
                  )}
                </td>
                <td>
                  {sale.status ? (
                    <span className={`badge ${getStatusBadge(sale.status)}`}>
                      {sale.status}
                    </span>
                  ) : (
                    <span className="badge bg-secondary">N/A</span>
                  )}
                </td>
                <td>{new Date(sale.created_at).toLocaleDateString()}</td>
                <td>
                  <Link
                    to={`/sales-details/${sale.id}`}
                    className="btn btn-sm btn-outline-primary"
                  >
                    View
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
