// src/components/UpdateCustomer.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../../styles/AddVisit.css"; // ✅ same shared style

export default function UpdateCustomer() {
  const { id } = useParams();
  const token = localStorage.getItem("accessToken");

  const [companyName, setCompanyName] = useState("");
  const [designation, setDesignation] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  const [contacts, setContacts] = useState([{ contact_name: "", contact_detail: "" }]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  // ✅ Fetch customer details
  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/customers/customers/${id}/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = res.data;
        setCompanyName(data.company_name || "");
        setDesignation(data.designation || "");
        setLocation(data.location || "");
        setEmail(data.email || "");
        setContacts(
          data.contacts?.length ? data.contacts : [{ contact_name: "", contact_detail: "" }]
        );
      } catch (err) {
        console.error("❌ Error fetching customer:", err);
        setMessage({ type: "error", text: "Failed to load customer details." });
      }
    };

    fetchCustomer();
  }, [id, token]);

  // ✅ Contact management
  const addContact = () => setContacts([...contacts, { contact_name: "", contact_detail: "" }]);
  const removeContact = (index) => setContacts(contacts.filter((_, i) => i !== index));
  const handleContactChange = (index, field, value) => {
    const newContacts = [...contacts];
    newContacts[index][field] = value;
    setContacts(newContacts);
  };

  // ✅ Update handler
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
      await axios.put(`http://127.0.0.1:8000/customers/customers/${id}/update/`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMessage({ type: "success", text: "✅ Customer updated successfully!" });
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "❌ Update failed. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid py-3">
      {/* aligned near sidebar, transparent background */}
      <div className="p-4 rounded-4 shadow-sm bg-transparent" style={{ maxWidth: "600px", marginLeft: "20px" }}>
        <h3 className="text-primary mb-4 fw-bold d-flex align-items-center">
          <i className="fas fa-edit me-2"></i> Update Customer
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
              <i className="fas fa-building me-2"></i> Company Name
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

          {/* Designation */}
          <div className="mb-3">
            <label className="form-label fw-semibold">
              <i className="fas fa-id-badge me-2"></i> Designation
            </label>
            <select
              className="form-select subtle-border"
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
                  <button type="button" className="btn btn-danger" onClick={() => removeContact(index)}>
                    <i className="fas fa-minus"></i> Remove
                  </button>
                )}
              </div>
            </div>
          ))}

          {/* Submit */}
          <div className="mt-4 text-start">
            <button type="submit" className="btn btn-primary px-3 fw-semibold rounded-3" disabled={loading}>
              {loading ? "Updating Customer..." : "Update Customer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
