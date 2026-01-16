// src/pages/Dashboard.jsx
import React from "react";
import UserSidebar from "../../components/users/Sidebar";
import UserNav from "../../components/users/Nav";
import VisitDetails from "../../components/users/VisitDetails"; // Cards without values

export default function VisitDetail() {
  return (
    <div className="page-wrapper">

        <div className="container">
          
            

    
            <VisitDetails />
          </div>
        </div>

  
  );
}
