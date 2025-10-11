// src/pages/users/UserDetail.jsx
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
} from "react-icons/fa";

export default function UserDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");

  const [user, setUser] = useState(null);
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        setError("Failed to fetch user details.");
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-danger">{error}</p>;
  if (!user) return <p>No user found</p>;

  // Get branch name
  const branchName = branches.find((b) => b.id === user.branch)?.name || "N/A";

  return (
    <div className="container-fluid mt-4">
      <div className="row">
        <div className="col-md-10">
          <div className="card shadow-sm">
            <div className="card-body">
              <h3 className="card-title mb-4">User Details</h3>

              <div className="row mb-3">
                <div className="col-md-6">
                  <strong><FaUser /> First Name:</strong>
                  <p>{user.first_name}</p>
                </div>
                <div className="col-md-6">
                  <strong><FaUser /> Last Name:</strong>
                  <p>{user.last_name}</p>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <strong><FaEnvelope /> Email:</strong>
                  <p>{user.email}</p>
                </div>
                <div className="col-md-6">
                  <strong><FaPhone /> Contact:</strong>
                  <p>{user.contact}</p>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-3">
                  <strong><FaBuilding /> Company:</strong>
                  <p>{user.company_name}</p>
                </div>
                <div className="col-md-3">
                  <strong><FaBriefcase /> Position:</strong>
                  <p>{user.position}</p>
                </div>
                <div className="col-md-3">
                  <strong><FaMapMarkerAlt /> Zone:</strong>
                  <p>{user.zone}</p>
                </div>
                <div className="col-md-3">
                  <strong><FaNetworkWired /> Branch:</strong>
                  <p>{branchName}</p>
                </div>
              </div>

              <button
                className="btn btn-secondary"
                onClick={() => navigate(-1)}
              >
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
