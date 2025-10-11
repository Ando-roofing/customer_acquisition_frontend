// src/pages/VisitDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

export default function VisitDetails() {
  const { id } = useParams();
  const [visit, setVisit] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchVisitDetails = async () => {
      try {
        const res = await axios.get(
          `http://127.0.0.1:8000/visits/visit-details/${id}/`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setVisit(res.data);
      } catch (err) {
        console.error("Failed to fetch visit details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchVisitDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!visit) {
    return (
      <div className="container mt-5 text-center">
        <h5 className="text-danger">Visit not found.</h5>
        <Link to="/visits" className="btn btn-secondary mt-3">
          Back to Visits
        </Link>
      </div>
    );
  }

  const mapUrl =
    visit.latitude && visit.longitude
      ? `https://www.google.com/maps?q=${visit.latitude},${visit.longitude}`
      : null;

  // Helper function to render only if value exists
  const renderField = (label, value) =>
    value ? (
      <p className="mb-1">
        <strong>{label}:</strong> {value}
      </p>
    ) : null;

  return (
    <div className="container mt-5">
      <div className="card shadow-lg border-0 rounded-4">
        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <h4 className="mb-0">
            <i className="bi bi-info-circle me-2"></i> Visit Details
          </h4>
          <Link to="/visits" className="btn btn-light btn-sm">
            <i className="bi bi-arrow-left"></i> Back
          </Link>
        </div>

        <div className="card-body p-4">
          <div className="row mb-3">
            <div className="col-md-6">
              {visit.company_name && (
                <h5 className="fw-bold text-primary">Company Name : {visit.company_name}</h5>
              )}
              {renderField("Designation", visit.designation)}
              {renderField("Acquisition Stage", visit.acquisition_stage)}
              {renderField("Client Budget", visit.client_budget)}

              {visit.products_interested?.length > 0 &&
                renderField(
                  "Products Interested",
                  visit.products_interested.join(", ")
                )}
            </div>

            <div className="col-md-6">
              {(visit.contact_person_name || visit.contact_person_detail) && (
                <h6 className="fw-bold text-secondary">Contact Person</h6>
              )}
              {renderField("Name", visit.contact_person_name)}
              {renderField("Contact", visit.contact_person_detail)}
              {renderField("Meeting Type", visit.meeting_type)}

              {visit.status && (
                <p className="mb-1">
                  <strong>Status:</strong>{" "}
                  <span
                    className={`badge ${
                      visit.status === "Open"
                        ? "bg-warning text-dark"
                        : "bg-success"
                    }`}
                  >
                    {visit.status}
                  </span>
                </p>
              )}

              {visit.created_at &&
                renderField(
                  "Created At",
                  new Date(visit.created_at).toLocaleString()
                )}
            </div>
          </div>

          {(visit.item_discussed || visit.place_name || visit.nation) && <hr />}

          <div className="row mb-4">
            {visit.item_discussed && (
              <div className="col-md-6">
                <h6 className="fw-bold text-secondary">Discussion Summary</h6>
                <p className="border rounded p-2 bg-light">
                  {visit.item_discussed}
                </p>
              </div>
            )}

            {(visit.place_name || visit.nation || mapUrl) && (
              <div className="col-md-6">
                <h6 className="fw-bold text-secondary">Location Details</h6>

                {renderField("Place", visit.place_name)}
                {renderField("Nation", visit.nation)}

                {mapUrl ? (
                  <a
                    href={mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-primary btn-sm mt-2"
                  >
                    <i className="bi bi-geo-alt"></i> View on Google Maps
                  </a>
                ) : null}
              </div>
            )}
          </div>

          {visit.visit_image && (
            <>
              <hr />
              <div>
                <h6 className="fw-bold text-secondary mb-2">Visit Image</h6>
                <img
                  src={visit.visit_image}
                  alt="Visit"
                  className="img-fluid rounded border"
                  style={{ maxHeight: "300px", objectFit: "cover" }}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
