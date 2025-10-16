// src/pages/auth/Register.jsx
import React, { useState, useEffect } from "react";
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
import "../../styles/AddVisit.css"; // ✅ Use same shared style

export default function Register() {
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
    <div className="container-fluid py-3">
      {/* ✅ Match AddVisit / AddCustomer look */}
      <div
        className="p-4 rounded-4 shadow-sm bg-transparent"
        style={{ maxWidth: "650px", marginLeft: "20px" }}
      >
        <h3 className="text-primary mb-4 fw-bold d-flex align-items-center">
          <FaUser className="me-2" /> Register New User
        </h3>

        {error && <div className="alert alert-danger">{error}</div>}
        {successMessage && <div className="alert alert-success">{successMessage}</div>}

        <form onSubmit={handleSubmit}>
          {/* First and Last Name */}
          <div className="mb-3">
            <label className="form-label fw-semibold">
              <FaUser className="me-2" /> First Name
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

          {/* Email */}
          <div className="mb-3">
            <label className="form-label fw-semibold">
              <FaEnvelope className="me-2" /> Email
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
            <label className="form-label fw-semibold">
              <FaPhone className="me-2" /> Contact
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
            <label className="form-label fw-semibold">
              <FaLock className="me-2" /> Password
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

          {/* Company */}
          <div className="mb-3">
            <label className="form-label fw-semibold">
              <FaBuilding className="me-2" /> Company
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

          {/* Position */}
          <div className="mb-3">
            <label className="form-label fw-semibold">
              <FaBriefcase className="me-2" /> Position
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

          {/* Zone */}
          <div className="mb-3">
            <label className="form-label fw-semibold">
              <FaMapMarkerAlt className="me-2" /> Zone
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

          {/* Branch */}
          <div className="mb-4">
            <label className="form-label fw-semibold">
              <FaNetworkWired className="me-2" /> Branch
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
            </select>
          </div>

          {/* Submit Button */}
          <div className="text-start">
            <button
              type="submit"
              className="btn btn-primary px-3 fw-semibold rounded-3"
              disabled={isLoading}
            >
              {isLoading ? "Registering..." : "Register"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
