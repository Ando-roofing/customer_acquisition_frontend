// src/components/AddCustomer.jsx
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
// Use same styles as AddVisit

export const New: React.FC = () => {
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
    <div className="page-wrapper">

      <div className="page-header d-print-none">
        <div className="container-xl">
          <div className="row g-2 align-items-center">
            <div className="col">
              {/* Page pre-title */}
              <div className="page-pretitle">Overview</div>
              <h1 className="page-title">Add New Customer</h1>
            </div>
            {/* Page title actions */}
            <div className="col-auto ms-auto d-print-none">
              <div className="btn-list">

                <Link to="/admin/customers" className="btn btn-danger btn-5 d-none d-sm-inline-block" >
                  {/* Download SVG icon from http://tabler.io/icons/icon/plus */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-x"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>
                  Cancel
                </Link>

              </div>
              {/* BEGIN MODAL */}
              {/* END MODAL */}
            </div>
          </div>
        </div>
      </div>

      <main id="content" className="page-body">
        <div className="container">
          <div className="col-md-9">
            <div className="card">
              <form onSubmit={handleSubmit}>
                <div className="card-body">
                  {message && (
                    <div className={`alert ${message.type === "success" ? "alert-success" : "alert-danger"}`}>
                      {message.text}
                    </div>
                  )}



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






                </div>
                <div className="card-body">
                  {/* Contacts */}
                  <label className="form-label fw-semibold">
                    Contacts
                  </label>
                  {contacts.map((contact, index) => (

                    <div className="mb-3" key={index}>
                      <div className="row g-2">
                        <div className="col">
                          <input
                            type="text"
                            className="form-control subtle-border mb-2"
                            value={contact.contact_name}
                            onChange={(e) => handleContactChange(index, "contact_name", e.target.value)}
                            placeholder="Contact Name"
                            required
                          /></div>
                        <div className="col">

                          <input
                            type="text"
                            className="form-control subtle-border mb-2"
                            value={contact.contact_detail}
                            onChange={(e) => handleContactChange(index, "contact_detail", e.target.value)}
                            placeholder="Contact Number"
                            required
                          /></div>
                        <div className="col-auto">



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

                      </div></div>
                  ))}
                </div>
                <div className="card-footer">

                  <button type="submit" className="btn btn-primary px-3 fw-semibold rounded-3" disabled={loading}>
                    {loading ? "Saving Customer..." : "Save Customer"}
                  </button>

                </div>
              </form>
            </div>

          </div>
          <div className="col-md-3"></div>

        </div>
      </main>
    </div>
  );
}
