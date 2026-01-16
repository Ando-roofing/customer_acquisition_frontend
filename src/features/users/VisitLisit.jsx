// src/pages/Dashboard.jsx
import React from "react";
import UserSidebar from "../../components/users/Sidebar";
import UserNav from "../../components/users/Nav";
import Visits from "../../components/users/Visits"; // Cards without values

export default function VisitList() {
  return (
    <div className="page-wrapper">

        <div className="container">
          
            

    
            <Visits />
          </div>
        </div>

  
  );
}
