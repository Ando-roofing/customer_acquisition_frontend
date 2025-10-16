import React, { useEffect, useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useNavigate } from "react-router-dom";
import {
  FaBuilding,
  FaUser,
  FaPhone,
  FaClipboardList,
  FaMapMarkerAlt,
  FaImage,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/AddVisit.css"; // ✅ Import custom style

// Fix Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function AddVisit() {
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");

  const [companies, setCompanies] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedContact, setSelectedContact] = useState("");
  const [designation, setDesignation] = useState("");
  const [contactDetail, setContactDetail] = useState("");
  const [meetingType, setMeetingType] = useState("");
  const [itemDiscussed, setItemDiscussed] = useState("");
  const [visitImage, setVisitImage] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const MEETING_TYPE_OPTIONS = ["In Person", "Phone Call"];

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/customers/customers/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setCompanies(res.data))
      .catch((err) => console.error(err));
  }, [token]);

  useEffect(() => {
    if (selectedCompany) {
      axios
        .get(`http://127.0.0.1:8000/customers/customers/${selectedCompany}/`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setContacts(res.data.contacts || []);
          setDesignation(res.data.designation || "");
          setSelectedContact("");
          setContactDetail("");
        })
        .catch((err) => console.error(err));
    } else {
      setContacts([]);
      setDesignation("");
      setSelectedContact("");
      setContactDetail("");
    }
  }, [selectedCompany, token]);

  useEffect(() => {
    if (selectedContact) {
      const contact = contacts.find((c) => c.id === parseInt(selectedContact));
      if (contact) setContactDetail(contact.contact_detail || "");
      else setContactDetail("");
    } else {
      setContactDetail("");
    }
  }, [selectedContact, contacts]);

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        setLatitude(parseFloat(e.latlng.lat.toFixed(6)));
        setLongitude(parseFloat(e.latlng.lng.toFixed(6)));
      },
    });
    return latitude && longitude ? <Marker position={[latitude, longitude]} /> : null;
  };

  useEffect(() => {
    if (!latitude && !longitude && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLatitude(parseFloat(pos.coords.latitude.toFixed(6)));
          setLongitude(parseFloat(pos.coords.longitude.toFixed(6)));
        },
        (err) => console.warn("Geolocation error:", err)
      );
    }
  }, [latitude, longitude]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCompany || !selectedContact || !meetingType) {
      setMessage({
        type: "error",
        text: "Please select company, contact person, and meeting type.",
      });
      return;
    }

    setLoading(true);
    setMessage(null);

    const formData = new FormData();
    formData.append("company", selectedCompany);
    formData.append("contact_person", selectedContact);
    formData.append("meeting_type", meetingType);
    formData.append("item_discussed", itemDiscussed);
    formData.append("latitude", latitude?.toFixed(6));
    formData.append("longitude", longitude?.toFixed(6));
    if (visitImage) formData.append("visit_image", visitImage);

    try {
      await axios.post("http://127.0.0.1:8000/visits/visit-create/", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage({ type: "success", text: "✅ Visit added successfully!" });
      setTimeout(() => navigate("/visit-lists"), 2000);
    } catch (err) {
      console.error(err);
      setMessage({
        type: "error",
        text:
          err.response?.data?.company ||
          "❌ Failed to add visit. Try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid py-3">
      <div
        className="p-4 rounded-4 shadow-sm bg-transparent"
        style={{ maxWidth: "900px", marginLeft: "0" }}
      >
        <h3 className="text-primary mb-4 fw-bold d-flex align-items-center">
          <FaMapMarkerAlt className="me-2" /> Add Visit
        </h3>

        {message && (
          <div
            className={`alert ${
              message.type === "success" ? "alert-success" : "alert-danger"
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">
              <FaBuilding className="me-2 text-secondary" /> Company
            </label>
            <select
              className="form-select border-0 border-bottom bg-transparent subtle-border"
              value={selectedCompany}
              onChange={(e) => setSelectedCompany(e.target.value)}
              required
            >
              <option value="">Select Customer Name</option>
              {companies.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.company_name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">
              <FaUser className="me-2 text-secondary" /> Contact Person
            </label>
            <select
              className="form-select border-0 border-bottom bg-transparent subtle-border"
              value={selectedContact}
              onChange={(e) => setSelectedContact(e.target.value)}
              required
            >
              <option value="">Select Contact</option>
              {contacts.map((ct) => (
                <option key={ct.id} value={ct.id}>
                  {ct.contact_name}
                </option>
              ))}
            </select>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label fw-semibold">
                <FaClipboardList className="me-2 text-secondary" /> Designation
              </label>
              <input
                type="text"
                className="form-control border-0 border-bottom bg-transparent subtle-border"
                value={designation}
                disabled
              />
            </div>
            <div className="col-md-6">
              <label className="form-label fw-semibold">
                <FaPhone className="me-2 text-secondary" /> Contact Detail
              </label>
              <input
                type="text"
                className="form-control border-0 border-bottom bg-transparent subtle-border"
                value={contactDetail}
                disabled
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Meeting Type</label>
            <select
              className="form-select border-0 border-bottom bg-transparent subtle-border"
              value={meetingType}
              onChange={(e) => setMeetingType(e.target.value)}
              required
            >
              <option value="">Select Meeting Type</option>
              {MEETING_TYPE_OPTIONS.map((mt) => (
                <option key={mt} value={mt}>
                  {mt}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Discussions</label>
            <textarea
              className="form-control border-0 border-bottom bg-transparent subtle-border"
              rows="3"
              value={itemDiscussed}
              onChange={(e) => setItemDiscussed(e.target.value)}
              placeholder="Enter the items discussed during the visit..." 
            ></textarea>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">
              <FaImage className="me-2 text-secondary" /> Visit Image
            </label>
            <input
              type="file"
              className="form-control border-0 border-bottom bg-transparent subtle-border"
              onChange={(e) => setVisitImage(e.target.files[0])}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">
              <FaMapMarkerAlt className="me-2 text-secondary" /> Select Location
            </label>
            <div className="rounded-4 overflow-hidden border border-primary-subtle">
              <MapContainer
                center={[latitude || -6.8, longitude || 39.2]}
                zoom={10}
                style={{ height: "300px", width: "100%" }}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <LocationMarker />
              </MapContainer>
            </div>
            {latitude && longitude && (
              <p className="text-muted mt-2 small">
                📍 Lat: {latitude.toFixed(6)}, Lng: {longitude.toFixed(6)}
              </p>
            )}
          </div>

          <div className="mt-4 text-end">
            <button
              type="submit"
              className="btn btn-primary px-4 fw-semibold rounded-3"
              disabled={loading}
            >
              {loading ? "Saving Visit..." : "Add Visit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
