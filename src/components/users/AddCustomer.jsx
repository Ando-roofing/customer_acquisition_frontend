// src/components/AddCustomer.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function AddCustomer() {
  const [companyName, setCompanyName] = useState("");
  const [designation, setDesignation] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  const [contacts, setContacts] = useState([{ contact_name: "", contact_detail: "" }]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  const addContact = () => {
    setContacts([...contacts, { contact_name: "", contact_detail: "" }]);
  };

  const removeContact = (index) => {
    setContacts(contacts.filter((_, i) => i !== index));
  };

  const handleContactChange = (index, field, value) => {
    const newContacts = [...contacts];
    newContacts[index][field] = value;
    setContacts(newContacts);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const payload = {
      company_name: companyName,
      designation,
      location,
      email,
      contacts: contacts.filter((c) => c.contact_name && c.contact_detail),
    };

    try {
      await axios.post("http://127.0.0.1:8000/customers/customers/create/", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMessage({ type: "success", text: "✅ Customer added successfully!" });
      setCompanyName("");
      setDesignation("");
      setLocation("");
      setEmail("");
      setContacts([{ contact_name: "", contact_detail: "" }]);

      // Redirect after 2 seconds
      setTimeout(() => navigate("/customers"), 2000);
    } catch (err) {
      console.error(err);
      setMessage({
        type: "error",
        text: "❌ Failed to create customer. Please check details and try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-sm p-4">
        <h2 className="text-center text-primary mb-4">
          <i className="fas fa-user-plus me-2"></i> Add New Customer
        </h2>

        {/* ✅ Success or Error Message */}
        {message && (
          <div
            className={`alert ${
              message.type === "success" ? "alert-success" : "alert-danger"
            } text-center`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Company Info */}
          <div className="row g-3 mb-3">
            <div className="col-md-6">
              <label className="form-label">
                <i className="fas fa-building me-2"></i> Company Name
              </label>
              <input
                type="text"
                className="form-control"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
              />
            </div>

            {/* Designation Dropdown */}
            <div className="col-md-6">
              <label className="form-label">
                <i className="fas fa-id-badge me-2"></i> Designation
              </label>
              <select
                className="form-select"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                required
              >
                <option value="">Select Designation</option>
                <option value="Owner">Owner</option>
                <option value="Engineer">Engineer</option>
                <option value="Contractor">Contractor</option>
              </select>
            </div>

            <div className="col-md-6">
              <label className="form-label">
                <i className="fas fa-map-marker-alt me-2"></i> Location
              </label>
              <input
                type="text"
                className="form-control"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">
                <i className="fas fa-envelope me-2"></i> Email
              </label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Contacts Section */}
          <h5 className="mt-4 mb-3">
            <i className="fas fa-address-book me-2"></i> Contacts
          </h5>
          {contacts.map((contact, index) => (
            <div className="row g-3 mb-3 align-items-end" key={index}>
              <div className="col-md-5">
                <label className="form-label">
                  <i className="fas fa-user me-2"></i> Contact Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={contact.contact_name}
                  onChange={(e) => handleContactChange(index, "contact_name", e.target.value)}
                  required
                />
              </div>
              <div className="col-md-5">
                <label className="form-label">
                  <i className="fas fa-phone me-2"></i> Contact Number
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={contact.contact_detail}
                  onChange={(e) => handleContactChange(index, "contact_detail", e.target.value)}
                  required
                />
              </div>
              <div className="col-md-2">
                {index === 0 ? (
                  <button type="button" className="btn btn-success w-100" onClick={addContact}>
                    <i className="fas fa-plus"></i>
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn btn-danger w-100"
                    onClick={() => removeContact(index)}
                  >
                    <i className="fas fa-minus"></i>
                  </button>
                )}
              </div>
            </div>
          ))}

          {/* ✅ Left-aligned Save Button with Loading Spinner */}
          <div className="mt-4 text-start">
            <button
              type="submit"
              className="btn btn-primary btn-gradient btn-lg"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Saving...
                </>
              ) : (
                <>
                  <i className="fas fa-save me-2"></i> Save Customer
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
