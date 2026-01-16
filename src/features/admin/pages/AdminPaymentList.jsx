// src/pages/Dashboard.jsx
import React from "react";
import Sidebar from "@shared/components/Sidebar";
import Nav from "@shared/components/Nav";

import PaymentsList from "../components/AdminPaymentList";
export default function AdminPaymentList() {
  return (
    <div className="page-wrapper">
     
    
        <div className="container">
          
            

    
            <PaymentsList />
          </div>
        </div>


  );
}
