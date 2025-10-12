// src/components/VisitUpdate.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import {
  FaMapMarkerAlt,
  FaImage,
  FaClipboardList,
  FaDollarSign,
  FaBoxes,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/AddVisit.css"; // ✅ Use same styles as AddVisit

// Fix Leaflet icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function VisitUpdate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");

  const [visit, setVisit] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showQualifyingFields, setShowQualifyingFields] = useState(false);

  const [formData, setFormData] = useState({
    item_discussed: "",
    latitude: "",
    longitude: "",
    visit_image: null,
    client_budget: "",
    product_interests: [],
  });

  // Fetch visit + products
  useEffect(() => {
    const fetchData = async () => {
      try {
        const visitRes = await axios.get(
          `http://127.0.0.1:8000/visits/visit-details/${id}/`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const data = visitRes.data;
        setVisit(data);

        const productsRes = await axios.get(
          "http://127.0.0.1:8000/products/products/",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const productList = productsRes.data.results || productsRes.data || [];
        setProducts(productList);

        const selectedProducts = data.products_interested?.map(p => Number(p.id)) || [];

        setFormData({
          item_discussed: "",
          latitude: data.latitude || "",
          longitude: data.longitude || "",
          client_budget: data.client_budget || "",
          product_interests: selectedProducts,
          visit_image: null,
        });
      } catch (err) {
        console.error("Failed to load visit data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, token]);

  // Auto-detect location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setFormData((prev) => ({
            ...prev,
            latitude: pos.coords.latitude.toFixed(6),
            longitude: pos.coords.longitude.toFixed(6),
          }));
        },
        (err) => console.warn("Geolocation error:", err)
      );
    }
  }, []);

  // Map click handler
  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        setFormData((prev) => ({
          ...prev,
          latitude: e.latlng.lat.toFixed(6),
          longitude: e.latlng.lng.toFixed(6),
        }));
      },
    });
    return formData.latitude && formData.longitude ? (
      <Marker position={[formData.latitude, formData.longitude]} />
    ) : null;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, visit_image: e.target.files[0] }));
  };

  const handleProductSelect = (e) => {
    const selected = Array.from(e.target.selectedOptions, (opt) => Number(opt.value));
    setFormData((prev) => ({ ...prev, product_interests: selected }));
  };

  const handleSubmit = async () => {
    const payload = new FormData();
    payload.append("item_discussed", formData.item_discussed);
    payload.append("latitude", formData.latitude);
    payload.append("longitude", formData.longitude);
    if (formData.visit_image) payload.append("visit_image", formData.visit_image);
    if (formData.client_budget) payload.append("client_budget", formData.client_budget);
    formData.product_interests.forEach((pid) => payload.append("product_interests", pid));

    try {
      await axios.patch(
        `http://127.0.0.1:8000/visits/visit-update/${id}/update/`,
        payload,
        { headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" } }
      );
      alert("Visit updated successfully!");
      navigate("/visit-lists");
    } catch (err) {
      console.error("Update failed:", err.response?.data || err);
      alert("Failed to update visit.");
    }
  };

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );

  if (!visit)
    return (
      <div className="container mt-5 text-center">
        <h5 className="text-danger">Visit not found.</h5>
        <Link to="/visit-lists" className="btn btn-secondary mt-3">Back to Visits</Link>
      </div>
    );

  return (
    <div className="container-fluid py-3">
      <div
        className="p-4 rounded-4 shadow-sm bg-transparent"
        style={{ maxWidth: "900px", marginLeft: "0" }}
      >
        <h3 className="text-primary mb-4 fw-bold d-flex align-items-center">
          <FaMapMarkerAlt className="me-2" /> Update Visit
        </h3>

        <div className="card-body p-0">
          {/* Company */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Company Name</label>
            <input
              type="text"
              className="form-control subtle-border"
              value={visit.company_name || ""}
              readOnly
            />
          </div>

          {/* Item Discussed */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Item Discussed</label>
            <textarea
              className="form-control subtle-border"
              rows="3"
              name="item_discussed"
              value={formData.item_discussed}
              onChange={handleChange}
              placeholder="Enter item discussed..."
            ></textarea>
          </div>

          {/* Map */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Select Location</label>
            <div className="rounded-4 overflow-hidden subtle-border">
              <MapContainer
                center={[formData.latitude || -6.8, formData.longitude || 39.2]}
                zoom={10}
                style={{ height: "300px", width: "100%" }}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <LocationMarker />
              </MapContainer>
            </div>
            {formData.latitude && formData.longitude && (
              <p className="text-muted mt-2 small">
                📍 Lat: {formData.latitude}, Lng: {formData.longitude}
              </p>
            )}
          </div>

          {/* Visit Image */}
          <div className="mb-3">
            <label className="form-label fw-semibold">
              <FaImage className="me-2 text-secondary" /> Visit Image
            </label>
            <input
              type="file"
              className="form-control subtle-border"
              onChange={handleFileChange}
            />
          </div>

          {/* Qualifying Fields */}
          {showQualifyingFields && (
            <div className="border rounded p-3 mt-3 bg-light">
              <h6 className="fw-bold text-primary d-flex align-items-center">
                <FaDollarSign className="me-2" /> Client Budget & Products
              </h6>
              <div className="mb-3">
                <label className="form-label fw-semibold">
                  Client Budget
                </label>
                <input
                  type="number"
                  className="form-control subtle-border"
                  name="client_budget"
                  value={formData.client_budget}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold">
                  Products Interested
                </label>
                <select
                  multiple
                  className="form-select subtle-border"
                  value={formData.product_interests}
                  onChange={handleProductSelect}
                >
                  {products.length > 0
                    ? products.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.product_name || p.name}
                        </option>
                      ))
                    : <option disabled>No products found</option>}
                </select>
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="mt-4 text-end d-flex gap-2 flex-wrap justify-content-end">
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => navigate(`/sales/${visit?.id}/`)}
              disabled={!visit}
            >
              Make Sales Order
            </button>
            <button
              className="btn btn-warning btn-sm"
              onClick={() => setShowQualifyingFields(true)}
            >
              Move to Qualifying
            </button>
            <button
              className="btn btn-success btn-sm"
              onClick={() => setShowQualifyingFields(false)}
            >
              Continue Prospecting
            </button>
            <button className="btn btn-primary btn-sm" onClick={handleSubmit}>
              Save Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
