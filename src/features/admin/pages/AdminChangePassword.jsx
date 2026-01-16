// src/pages/Dashboard.jsx
import React from "react";
import Sidebar from "@shared/components/Sidebar";
import Nav from "@shared/components/Nav";
import ChangePassword from "../../auth/pages/ChangePassword";

export default function Dashboard() {
  return (
    <div className="page-wrapper">
     

        <div className="container">
          
           

    
            <ChangePassword />
          </div>
        </div>

 
  );
}
