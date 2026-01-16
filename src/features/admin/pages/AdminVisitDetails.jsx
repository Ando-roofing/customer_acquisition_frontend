// src/pages/Dashboard.jsx
import React from "react";
import Sidebar from "@shared/components/Sidebar";
import Nav from "@shared/components/Nav";

import VisitDetails from "../components/AdminVisitDetail";

export default function Visitdetails() {
  return (
    <div className="page-wrapper">
     
    
        <div className="container">
          
            

    
            <VisitDetails />
          </div>
        </div>


  );
}
