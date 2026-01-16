// src/pages/Dashboard.jsx
import React from "react";
import UserSidebar from "../../components/users/Sidebar";
import UserNav from "../../components/users/Nav";
import VerificationDetails from "../../components/users/VerificationDetails";// Cards without values

export default function VerificationDetail() {
  return (
    <div className="page-wrapper">

        <div className="container">

            <VerificationDetails />
          </div>
        </div>


  );
}
