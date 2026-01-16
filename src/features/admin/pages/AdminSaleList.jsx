// src/pages/Dashboard.jsx
import React from "react";
import Sidebar from "@shared/components/Sidebar";
import Nav from "@shared/components/Nav";

import SalesList from "../components/AdminSaleList";

export default function AdminSalesList() {
  return (
    <div className="page-wrapper">
     
    
        <div className="container">
          
            

    
            <SalesList />
          </div>
        </div>


  );
}
