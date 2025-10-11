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

  const token = localStorage.getItem("accessToken"); // admin token

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
      setSuccessMessage("User registered successfully!");
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
        setError("Registration failed. Try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container-fluid mt-4">
      <div className="row">
        {/* Assuming your sidebar is col-md-2 */}
        <div className="col-md-10">
          <div className="card shadow-sm">
            <div className="card-body">
              <h3 className="card-title mb-4">Register New User</h3>

              {error && <div className="alert alert-danger">{error}</div>}
              {successMessage && <div className="alert alert-success">{successMessage}</div>}

              <form onSubmit={handleSubmit}>
                {/* Name Fields in one row */}
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label"><FaUser /> First Name</label>
                    <input
                      type="text"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label"><FaUser /> Last Name</label>
                    <input
                      type="text"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                </div>

                {/* Email and Contact in one row */}
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label"><FaEnvelope /> Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label"><FaPhone /> Contact</label>
                    <input
                      type="text"
                      name="contact"
                      value={formData.contact}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                </div>

                {/* Passwords in one row */}
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label"><FaLock /> Password</label>
                    <input
                      type="password"
                      name="password1"
                      value={formData.password1}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label"><FaLock /> Confirm Password</label>
                    <input
                      type="password"
                      name="password2"
                      value={formData.password2}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                </div>

                {/* Company, Position, Zone, Branch in one row */}
                <div className="row mb-3">
                  <div className="col-md-3">
                    <label className="form-label"><FaBuilding /> Company</label>
                    <select
                      name="company_name"
                      value={formData.company_name}
                      onChange={handleChange}
                      className="form-select"
                      required
                    >
                      <option value="">Select Company</option>
                      <option value="ANDO">ANDO</option>
                      <option value="KAM">KAM</option>
                      <option value="MATE">MATE</option>
                    </select>
                  </div>
                  <div className="col-md-3">
                    <label className="form-label"><FaBriefcase /> Position</label>
                    <select
                      name="position"
                      value={formData.position}
                      onChange={handleChange}
                      className="form-select"
                      required
                    >
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
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-3">
                    <label className="form-label"><FaMapMarkerAlt /> Zone</label>
                    <select
                      name="zone"
                      value={formData.zone}
                      onChange={handleChange}
                      className="form-select"
                      required
                    >
                      {[
                        "Coast Zone",
                        "Corporate",
                        "Central Zone",
                        "Southern Zone",
                        "Northern Zone",
                        "Lake Zone",
                      ].map((z) => (
                        <option key={z} value={z}>{z}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-3">
                    <label className="form-label"><FaNetworkWired /> Branch</label>
                    <select
                      name="branch"
                      value={formData.branch}
                      onChange={handleChange}
                      className="form-select"
                      required
                    >
                      <option value="">Select Branch</option>
                      {branches.map((b) => (
                        <option key={b.id} value={b.id}>{b.name || "Unnamed Branch"}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isLoading}
                >
                  {isLoading ? "Registering..." : "Register"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
