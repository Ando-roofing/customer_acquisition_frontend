import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

export default function CustomerDetail() {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/customers/customers/${id}/`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setCustomer(response.data);
      } catch (error) {
        console.error("Error fetching customer details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomer();
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

  if (!customer) {
    return (
      <div className="container mt-5 text-center">
        <h5 className="text-danger">Customer not found.</h5>
        <Link to="/customers" className="btn btn-secondary mt-3">
          Back to Customers
        </Link>
      </div>
    );
  }

  // Helper to conditionally render fields
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
        style={{ background: "transparent", border: "1px solid #ddd" }}
      >
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="fw-bold mb-0">
            <i className="bi bi-person-circle me-2"></i>Customer Details
          </h4>
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={() => navigate("/customers")}
          >
            <i className="bi bi-arrow-left"></i> Back
          </button>
        </div>

        <div className="row g-4">
          <div className="col-md-6">
            {customer.company_name && (
              <h5 className="fw-bold text-dark">
                Company Name: {customer.company_name}
              </h5>
            )}
            {renderField("Designation", customer.designation)}
            {renderField("Location", customer.location)}
            {renderField("Email", customer.email)}
            {renderField(
              "Created At",
              new Date(customer.created_at).toLocaleString()
            )}
          </div>

          <div className="col-md-6">
            <h6 className="fw-bold text-dark mb-2">Contacts</h6>
            {customer.contacts && customer.contacts.length > 0 ? (
              <ul className="list-group">
                {customer.contacts.map((contact, index) => (
                  <li
                    key={index}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <span className="fw-semibold">{contact.contact_name}</span>
                    <span>{contact.contact_detail}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted">No contacts available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
