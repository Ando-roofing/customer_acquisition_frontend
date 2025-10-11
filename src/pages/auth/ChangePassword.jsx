import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaLock, FaKey, FaCheck } from "react-icons/fa";

const ChangePassword = () => {
  const [form, setForm] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const accessToken = localStorage.getItem("accessToken");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);

    if (form.new_password !== form.confirm_password) {
      setStatus({ success: false, message: "New passwords do not match." });
      return;
    }

    setLoading(true);
    try {
      const res = await axios.put(
        "http://127.0.0.1:8000/accounts/user/change-password/",
        {
          old_password: form.old_password,
          new_password: form.new_password,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      setStatus({ success: true, message: res.data.detail });
      setForm({ old_password: "", new_password: "", confirm_password: "" });
    } catch (err) {
      setStatus({
        success: false,
        message:
          err.response?.data?.old_password?.[0] ||
          err.response?.data?.new_password?.[0] ||
          err.response?.data?.detail ||
          "Password change failed.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid mt-4">
      <div className="row">
        {/* Sidebar placeholder */}
        <div className="col-md-2 d-none d-md-block">
          {/* Sidebar component goes here */}
        </div>

        {/* Main content */}
        <div className="col-md-10 col-12">
          <div className="card shadow-sm p-4">
            <h3 className="mb-4">
              <FaKey className="me-2" /> Change Password
            </h3>

            {status && (
              <div
                className={`alert ${status.success ? "alert-success" : "alert-danger"}`}
              >
                {status.message}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3 input-group input-group-lg">
                <span className="input-group-text bg-light">
                  <FaLock />
                </span>
                <input
                  type="password"
                  name="old_password"
                  placeholder="Current Password"
                  value={form.old_password}
                  onChange={handleChange}
                  className="form-control"
                  style={{ minHeight: "50px", fontSize: "1rem" }}
                  required
                />
              </div>

              <div className="mb-3 input-group input-group-lg">
                <span className="input-group-text bg-light">
                  <FaKey />
                </span>
                <input
                  type="password"
                  name="new_password"
                  placeholder="New Password"
                  value={form.new_password}
                  onChange={handleChange}
                  className="form-control"
                  style={{ minHeight: "50px", fontSize: "1rem" }}
                  required
                />
              </div>

              <div className="mb-4 input-group input-group-lg">
                <span className="input-group-text bg-light">
                  <FaCheck />
                </span>
                <input
                  type="password"
                  name="confirm_password"
                  placeholder="Confirm New Password"
                  value={form.confirm_password}
                  onChange={handleChange}
                  className="form-control"
                  style={{ minHeight: "50px", fontSize: "1rem" }}
                  required
                />
              </div>

              <button
            type="submit"
            className="btn btn-primary py-3 px-4" // px-4 for horizontal padding
            disabled={loading}
            style={{ fontSize: "1.1rem", minWidth: "180px" }} // optional fixed minimum width
          >
            {loading ? "Changing..." : "Change Password"}
          </button>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
