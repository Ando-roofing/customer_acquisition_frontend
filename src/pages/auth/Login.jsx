import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
      const res = await axios.post("http://127.0.0.1:8000/accounts/login/", formData);

      // Save tokens and user info
      localStorage.setItem("accessToken", res.data.tokens.access);
      localStorage.setItem("refreshToken", res.data.tokens.refresh);
      localStorage.setItem("firstName", res.data.first_name);
      localStorage.setItem("lastName", res.data.last_name);
      localStorage.setItem("position", res.data.position); // Make sure backend returns position

      setMessage("Login successful!");

      // Position-based redirection
      const position = res.data.position;
      if (["Facilitator", "Product Brand Manager", "Zonal Sales Executive", "admin"].includes(position)) {
        navigate("/dashboard");  // Redirect to dashboard
      } else if (["Corporate Officer", "Mobile Sales Officer", "Desk Sales Officer"].includes(position)) {
        navigate("/add_visit");  // Redirect to add visit page
      } else {
        navigate("/index");      // Default redirect
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
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <h2>Login</h2>

        {message && <p className="text-danger">{message}</p>}

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group mt-2">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary mt-3" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
