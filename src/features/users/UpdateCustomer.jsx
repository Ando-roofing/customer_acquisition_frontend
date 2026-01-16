// src/pages/Dashboard.jsx
import React from "react";
import UserSidebar from "../../components/users/Sidebar";
import UserNav from "../../components/users/Nav";
import UpdateCustomer from "../../components/users/UpdateCustomer"; // Cards without values

export default function UpdateCustomers() {
  return (
    <div className="page-wrapper">

        <div className="container">
          
            

    
            <UpdateCustomer />
          </div>
        </div>

 
  );
}
