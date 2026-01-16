// src/pages/Dashboard.jsx
import React from "react";
import UserSidebar from "../../components/users/Sidebar";
import UserNav from "../../components/users/Nav";
import AddCustomer from "../../components/users/AddCustomer"; // Cards without values

export default function AddCustomers() {
  return (
    <div className="page-wrapper">
      <div className="container">
          <AddCustomer/>
      </div>
    </div>
  );
}
