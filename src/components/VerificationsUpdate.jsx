import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";

export default function UpdateVerificationStatus() {
  const { id } = useParams(); // Verification ID from URL
  const navigate = useNavigate();

  const [status, setStatus] = useState("");
  const [supervisorMessage, setSupervisorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("accessToken");

  // Fetch existing verification data
  useEffect(() => {
    const fetchVerification = async () => {
      try {
        const res = await axios.get(
          `http://127.0.0.1:8000/verifications/visits/my-verifications/${id}/`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setStatus(res.data.status || "");
        setSupervisorMessage(res.data.supervisor_message || "");
      } catch (err) {
        console.error(err);
        setError("Failed to load verification details.");
      }
    };
    fetchVerification();
  }, [id, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);

    try {
      await axios.patch(
        `http://127.0.0.1:8000/verifications/visits/my-verifications/${id}/update/`,
        { status, supervisor_message: supervisorMessage },
        {
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        }
      );
      setSuccess("✅ Verification status updated successfully!");
      // Optionally redirect after update
      setTimeout(() => navigate("/verifications"), 1500);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.detail || "❌ Failed to update verification.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid py-3">
      <div
        className="p-4 rounded-4 shadow-sm bg-transparent"
        style={{ maxWidth: "700px", marginLeft: "0" }}
      >
        <h3 className="text-primary mb-4 fw-bold d-flex align-items-center">
          <FaCheckCircle className="me-2" /> Update Verification Status
        </h3>

        {success && <div className="alert alert-success">{success}</div>}
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          {/* Status Selection */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Status</label>
            <select
              className="form-select border-0 border-bottom bg-transparent subtle-border"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              <option value="">-- Select Status --</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Returned">Returned</option>
            </select>
          </div>

          {/* Supervisor Message */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Supervisor Message (Comment)</label>
            <textarea
              className="form-control border-0 border-bottom bg-transparent subtle-border"
              rows="4"
              value={supervisorMessage}
              onChange={(e) => setSupervisorMessage(e.target.value)}
              placeholder="Add a note or comment..."
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="mt-4 text-end">
            <button
              type="submit"
              className="btn btn-success px-4 fw-semibold rounded-3"
              disabled={loading}
            >
              {loading ? "Updating..." : "Verify Visit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
