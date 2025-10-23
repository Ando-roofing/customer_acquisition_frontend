import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/AddVisit.css"; // custom styling
import { FaUserCheck, FaUser, FaEnvelope } from "react-icons/fa";

export default function SubmitVerification() {
  const [visits, setVisits] = useState([]);
  const [supervisors, setSupervisors] = useState([]);
  const [visitId, setVisitId] = useState("");
  const [sentTo, setSentTo] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    fetchVisits();
    fetchSupervisors();
  }, []);

  const fetchVisits = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/visits/visit-list/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVisits(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load visits.");
    }
  };

  const fetchSupervisors = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/accounts/users-lists/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSupervisors(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load supervisors.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);

    try {
      await axios.post(
        "http://127.0.0.1:8000/verifications/visits/submit-verification/",
        {
          visit_id: visitId,
          sent_to: sentTo,
          user_message: message, // <-- fixed field name
        },
        {
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        }
      );

      setSuccess("✅ Verification submitted successfully!");
      setVisitId("");
      setSentTo("");
      setMessage("");
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.detail || "❌ Failed to submit verification. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid py-3">
      <div className="p-4 rounded-4 shadow-sm bg-transparent" style={{ maxWidth: "700px", marginLeft: "0" }}>
        <h3 className="text-primary mb-4 fw-bold d-flex align-items-center">
          <FaUserCheck className="me-2" /> Submit Verification
        </h3>

        {success && <div className="alert alert-success">{success}</div>}
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          {/* Visit Selection */}
          <div className="mb-3">
            <label className="form-label fw-semibold">
              <FaEnvelope className="me-2 text-secondary" /> Select Visit
            </label>
            <select
              className="form-select border-0 border-bottom bg-transparent subtle-border"
              value={visitId}
              onChange={(e) => setVisitId(e.target.value)}
              required
            >
              <option value="">-- Select Visit --</option>
              {visits.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.company_name || `Visit #${v.id}`}
                </option>
              ))}
            </select>
          </div>

          {/* Supervisor Selection */}
          <div className="mb-3">
            <label className="form-label fw-semibold">
              <FaUser className="me-2 text-secondary" /> Send To (Supervisor)
            </label>
            <select
              className="form-select border-0 border-bottom bg-transparent subtle-border"
              value={sentTo}
              onChange={(e) => setSentTo(e.target.value)}
              required
            >
              <option value="">-- Select Supervisor --</option>
              {supervisors.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.first_name} {s.last_name}
                </option>
              ))}
            </select>
          </div>

          {/* Message */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Message (Optional)</label>
            <textarea
              className="form-control border-0 border-bottom bg-transparent subtle-border"
              rows="4"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write a note for the supervisor..."
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="mt-4 text-end">
            <button
              type="submit"
              className="btn btn-primary px-4 fw-semibold rounded-3"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Verification"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
