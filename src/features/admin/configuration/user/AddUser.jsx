// src/pages/Dashboard.jsx
import React from "react";
import Sidebar from "@shared/components/Sidebar";
import Nav from "@shared/components/Nav";
import Register from "../../../auth/pages/Register"; // Cards without values

export default function AddUser() {
  return (
    <div className="page-wrapper">
      <div className="container">
        <Register />
      </div>
    </div>
  );
}
