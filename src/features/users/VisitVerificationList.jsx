// src/pages/Dashboard.jsx
import React from "react";
import UserSidebar from "../../components/users/Sidebar";
import UserNav from "../../components/users/Nav";
import MySubmissionsTable from "../../components/users/VisitVerificationList";


export default function VisitVerificationLisit() {
  return (
    <div className="page-wrapper">

        <div className="container">
          
            

    
            <MySubmissionsTable />
          </div>
        </div>

   
  );
}
