import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaSignInAlt } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/Auth.css";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);
    setMessage(null);

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/accounts/login/",
        formData
      );

      localStorage.setItem("accessToken", res.data.tokens.access);
      localStorage.setItem("refreshToken", res.data.tokens.refresh);
      localStorage.setItem("firstName", res.data.first_name);
      localStorage.setItem("lastName", res.data.last_name);
      localStorage.setItem("position", res.data.position);

      setMessage("Login successful!");

      const position = res.data.position;
      if (
        ["Facilitator", "Product Brand Manager", "Zonal Sales Executive", "admin"].includes(
          position
        )
      ) {
        navigate("/dashboard");
      } else if (
        ["Corporate Officer", "Mobile Sales Officer", "Desk Sales Officer"].includes(
          position
        )
      ) {
        navigate("/add_visit");
      } else {
        navigate("/index");
      }
    } catch (err) {
      const error = err.response?.data;
      const errorMsg =
        error?.detail ||
        (typeof error === "object" && Object.values(error)[0]) ||
        "Login failed!";
      setMessage(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center vh-100">
      <div
        className="card p-4 rounded-4 shadow-lg"
        style={{
          maxWidth: "420px",
          width: "100%",
          background: "rgba(255, 255, 255, 0.1)", // transparent card
          border: "1px solid rgba(255, 255, 255, 0.2)", // subtle border
          backdropFilter: "blur(8px)", // light glass effect
        }}
      >
        <div className="text-center mb-4">
          <FaSignInAlt size={50} className="mb-2" />
          <h3 className="fw-bold" style={{ color: "#333" }}>
            Welcome Back
          </h3>
          <p className="small" style={{ color: "#666" }}>
            Please login to continue
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {message && (
            <div
              className={`alert ${
                message.includes("success") ? "alert-success" : "alert-danger"
              } py-2`}
            >
              {message}
            </div>
          )}

          <div className="mb-3">
            <label className="form-label fw-semibold" style={{ color: "#333" }}>
              Email
            </label>
            <div className="input-group">
              <span
                className="input-group-text"
                style={{ background: "#fff", border: "1px solid #ccc" }}
              >
                <FaEnvelope />
              </span>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
                style={{
                  minWidth: "250px",
                  border: "1px solid rgba(0,0,0,0.2)",
                  background: "rgba(255,255,255,0.15)",
                  color: "#333",
                }}
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold" style={{ color: "#333" }}>
              Password
            </label>
            <div className="input-group">
              <span
                className="input-group-text"
                style={{ background: "#fff", border: "1px solid #ccc" }}
              >
                <FaLock />
              </span>
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
                style={{
                  minWidth: "250px",
                  border: "1px solid rgba(0,0,0,0.2)",
                  background: "rgba(255,255,255,0.15)",
                  color: "#333",
                }}
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-secondary w-100 rounded-3 mt-2 py-2 fw-semibold"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2"></span>{" "}
                Logging in...
              </>
            ) : (
              <>
                <FaSignInAlt className="me-2" /> Login
              </>
            )}
          </button>
        </form>

        <div className="text-center mt-3">
          <p className="small" style={{ color: "#666" }}>
            © {new Date().getFullYear()} Ando Roofing — All Rights Reserved
          </p>
        </div>
      </div>
    </div>
  );
}
