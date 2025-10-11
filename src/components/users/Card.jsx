// src/components/DashboardWelcome.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function DashboardWelcome() {
  const [user, setUser] = useState(null);

  // Fetch logged-in user info
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    axios
      .get("http://127.0.0.1:8000/accounts/user/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUser(res.data))
      .catch((err) => console.error("Failed to fetch user info:", err));
  }, []);

  return (
    <div className="container mt-4">
      <div className="text-center mb-4">
        {/* Welcome Heading */}
        <h1 style={{ fontFamily: "Inter, sans-serif", lineHeight: 1.2 }}>
          <span style={{ fontSize: "36px", fontWeight: 800, color: "#1a1a1a", letterSpacing: "-0.5px" }}>
            Welcome,
          </span>
          <span style={{ fontSize: "32px", fontWeight: 700, color: "#0d6efd", marginLeft: "6px" }}>
            {user?.first_name || "User"}
          </span>
          <span style={{ fontSize: "32px", fontWeight: 700, color: "#198754", marginLeft: "4px" }}>
            {user?.last_name || ""}
          </span>
          <span style={{ fontSize: "32px", fontWeight: 700, color: "#6c757d" }}> 👋</span>
        </h1>

        {/* Separator */}
        <hr
          style={{
            height: "4px",
            border: "none",
            background: "linear-gradient(90deg, #ff416c, #0072ff, #42e695)",
            opacity: 0.9,
            margin: "20px 0",
            borderRadius: "3px",
          }}
        />

        {/* Description - multiple lines */}
        <div className="text-secondary fs-5 mb-4" style={{ lineHeight: "1.8" }}>
          <p>Stay on top of your appointments with our visit tracking system.</p>
          <p>Easily schedule, manage, and review your visits — all in one place.</p>
          <p>Keep everything organized and never miss a follow-up again.</p>
        </div>

        {/* Buttons Row */}
        <div className="d-flex flex-column flex-md-row justify-content-center gap-3 mt-3">
          {/* Add Visits */}
          <Link to="/add-visit" className="gradient-btn">
            <i className="fa fa-calendar-plus me-2"></i> Add Visits
          </Link>

          {/* Customer Directory */}
          <Link to="/customer-directory" className="gradient-btn bg-warning text-dark">
            <i className="fas fa-users me-2"></i> Customer Directory
          </Link>
        </div>
      </div>

      {/* Styles for Buttons */}
      
    </div>
  );
}
