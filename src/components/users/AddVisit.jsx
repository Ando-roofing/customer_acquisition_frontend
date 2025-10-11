import React, { useEffect, useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useNavigate } from "react-router-dom";

// Leaflet marker fix
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
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

  // Load companies
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/customers/customers/", {
      headers: { Authorization: `Bearer ${token}` },
    }).then(res => setCompanies(res.data))
      .catch(err => console.error(err));
  }, [token]);

  // When company is selected, load contacts and designation
  useEffect(() => {
    if (selectedCompany) {
      axios.get(`http://127.0.0.1:8000/customers/customers/${selectedCompany}/`, {
        headers: { Authorization: `Bearer ${token}` },
      }).then(res => {
        setContacts(res.data.contacts || []);
        setDesignation(res.data.designation || ""); // ✅ designation from company
        setSelectedContact("");
        setContactDetail("");
      }).catch(err => console.error(err));
    } else {
      setContacts([]);
      setDesignation("");
      setSelectedContact("");
      setContactDetail("");
    }
  }, [selectedCompany, token]);

  // When a contact is selected, auto-fill contact detail only
  useEffect(() => {
    if (selectedContact) {
      const contact = contacts.find(c => c.id === parseInt(selectedContact));
      if (contact) setContactDetail(contact.contact_detail || "");
      else setContactDetail("");
    } else {
      setContactDetail("");
    }
  }, [selectedContact, contacts]);

  // Map click handler
  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        setLatitude(parseFloat(e.latlng.lat.toFixed(6)));
        setLongitude(parseFloat(e.latlng.lng.toFixed(6)));
      },
    });
    return latitude && longitude ? <Marker position={[latitude, longitude]} /> : null;
  };

  // Detect location automatically
  useEffect(() => {
    if (!latitude && !longitude && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => {
          setLatitude(parseFloat(pos.coords.latitude.toFixed(6)));
          setLongitude(parseFloat(pos.coords.longitude.toFixed(6)));
        },
        err => console.warn("Geolocation error:", err)
      );
    }
  }, [latitude, longitude]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCompany || !selectedContact || !meetingType) {
      setMessage({ type: "error", text: "Please select company, contact person, and meeting type." });
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
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
      });
      setMessage({ type: "success", text: "✅ Visit added successfully!" });
      setTimeout(() => navigate("/visit-lists"), 2000);
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: err.response?.data?.company || "❌ Failed to add visit. Try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4 mb-5">
      <div className="card shadow-sm p-4">
        <h3 className="text-center text-primary mb-4"><i className="fas fa-map-marker-alt me-2"></i> Add Visit</h3>

        {message && <div className={`alert ${message.type === "success" ? "alert-success" : "alert-danger"} text-center`}>{message.text}</div>}

        <form onSubmit={handleSubmit}>
          {/* Company */}
          <div className="mb-3">
            <label className="form-label">Company</label>
            <select className="form-select" value={selectedCompany} onChange={e => setSelectedCompany(e.target.value)} required>
              <option value="">Select Company</option>
              {companies.map(c => <option key={c.id} value={c.id}>{c.company_name}</option>)}
            </select>
          </div>

          {/* Contact Person */}
          <div className="mb-3">
            <label className="form-label">Contact Person</label>
            <select className="form-select" value={selectedContact} onChange={e => setSelectedContact(e.target.value)} required>
              <option value="">Select Contact</option>
              {contacts.map(ct => <option key={ct.id} value={ct.id}>{ct.contact_name}</option>)}
            </select>
          </div>

          {/* Auto-filled fields */}
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Designation</label>
              <input type="text" className="form-control" value={designation} disabled />
            </div>
            <div className="col-md-6">
              <label className="form-label">Contact Detail</label>
              <input type="text" className="form-control" value={contactDetail} disabled />
            </div>
          </div>

          {/* Meeting Type */}
          <div className="mb-3">
            <label className="form-label">Meeting Type</label>
            <select className="form-select" value={meetingType} onChange={e => setMeetingType(e.target.value)} required>
              <option value="">Select Meeting Type</option>
              {MEETING_TYPE_OPTIONS.map(mt => <option key={mt} value={mt}>{mt}</option>)}
            </select>
          </div>

          {/* Item Discussed */}
          <div className="mb-3">
            <label className="form-label">Item Discussed</label>
            <textarea className="form-control" rows="3" value={itemDiscussed} onChange={e => setItemDiscussed(e.target.value)}></textarea>
          </div>

          {/* Visit Image */}
          <div className="mb-3">
            <label className="form-label">Visit Image</label>
            <input type="file" className="form-control" onChange={e => setVisitImage(e.target.files[0])} />
          </div>

          {/* Map */}
          <div className="mb-3">
            <label className="form-label">Select Location</label>
            <MapContainer center={[latitude || -6.8, longitude || 39.2]} zoom={10} style={{ height: "300px", width: "100%" }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <LocationMarker />
            </MapContainer>
            {latitude && longitude && <p className="text-muted mt-2">📍 Lat: {latitude.toFixed(6)}, Lng: {longitude.toFixed(6)}</p>}
          </div>

          <div className="mt-4 text-start">
            <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? "Saving..." : "Add Visit"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
