// src/pages/Dashboard.jsx
import React from "react";
import UserSidebar from "../../components/users/Sidebar";
import UserNav from "../../components/users/Nav";
import DashboardWelcome from "../../components/users/Card"; // Cards without values

export default function AddVisit() {
  return (
    <div className="page-wrapper">
        <div className="container">
            <DashboardWelcome />
        </div>
    </div>
  );
}
