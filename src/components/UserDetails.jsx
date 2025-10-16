// src/pages/users/UserDetail.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaBuilding,
  FaBriefcase,
  FaMapMarkerAlt,
  FaNetworkWired,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

export default function UserDetail() {
  const { id } = useParams();
  const token = localStorage.getItem("accessToken");
  const [user, setUser] = useState(null);
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `http://127.0.0.1:8000/accounts/users-details/${id}/`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setUser(res.data);
      } catch (err) {
        console.error("Failed to fetch user details:", err);
      } finally {
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

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mt-5 text-center">
        <h5 className="text-danger">User not found.</h5>
        <Link to="/users" className="btn btn-secondary mt-3">
          Back to Users
        </Link>
      </div>
    );
  }

  const branchName = branches.find((b) => b.id === user.branch)?.name || "N/A";

  const renderField = (label, value, icon = null) =>
    value ? (
      <p className="mb-1">
        {icon && <span className="me-1">{icon}</span>}
        <strong>{label}:</strong> {value}
      </p>
    ) : null;

  return (
    <div className="container py-3" style={{ maxWidth: "95%" }}>
      <div
        className="border rounded-4 shadow-sm p-4"
        style={{ background: "transparent", border: "1px solid #ddd" }}
      >
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="fw-bold mb-0">
            <FaUser className="me-2" /> User Details
          </h4>
          <Link to="/users" className="btn btn-outline-secondary btn-sm">
            <i className="bi bi-arrow-left"></i> Back
          </Link>
        </div>

        <div className="row g-4">
          <div className="col-md-6">
            {renderField("First Name", user.first_name, <FaUser />)}
            {renderField("Last Name", user.last_name, <FaUser />)}
            {renderField("Email", user.email, <FaEnvelope />)}
            {renderField("Contact", user.contact, <FaPhone />)}
          </div>

          <div className="col-md-6">
            {renderField("Company", user.company_name, <FaBuilding />)}
            {renderField("Position", user.position, <FaBriefcase />)}
            {renderField("Zone", user.zone, <FaMapMarkerAlt />)}
            {renderField("Branch", branchName, <FaNetworkWired />)}
          </div>
        </div>
      </div>
    </div>
  );
}
