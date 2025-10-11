import React from "react";
import Sidebar from "../../components/Sidebar";
import Nav from "../../components/Nav";
import Users from "../../components/Users";

export default function UserList() {
  return (
    <div className="wrapper">
      <Sidebar />

      <div className="main-panel">
        <div className="main-header">
          <div className="main-header-logo">
            <div className="logo-header" data-background-color="dark">
              <a href="/" className="logo">
                <img
                  src="/assets/img/kaiadmin/logo_light.svg"
                  alt="navbar brand"
                  className="navbar-brand"
                  height={20}
                />
              </a>
              <div className="nav-toggle">
                <button className="btn btn-toggle toggle-sidebar">
                  <i className="gg-menu-right"></i>
                </button>
                <button className="btn btn-toggle sidenav-toggler">
                  <i className="gg-menu-left"></i>
                </button>
              </div>
            </div>
          </div>
          <Nav />
        </div>

        <div className="container">
          <div className="page-inner">
            <Users />
          </div>
        </div>
      </div>
    </div>
  );
}
