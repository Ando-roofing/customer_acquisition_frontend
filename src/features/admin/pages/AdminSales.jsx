// src/pages/Dashboard.jsx
import React from "react";
import Sidebar from "@shared/components/Nav";
import Nav from "@shared/components/Nav";

import SaleDetail from "../components/AdminSalesDetails";
export default function AdminSalesDetails() {
  return (
    <div className="page-wrapper">
     
    
        <div className="container">
          
            

    
            <SaleDetail />
          </div>
        </div>


  );
}
