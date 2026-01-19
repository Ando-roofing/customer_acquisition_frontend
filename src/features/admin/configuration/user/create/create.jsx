// src/pages/auth/Register.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaBuilding,
  FaBriefcase,
  FaMapMarkerAlt,
  FaNetworkWired,
} from "react-icons/fa";

export function Create() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    contact: "",
    password1: "",
    password2: "",
    company_name: "",
    position: "",
    zone: "",
    branch: "",
  });

  const [branches, setBranches] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchBranches = async () => {
      if (!token) return console.error("No token found. Login required to fetch branches.");
      try {
        const res = await axios.get("http://127.0.0.1:8000/accounts/branches/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (Array.isArray(res.data)) setBranches(res.data);
      } catch (err) {
        console.error("Failed to fetch branches:", err);
        setError("Failed to load branches. Make sure you are logged in.");
      }
    };
    fetchBranches();
  }, [token]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    if (!token) {
      setError("You must be logged in to register a user.");
      setIsLoading(false);
      return;
    }

    try {
      await axios.post("http://127.0.0.1:8000/accounts/register/", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccessMessage("✅ User registered successfully!");
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        contact: "",
        password1: "",
        password2: "",
        company_name: "",
        position: "",
        zone: "",
        branch: "",
      });
    } catch (err) {
      if (err.response?.data) {
        const firstErrorField = Object.keys(err.response.data)[0];
        setError(err.response.data[firstErrorField][0]);
      } else {
        setError("❌ Registration failed. Try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="page-header d-print-none">
        <div className="container-xl">
          <div className="row g-2 align-items-center">
            <div className="col">
              {/* Page pre-title */}
              <div className="page-pretitle">Configuration</div>
              <h1 className="page-title">Register New User</h1>
            </div>
            {/* Page title actions */}
            <div className="col-auto ms-auto d-print-none">
              <div className="btn-list">


                <Link to="/admin/configuration/users" className="btn btn-danger btn-5 d-none d-sm-inline-block">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    focusable="false"
                    className="icon icon-2"
                  >
                    <path d="M12 5l0 14" />
                    <path d="M5 12l14 0" />
                  </svg> Cancel
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
          {error && <div className="alert alert-danger">{error}</div>}
          {successMessage && <div className="alert alert-success">{successMessage}</div>}
          <form onSubmit={handleSubmit}>
            <div className="card">
              <div className="card-body">
                <div className="mb-3">
                  <div className="row">
                    <div className="col">
                      <label className="form-label">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="first_name"
                        className="form-control subtle-border mb-2"
                        value={formData.first_name}
                        onChange={handleChange}
                        placeholder="Enter first name"
                        required
                      />
                    </div>
                    <div className="col">
                      <label className="form-label">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="last_name"
                        className="form-control subtle-border"
                        value={formData.last_name}
                        onChange={handleChange}
                        placeholder="Enter last name"
                        required
                      />
                    </div>
                  </div>
                </div>





                {/* Email */}
                <div className="mb-3">
                  <label className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="form-control subtle-border"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email"
                    required
                  />
                </div>

                {/* Contact */}
                <div className="mb-3">
                  <label className="form-label">
                    Contact
                  </label>
                  <input
                    type="text"
                    name="contact"
                    className="form-control subtle-border"
                    value={formData.contact}
                    onChange={handleChange}
                    placeholder="Enter contact number"
                    required
                  />
                </div>

                {/* Passwords */}
                <div className="mb-3">
                  <div className="row">
                    <div className="col">
                      <label className="form-label">
                        Password
                      </label>
                      <input
                        type="password"
                        name="password1"
                        className="form-control subtle-border mb-2"
                        value={formData.password1}
                        onChange={handleChange}
                        placeholder="Enter password"
                        required
                      />
                    </div>
                    <div className="col">
                      <label className="form-label">
                        Re-type Password
                      </label>
                      <input
                        type="password"
                        name="password2"
                        className="form-control subtle-border"
                        value={formData.password2}
                        onChange={handleChange}
                        placeholder="Confirm password"
                        required
                      />
                    </div>
                  </div>


                </div>

                {/* Position */}
                <div className="mb-3">
                  <label className="form-label">
                    Position
                  </label>
                  <select
                    name="position"
                    className="form-select subtle-border"
                    value={formData.position}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Position</option>
                    {[
                      "Head of Sales",
                      "Facilitator",
                      "Product Brand Manager",
                      "Corporate Manager",
                      "Corporate Officer",
                      "Zonal Sales Executive",
                      "Mobile Sales Officer",
                      "Desk Sales Officer",
                      "Admin",
                    ].map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Company */}
                <div className="mb-3">
                  <label className="form-label">
                    Company
                  </label>
                  <select
                    name="company_name"
                    className="form-select subtle-border"
                    value={formData.company_name}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Company</option>
                    <option value="ANDO">ANDO</option>
                    <option value="KAM">KAM</option>
                    <option value="MATE">MATE</option>
                  </select>
                </div>


                {/* Zone */}
                <div className="mb-3">
                  <div className="row">
                    <div className="col">
                      <label className="form-label">
                        Zone
                      </label>
                      <select
                        name="zone"
                        className="form-select subtle-border"
                        value={formData.zone}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Zone</option>
                        {[
                          "Coast Zone",
                          "Corporate",
                          "Central Zone",
                          "Southern Zone",
                          "Northern Zone",
                          "Lake Zone",
                        ].map((z) => (
                          <option key={z} value={z}>
                            {z}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col"><label className="form-label">
                      Branch
                    </label>
                      <select
                        name="branch"
                        className="form-select subtle-border"
                        value={formData.branch}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Branch</option>
                        {branches.map((b) => (
                          <option key={b.id} value={b.id}>
                            {b.name || "Unnamed Branch"}
                          </option>
                        ))}
                      </select></div>
                  </div>

                </div>



                {/* Submit Button */}
              </div><div className="card-footer">
                <button
                  type="submit"
                  className="btn btn-primary px-3 fw-semibold rounded-3"
                  disabled={isLoading}
                >
                  {isLoading ? "Registering..." : "Register"}
                </button>


              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
