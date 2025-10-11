import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
        const response = await axios.get(`http://127.0.0.1:8000/customers/customers/${id}/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
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
      <div className="d-flex justify-content-center align-items-center" style={{ height: "70vh" }}>
        <div className="spinner-border text-primary" role="status"></div>
        <span className="ms-2 text-primary fw-bold">Loading customer details...</span>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="text-center mt-5 text-danger">
        <h4>❌ Customer not found.</h4>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="card shadow-sm p-4">
        <h2 className="text-center text-primary mb-4">
          <i className="fas fa-user me-2"></i> Customer Details
        </h2>

        <div className="mb-4">
          <h5 className="text-secondary">Company Information</h5>
          <hr />
          <p><strong>Company Name:</strong> {customer.company_name}</p>
          <p><strong>Designation:</strong> {customer.designation}</p>
          <p><strong>Location:</strong> {customer.location}</p>
          <p><strong>Email:</strong> {customer.email}</p>
          <p><strong>Created At:</strong> {new Date(customer.created_at).toLocaleString()}</p>
        </div>

        <div className="mb-4">
          <h5 className="text-secondary">Contacts</h5>
          <hr />
          {customer.contacts && customer.contacts.length > 0 ? (
            <ul className="list-group">
              {customer.contacts.map((contact, index) => (
                <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                  <span><strong>{contact.contact_name}</strong></span>
                  <span>{contact.contact_detail}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>No contacts available.</p>
          )}
        </div>

        <div className="text-start mt-3">
          <button className="btn btn-secondary" onClick={() => navigate("/customers")}>
            <i className="fas fa-arrow-left me-2"></i> Back to Customers
          </button>
        </div>
      </div>
    </div>
  );
}
