// src/pages/Dashboard.jsx
import React from "react";
import UserSidebar from "../../components/users/Sidebar";
import UserNav from "../../components/users/Nav";
import UserVerificationMessages from "../../components/UserVerificationmessage";

export default function UserVerificationMessage() {
  return (
    <div className="page-wrapper">

        <div className="container">

            <UserVerificationMessages />
          </div>
        </div>

 
  );
}
