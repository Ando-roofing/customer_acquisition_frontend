import React from "react";
import Sidebar from "@shared/components/Sidebar";
import Nav from "@shared/components/Nav";
import Users from "../../../components/Users";

export default function UserList() {
  return (
    <div className="page-wrapper">
        <div className="container">
            <Users />
        </div>
    </div>
  );
}
