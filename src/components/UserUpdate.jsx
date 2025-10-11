// src/pages/users/UserUpdate.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaBuilding,
  FaBriefcase,
  FaMapMarkerAlt,
  FaNetworkWired,
  FaLock,
} from "react-icons/fa";

export default function UserUpdate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    contact: "",
    company_name: "",
    position: "",
    zone: "",
    branch: "",
  });

  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Fetch user details and branches
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `http://127.0.0.1:8000/accounts/users-details/${id}/`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setFormData({
          ...res.data,
          branch: res.data.branch?.id || "",
        });
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch user:", err);
        setError("Failed to fetch user details.");
        setLoading(false);
      }
    };

    const fetchBranches = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/accounts/branches/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBranches(res.data);
      } catch (err) {
        console.error("Failed to fetch branches:", err);
      }
    };

    fetchUser();
    fetchBranches();
  }, [id, token]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccessMessage(null);

    try {
      await axios.put(
        `http://127.0.0.1:8000/accounts/users-update/${id}/update/`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccessMessage("User updated successfully!");
    } catch (err) {
      console.error("Update failed:", err);
      setError("Failed to update user.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="container-fluid mt-4">
      <div className="row">
        {/* Assuming sidebar is col-md-2 */}
        <div className="col-md-10">
          <div className="card shadow-sm">
            <div className="card-body">
              <h3 className="card-title mb-4">Update User</h3>

              {successMessage && <div className="alert alert-success">{successMessage}</div>}
              {error && <div className="alert alert-danger">{error}</div>}

              <form onSubmit={handleSubmit}>
                {/* Name Fields */}
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

                {/* Email and Contact */}
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
                    />
                  </div>
                </div>

                {/* Company, Position, Zone, Branch */}
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
                      {["Coast Zone", "Corporate", "Central Zone", "Southern Zone", "Northern Zone", "Lake Zone"].map((z) => (
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

                {/* Buttons */}
                <div className="mt-4 d-flex gap-2 flex-wrap">
                  <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                    {isSubmitting ? "Updating..." : "Update User"}
                  </button>
                  <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
