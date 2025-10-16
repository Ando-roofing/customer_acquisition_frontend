// src/components/AddCustomer.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/AddVisit.css"; // Use same styles as AddVisit

export default function AddCustomer() {
  const [companyName, setCompanyName] = useState("");
  const [customerType, setCustomerType] = useState("Company"); // Default to Company
  const [designation, setDesignation] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  const [contacts, setContacts] = useState([{ contact_name: "", contact_detail: "" }]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  const addContact = () => setContacts([...contacts, { contact_name: "", contact_detail: "" }]);
  const removeContact = (index) => setContacts(contacts.filter((_, i) => i !== index));
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
      customer_type: customerType,
      designation: customerType === "Company" ? designation : "", // Only include if Company
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
      setCustomerType("Company");
      setDesignation("");
      setLocation("");
      setEmail("");
      setContacts([{ contact_name: "", contact_detail: "" }]);
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
    <div className="container-fluid py-3">
      <div
        className="p-4 rounded-4 shadow-sm bg-transparent"
        style={{ maxWidth: "600px", marginLeft: "20px" }}
      >
        <h3 className="text-primary mb-4 fw-bold d-flex align-items-center">
          <i className="fas fa-user-plus me-2"></i> Add New Customer
        </h3>

        {message && (
          <div className={`alert ${message.type === "success" ? "alert-success" : "alert-danger"}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Company Name */}
          <div className="mb-3">
            <label className="form-label fw-semibold">
              <i className="fas fa-building me-2"></i>Customer Name
            </label>
            <input
              type="text"
              className="form-control subtle-border"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Enter company name"
              required
            />
          </div>

          {/* Customer Type */}
          <div className="mb-3">
            <label className="form-label fw-semibold">
              <i className="fas fa-users me-2"></i> Customer Type
            </label>
            <select
              className="form-select subtle-border"
              value={customerType}
              onChange={(e) => setCustomerType(e.target.value)}
              required
            >
              <option value="Individual">Individual</option>
              <option value="Company">Company</option>
            </select>
          </div>

          {/* Designation (Only visible for Company) */}
          {customerType === "Company" && (
            <div className="mb-3">
              <label className="form-label fw-semibold">
                <i className="fas fa-id-badge me-2"></i> Designation
              </label>
              <select
                className="form-select subtle-border"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                required={customerType === "Company"}
              >
                <option value="">Select Designation</option>
                <option value="Owner">Owner</option>
                <option value="Engineer">Engineer</option>
                <option value="Contractor">Contractor</option>
              </select>
            </div>
          )}

          {/* Location */}
          <div className="mb-3">
            <label className="form-label fw-semibold">
              <i className="fas fa-map-marker-alt me-2"></i> Location
            </label>
            <input
              type="text"
              className="form-control subtle-border"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter location"
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label fw-semibold">
              <i className="fas fa-envelope me-2"></i> Email
            </label>
            <input
              type="email"
              className="form-control subtle-border"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              required
            />
          </div>

          {/* Contacts */}
          <h5 className="mt-4 mb-3 fw-semibold">
            <i className="fas fa-address-book me-2"></i> Contacts
          </h5>
          {contacts.map((contact, index) => (
            <div className="mb-3" key={index}>
              <input
                type="text"
                className="form-control subtle-border mb-2"
                value={contact.contact_name}
                onChange={(e) => handleContactChange(index, "contact_name", e.target.value)}
                placeholder="Contact Name"
                required
              />
              <input
                type="text"
                className="form-control subtle-border mb-2"
                value={contact.contact_detail}
                onChange={(e) => handleContactChange(index, "contact_detail", e.target.value)}
                placeholder="Contact Number"
                required
              />
              <div className="d-flex gap-2">
                {index === 0 ? (
                  <button type="button" className="btn btn-success" onClick={addContact}>
                    <i className="fas fa-plus"></i> Add Contact
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => removeContact(index)}
                  >
                    <i className="fas fa-minus"></i> Remove
                  </button>
                )}
              </div>
            </div>
          ))}

          {/* Submit Button */}
          <div className="mt-4 text-start">
            <button type="submit" className="btn btn-primary px-3 fw-semibold rounded-3" disabled={loading}>
              {loading ? "Saving Customer..." : "Save Customer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
