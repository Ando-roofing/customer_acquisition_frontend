// src/pages/Dashboard.jsx
import React from "react";
import UserSidebar from "../../components/users/Sidebar";
import UserNav from "../../components/users/Nav";
import SalesCreate from "../../components/users/SalesCreate";// Cards without values

export default function CreateSales() {
  return (
    <div className="page-wrapper">

        <div className="container">
          
            

    
            <SalesCreate />
          </div>
        </div>

   
  );
}
