// src/pages/Dashboard.jsx
import React from "react";

export default function Dashboard() {
  return (
    <div className="page-wrapper">
        {/* BEGIN PAGE HEADER */}
        {/* BEGIN PAGE HEADER */}
        <div className="page-header d-print-none">
          <div className="container-xl">
            <div className="row g-2 align-items-center">
              <div className="col">
                {/* Page pre-title */}
                <div className="page-pretitle">Overview</div>
                <h1 className="page-title">Dashboard</h1>
              </div>
              {/* Page title actions */}
              <div className="col-auto ms-auto d-print-none">
                <div className="btn-list">
                  <span className="d-none d-sm-inline">
                    <a href="dev_tabler_default.html#" className="btn btn-1"> New view </a>
                  </span>
                  <a href="dev_tabler_default.html#" className="btn btn-primary btn-5 d-none d-sm-inline-block" data-bs-toggle="modal" data-bs-target="#modal-report">
                    {/* Download SVG icon from http://tabler.io/icons/icon/plus */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      focusable="false"
                      className="icon icon-2"
                    >
                      <path d="M12 5l0 14" />
                      <path d="M5 12l14 0" />
                    </svg>
                    Create new report
                  </a>
                  <a
                    href="dev_tabler_default.html#"
                    className="btn btn-primary btn-6 d-sm-none btn-icon"
                    data-bs-toggle="modal"
                    data-bs-target="#modal-report"
                    aria-label="Create new report"
                  >
                    {/* Download SVG icon from http://tabler.io/icons/icon/plus */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      focusable="false"
                      className="icon icon-2"
                    >
                      <path d="M12 5l0 14" />
                      <path d="M5 12l14 0" />
                    </svg>
                  </a>
                </div>
                {/* BEGIN MODAL */}
                {/* END MODAL */}
              </div>
            </div>
          </div>
        </div>
        {/* END PAGE HEADER */}
        {/* END PAGE HEADER */}
        {/* BEGIN PAGE BODY */}
        <main id="content" className="page-body">
          <div className="container-xl">
            <div className="row row-deck row-cards">
              <div className="col-sm-12 col-lg-6">
                <div className="card card-gradient">
                  <div className="card-body">
                    <div className="row gy-3">
                      <div className="col-12 col-sm d-flex flex-column">
                        <h3 className="h2">Welcome back, Paweł</h3>
                        <p className="text-secondary">You have 5 new messages and 2 new notifications.</p>
                        <div className="row g-5 mt-auto">
                          <div className="col-auto">
                            <div className="subheader">Today's Sales</div>
                            <div className="d-flex align-items-baseline">
                              <div className="h3 me-2">6,782</div>
                              <div className="me-auto">
                                <span className="text-green d-inline-flex align-items-center lh-1">
                                  7%
                                  {/* Download SVG icon from http://tabler.io/icons/icon/arrow-up */}
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    aria-hidden="true"
                                    focusable="false"
                                    className="icon ms-0 icon-sm"
                                  >
                                    <path d="M12 5l0 14" />
                                    <path d="M18 11l-6 -6" />
                                    <path d="M6 11l6 -6" />
                                  </svg>
                                </span>
                              </div>
                            </div>
                            <div className="progress progress-sm">
                              <div
                                className="progress-bar bg-success"
                                style={{width: '75%'}}
                                role="progressbar"
                                aria-valuenow="75"
                                aria-valuemin="0"
                                aria-valuemax="100"
                                aria-label="75% Complete"
                              >
                                <span className="visually-hidden">75% Complete</span>
                              </div>
                            </div>
                          </div>
                          <div className="col-auto">
                            <div className="subheader">Growth Rate</div>
                            <div className="d-flex align-items-baseline">
                              <div className="h3 me-2">78,4%</div>
                              <div className="me-auto">
                                <span className="text-red d-inline-flex align-items-center lh-1">
                                  -1%
                                  {/* Download SVG icon from http://tabler.io/icons/icon/arrow-down */}
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    aria-hidden="true"
                                    focusable="false"
                                    className="icon ms-0 icon-sm"
                                  >
                                    <path d="M12 5l0 14" />
                                    <path d="M18 13l-6 6" />
                                    <path d="M6 13l6 6" />
                                  </svg>
                                </span>
                              </div>
                            </div>
                            <div className="progress progress-sm">
                              <div
                                className="progress-bar bg-danger"
                                style={{width: '78%'}}
                                role="progressbar"
                                aria-valuenow="78"
                                aria-valuemin="0"
                                aria-valuemax="100"
                                aria-label="78% Complete"
                              >
                                <span className="visually-hidden">78% Complete</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                  
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-lg-3">
                <div className="card">
                  <div className="card-body">
                    <div className="subheader">Total Users</div>
                    <div className="d-flex align-items-baseline">
                      <div className="h1 mb-0 me-2">75,782</div>
                      <div className="me-auto">
                        <span className="text-green d-inline-flex align-items-center lh-1">
                          2%
                          {/* Download SVG icon from http://tabler.io/icons/icon/arrow-up */}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                            focusable="false"
                            className="icon ms-0 icon-sm"
                          >
                            <path d="M12 5l0 14" />
                            <path d="M18 11l-6 -6" />
                            <path d="M6 11l6 -6" />
                          </svg>
                        </span>
                      </div>
                    </div>
                    <div className="text-secondary mt-2">24,635 users increased from last month</div>
                  </div>
                  <div id="chart-visitors" className="position-relative"></div>
                </div>
              </div>
              <div className="col-sm-6 col-lg-3">
                <div className="card">
                  <div className="card-body">
                    <div className="subheader">Active Users</div>
                    <div className="d-flex align-items-baseline mb-2">
                      <div className="h1 mb-0 me-2">25,782</div>
                      <div className="me-auto">
                        <span className="text-red d-inline-flex align-items-center lh-1">
                          -1%
                          {/* Download SVG icon from http://tabler.io/icons/icon/arrow-down */}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                            focusable="false"
                            className="icon ms-0 icon-sm"
                          >
                            <path d="M12 5l0 14" />
                            <path d="M18 13l-6 6" />
                            <path d="M6 13l6 6" />
                          </svg>
                        </span>
                      </div>
                    </div>
                    <div id="chart-active-users-3" className="position-relative"></div>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-lg-3">
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="subheader">Sales</div>
                      <div className="ms-auto lh-1">
                        <div className="dropdown">
                          <a
                            className="dropdown-toggle text-secondary"
                            id="sales-dropdown"
                            href="dev_tabler_default.html#"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                            aria-label="Select time range for sales data"
                            >Last 7 days</a
                          >
                          <div className="dropdown-menu dropdown-menu-end" aria-labelledby="sales-dropdown">
                            <a className="dropdown-item active" href="dev_tabler_default.html#" aria-current="true">Last 7 days</a>
                            <a className="dropdown-item" href="dev_tabler_default.html#">Last 30 days</a>
                            <a className="dropdown-item" href="dev_tabler_default.html#">Last 3 months</a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="h1 mb-3">75%</div>
                    <div className="d-flex mb-2">
                      <div>Conversion rate</div>
                      <div className="ms-auto">
                        <span className="text-green d-inline-flex align-items-center lh-1">
                          7%
                          {/* Download SVG icon from http://tabler.io/icons/icon/arrow-up */}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                            focusable="false"
                            className="icon ms-0 icon-sm"
                          >
                            <path d="M12 5l0 14" />
                            <path d="M18 11l-6 -6" />
                            <path d="M6 11l6 -6" />
                          </svg>
                        </span>
                      </div>
                    </div>
                    <div className="progress progress-sm">
                      <div
                        className="progress-bar bg-primary"
                        style={{width: '75%'}}
                        role="progressbar"
                        aria-valuenow="75"
                        aria-valuemin="0"
                        aria-valuemax="100"
                        aria-label="75% Complete"
                      >
                        <span className="visually-hidden">75% Complete</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-lg-3">
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="subheader">Revenue</div>
                      <div className="ms-auto lh-1">
                        <div className="dropdown">
                          <a
                            className="dropdown-toggle text-secondary"
                            id="revenue-dropdown"
                            href="dev_tabler_default.html#"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                            aria-label="Select time range for revenue"
                            >Last 7 days</a
                          >
                          <div className="dropdown-menu dropdown-menu-end" aria-labelledby="revenue-dropdown">
                            <a className="dropdown-item active" href="dev_tabler_default.html#" aria-current="true">Last 7 days</a>
                            <a className="dropdown-item" href="dev_tabler_default.html#">Last 30 days</a>
                            <a className="dropdown-item" href="dev_tabler_default.html#">Last 3 months</a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex align-items-baseline">
                      <div className="h1 mb-0 me-2">$4,300</div>
                      <div className="me-auto">
                        <span className="text-green d-inline-flex align-items-center lh-1">
                          8%
                          {/* Download SVG icon from http://tabler.io/icons/icon/arrow-up */}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                            focusable="false"
                            className="icon ms-0 icon-sm"
                          >
                            <path d="M12 5l0 14" />
                            <path d="M18 11l-6 -6" />
                            <path d="M6 11l6 -6" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div id="chart-revenue-bg" className="position-relative rounded-bottom-3 chart-sm"></div>
                </div>
              </div>
              <div className="col-sm-6 col-lg-3">
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="subheader">New clients</div>
                      <div className="ms-auto lh-1">
                        <div className="dropdown">
                          <a
                            className="dropdown-toggle text-secondary"
                            id="new-clients-dropdown"
                            href="dev_tabler_default.html#"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                            aria-label="Select time range for new clients"
                            >Last 7 days</a
                          >
                          <div className="dropdown-menu dropdown-menu-end" aria-labelledby="new-clients-dropdown">
                            <a className="dropdown-item active" href="dev_tabler_default.html#" aria-current="true">Last 7 days</a>
                            <a className="dropdown-item" href="dev_tabler_default.html#">Last 30 days</a>
                            <a className="dropdown-item" href="dev_tabler_default.html#">Last 3 months</a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex align-items-baseline">
                      <div className="h1 mb-3 me-2">6,782</div>
                      <div className="me-auto">
                        <span className="text-muted d-inline-flex align-items-center lh-1">
                          0%
                          {/* Download SVG icon from http://tabler.io/icons/icon/minus */}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                            focusable="false"
                            className="icon ms-0 icon-sm"
                          >
                            <path d="M5 12l14 0" />
                          </svg>
                        </span>
                      </div>
                    </div>
                    <div id="chart-new-clients" className="position-relative chart-sm"></div>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-lg-3">
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="subheader">Active subscriptions</div>
                      <div className="ms-auto lh-1">
                        <div className="dropdown">
                          <a
                            className="dropdown-toggle text-secondary"
                            id="active-users-dropdown"
                            href="dev_tabler_default.html#"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                            aria-label="Select time range for active users"
                            >Last 7 days</a
                          >
                          <div className="dropdown-menu dropdown-menu-end" aria-labelledby="active-users-dropdown">
                            <a className="dropdown-item active" href="dev_tabler_default.html#" aria-current="true">Last 7 days</a>
                            <a className="dropdown-item" href="dev_tabler_default.html#">Last 30 days</a>
                            <a className="dropdown-item" href="dev_tabler_default.html#">Last 3 months</a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex align-items-baseline">
                      <div className="h1 mb-3 me-2">2,986</div>
                      <div className="me-auto">
                        <span className="text-green d-inline-flex align-items-center lh-1">
                          4%
                          {/* Download SVG icon from http://tabler.io/icons/icon/arrow-up */}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                            focusable="false"
                            className="icon ms-0 icon-sm"
                          >
                            <path d="M12 5l0 14" />
                            <path d="M18 11l-6 -6" />
                            <path d="M6 11l6 -6" />
                          </svg>
                        </span>
                      </div>
                    </div>
                    <div id="chart-active-users" className="position-relative chart-sm"></div>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="row row-cards">
                  <div className="col-sm-6 col-lg-3">
                    <div className="card card-sm">
                      <div className="card-body">
                        <div className="row align-items-center">
                          <div className="col-auto">
                            <span className="bg-primary text-white avatar avatar-square"
                              >{/* Download SVG icon from http://tabler.io/icons/icon/currency-dollar */}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                                focusable="false"
                                className="icon icon-1"
                              >
                                <path d="M16.7 8a3 3 0 0 0 -2.7 -2h-4a3 3 0 0 0 0 6h4a3 3 0 0 1 0 6h-4a3 3 0 0 1 -2.7 -2" />
                                <path d="M12 3v3m0 12v3" /></svg
                            ></span>
                          </div>
                          <div className="col">
                            <div className="font-weight-medium">132 Sales</div>
                            <div className="text-secondary">12 waiting payments</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6 col-lg-3">
                    <div className="card card-sm">
                      <div className="card-body">
                        <div className="row align-items-center">
                          <div className="col-auto">
                            <span className="bg-green text-white avatar avatar-square"
                              >{/* Download SVG icon from http://tabler.io/icons/icon/shopping-cart */}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                                focusable="false"
                                className="icon icon-1"
                              >
                                <path d="M4 19a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                                <path d="M15 19a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                                <path d="M17 17h-11v-14h-2" />
                                <path d="M6 5l14 1l-1 7h-13" /></svg
                            ></span>
                          </div>
                          <div className="col">
                            <div className="font-weight-medium">78 Orders</div>
                            <div className="text-secondary">32 shipped</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6 col-lg-3">
                    <div className="card card-sm">
                      <div className="card-body">
                        <div className="row align-items-center">
                          <div className="col-auto">
                            <span className="bg-x text-white avatar avatar-square"
                              >{/* Download SVG icon from http://tabler.io/icons/icon/brand-x */}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                                focusable="false"
                                className="icon icon-1"
                              >
                                <path d="M4 4l11.733 16h4.267l-11.733 -16l-4.267 0" />
                                <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" /></svg
                            ></span>
                          </div>
                          <div className="col">
                            <div className="font-weight-medium">623 Shares</div>
                            <div className="text-secondary">16 today</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6 col-lg-3">
                    <div className="card card-sm">
                      <div className="card-body">
                        <div className="row align-items-center">
                          <div className="col-auto">
                            <span className="bg-facebook text-white avatar avatar-square"
                              >{/* Download SVG icon from http://tabler.io/icons/icon/brand-facebook */}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                                focusable="false"
                                className="icon icon-1"
                              >
                                <path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3" /></svg
                            ></span>
                          </div>
                          <div className="col">
                            <div className="font-weight-medium">132 Likes</div>
                            <div className="text-secondary">21 today</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="card">
                  <div className="card-body">
                    <h3 className="card-title">Traffic summary</h3>
                    <div id="chart-mentions" className="position-relative chart-lg"></div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="card">
                  <div className="card-body">
                    <h3 className="card-title">Locations</h3>
                    <div className="ratio ratio-21x9">
                      <div>
                        <div id="map-world" className="w-100 h-100"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
    
        
         
      
   
   
    
           
            </div>
          </div>
        </main>
        {/* END PAGE BODY */}
    </div>
  );
}
