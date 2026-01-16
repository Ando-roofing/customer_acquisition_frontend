// src/pages/Dashboard.jsx
import React from "react";
import UserSidebar from "../../components/users/Sidebar";
import UserNav from "../../components/users/Nav";
import PaymentsList from "../../components/users/PaymentsList";// Cards without values

export default function Payments() {
  return (
    <div className="page-wrapper">

        <div className="container">
          
            

    
            <PaymentsList />
          </div>
        </div>

   
  );
}
