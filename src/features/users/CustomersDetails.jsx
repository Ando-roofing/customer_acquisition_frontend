// src/pages/Dashboard.jsx
import React from "react";
import UserSidebar from "../../components/users/Sidebar";
import UserNav from "../../components/users/Nav";
import CustomerDetail from "../../components/users/CustomerDetail"; // Cards without values

export default function CustomerDetails() {
  return (
    <div className="page-wrapper">

        <div className="container">
          
            

    
            <CustomerDetail />
          </div>
        </div>


  );
}
