import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

export default function VerificationDetails() {
  const { id } = useParams();
  const [verification, setVerification] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchVerification = async () => {
      try {
        const res = await axios.get(
          `http://127.0.0.1:8000/verifications/visits/my-verifications/${id}/`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setVerification(res.data);
      } catch (err) {
        console.error("Failed to fetch verification details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchVerification();
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

  if (!verification) {
    return (
      <div className="container mt-5 text-center">
        <h5 className="text-danger">Verification not found.</h5>
        <Link to="/my-verifications" className="btn btn-secondary mt-3">
          Back to My Verifications
        </Link>
      </div>
    );
  }

  // Helper to render fields if they exist
  const renderField = (label, value) =>
    value ? (
      <p className="mb-1">
        <strong>{label}:</strong> {value}
      </p>
    ) : null;

  // Google Maps link
  const mapLink =
    verification.latitude && verification.longitude
      ? `https://www.google.com/maps?q=${verification.latitude},${verification.longitude}`
      : null;

  return (
    <div className="container py-3" style={{ maxWidth: "95%" }}>
      <div
        className="border rounded-4 shadow-sm p-4"
        style={{ background: "transparent", border: "1px solid #ddd" }}
      >
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="fw-bold mb-0">
            <i className="bi bi-info-circle me-2"></i> Verification Details
          </h4>
          <Link to="/my-verifications" className="btn btn-outline-secondary btn-sm">
            <i className="bi bi-arrow-left"></i> Back
          </Link>
        </div>

        {/* Details */}
        <div className="row g-4">
          {/* Left Column */}
          <div className="col-md-6">
            {renderField("Visit", verification.customer_name || `Visit #${verification.visit_id}`)}
            {renderField("Meeting Type", verification.meeting_type)}
            {renderField("Items Discussed", verification.item_discussed)}
            {renderField("Message", verification.user_message)}
          </div>

          {/* Right Column */}
          <div className="col-md-6">
            {renderField("Submitted By", verification.submitted_by_name)}
            {renderField("Verified By", verification.verified_by_name)}
            {verification.status && (
              <p className="mb-1">
                <strong>Status:</strong>{" "}
                <span
                  className={`badge ${
                    verification.status === "Pending"
                      ? "bg-warning text-dark"
                      : verification.status === "Approved"
                      ? "bg-success"
                      : "bg-danger"
                  }`}
                >
                  {verification.status}
                </span>
              </p>
            )}
            {verification.verified_at &&
              renderField("Verified At", new Date(verification.verified_at).toLocaleString())}
            {verification.created_at &&
              renderField("Submitted At", new Date(verification.created_at).toLocaleString())}

            {/* Location */}
            {(verification.latitude || verification.longitude || verification.place_name) && (
              <div className="mt-3 p-2 border rounded">
                <h6 className="fw-bold mb-2">Visit Location</h6>
                {renderField("Latitude", verification.latitude)}
                {renderField("Longitude", verification.longitude)}
                {renderField("Place Name", verification.place_name || "Not Available")}
                {mapLink && (
                  <a
                    href={mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm btn-outline-primary mt-2"
                  >
                    <i className="bi bi-geo-alt"></i> View on Map
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Visit Image */}
        {verification.visit_image_url && (
          <>
            <hr className="my-4" />
            <div>
              <h6 className="fw-bold text-dark mb-2">Visit Image</h6>
              <div
                style={{
                  width: "100%",
                  maxWidth: "650px",
                  height: "400px",
                  overflow: "hidden",
                  borderRadius: "12px",
                  border: "1px solid #ccc",
                }}
              >
                <img
                  src={verification.visit_image_url}
                  alt="Visit"
                  className="img-fluid w-100 h-100"
                  style={{
                    objectFit: "cover",
                    borderRadius: "12px",
                    transition: "transform 0.3s ease",
                  }}
                  onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
                  onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
