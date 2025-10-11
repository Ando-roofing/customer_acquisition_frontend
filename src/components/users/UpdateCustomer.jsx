import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

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

  // ✅ Fetch existing customer details
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

  const addContact = () => setContacts([...contacts, { contact_name: "", contact_detail: "" }]);
  const removeContact = (index) => setContacts(contacts.filter((_, i) => i !== index));

  const handleContactChange = (index, field, value) => {
    const newContacts = [...contacts];
    newContacts[index][field] = value;
    setContacts(newContacts);
  };

  // ✅ Handle update (no redirect)
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
    <div className="container mt-5">
      <div className="card shadow-sm p-4">
        <h2 className="text-center text-primary mb-4">
          <i className="fas fa-edit me-2"></i> Update Customer
        </h2>

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

          {/* Left-aligned Update Button */}
          <div className="mt-4 text-start">
            <button type="submit" className="btn btn-primary btn-gradient btn-lg" disabled={loading}>
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Updating...
                </>
              ) : (
                <>
                  <i className="fas fa-save me-2"></i> Update Customer
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
