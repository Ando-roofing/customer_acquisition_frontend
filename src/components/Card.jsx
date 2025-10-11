// src/components/DashboardCards.jsx
import React from "react";

export default function Card() {
  const cardData = [
    { title: "Total Customers", icon: "fas fa-building", color: "primary" },
    { title: "New Visits", icon: "fas fa-user-plus", color: "info" },
    { title: "Total Orders", icon: "fas fa-shopping-bag", color: "success" },
    { title: "Total Order Amount", icon: "fas fa-credit-card", color: "warning" },
    { title: "Payment Collected Amount", icon: "fas fa-wallet", color: "danger" },
    { title: "Prospecting Visits", icon: "fas fa-search", color: "secondary" },
    { title: "Qualifying Visits", icon: "fas fa-check-circle", color: "primary" },
    { title: "Proposal Visits", icon: "fas fa-file-signature", color: "info" },
    { title: "Closing Visits", icon: "fas fa-handshake", color: "success" },
    { title: "Payment Follow-up Visits", icon: "fas fa-receipt", color: "warning" },
    { title: "System Users", icon: "fas fa-users", color: "dark" },
  ];

  return (
    <div className="row">
      {cardData.map((card, index) => (
        <div key={index} className="col-sm-6 col-md-3 mb-3">
          <div className="card card-stats card-round">
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col-icon">
                  <div className={`icon-big text-center icon-${card.color} bubble-shadow-small`}>
                    <i className={card.icon}></i>
                  </div>
                </div>
                <div className="col col-stats ms-3 ms-sm-0">
                  <div className="numbers">
                    <p className="card-category">{card.title}</p>
                    {/* Value removed */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
