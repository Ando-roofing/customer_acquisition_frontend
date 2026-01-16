// src/pages/Dashboard.jsx
import React from "react";
import Sidebar from "@shared/components/Sidebar";
import Nav from "@shared/components/Nav";
import UserDetail from "../../../components/UserDetails"; // Cards without values

export default function AdminUserDetail() {
  return (
    <div className="page-wrapper">
        <div className="container">
            <UserDetail />
        </div>
    </div>
  );
}
