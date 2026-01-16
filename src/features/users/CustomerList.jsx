// src/pages/Dashboard.jsx
import React from "react";
import UserSidebar from "../../components/users/Sidebar";
import UserNav from "../../components/users/Nav";
import Customers from "../../components/users/Customers";

export default function CustomerList() {
  return (
    <div className="page-wrapper">

        <div className="container">
          
            

    
            <Customers />
          </div>
        </div>


  );   
}
