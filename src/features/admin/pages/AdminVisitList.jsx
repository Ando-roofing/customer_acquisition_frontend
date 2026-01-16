// src/pages/Dashboard.jsx
import React from "react";
import Sidebar from "@shared/components/Sidebar";
import Nav from "@shared/components/Nav";
import Products from "../../../components/Products";
import Visits from "../components/AdminVisitList";

export default function VisitLisit() {
  return (
    <div className="page-wrapper">
     
    
        <div className="container">
          
            

    
            <Visits />
          </div>
        </div>


  );
}
