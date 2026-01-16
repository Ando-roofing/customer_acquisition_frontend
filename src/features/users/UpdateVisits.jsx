// src/pages/Dashboard.jsx
import React from "react";
import UserSidebar from "../../components/users/Sidebar";
import UserNav from "../../components/users/Nav";
import VisitUpdate from "../../components/users/VisitUpdate"; // Cards without values

export default function UpdateVisits() {
  return (
    <div className="page-wrapper">

        <div className="container">
          
            

    
            <VisitUpdate />
          </div>
        </div>


  );
}
