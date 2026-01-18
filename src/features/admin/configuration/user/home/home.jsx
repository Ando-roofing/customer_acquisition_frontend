// src/components/Users.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

import { useTable, useSortBy, useGlobalFilter } from "react-table";
import { useNavigate, Link } from "react-router-dom";


// Global filter + Add User link
function GlobalFilter({ globalFilter, setGlobalFilter }) {
  return (
    <div className="">
      <div className="row g-2">
        <div className="col">
          <input
            value={globalFilter || ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="form-control d-inline-block w-auto"
            placeholder="Search users"
          />
        </div>
        <div className="col-auto">
          <a  className="btn btn-2 btn-icon" aria-label="Button">

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="icon icon-2"
            >
              <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
              <path d="M21 21l-6 -6" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

export function Home() {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  // Fetch users from API
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/accounts/users-lists/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Make sure we get an array
      setUsers(Array.isArray(res.data) ? res.data : res.data.results);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Delete user
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`http://127.0.0.1:8000/accounts/users/${id}/delete/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  // Table columns
  const columns = React.useMemo(
    () => [
      { Header: "#", Cell: ({ row }) => row.index + 1 },
      { Header: "First Name", accessor: "first_name" },
      { Header: "Last Name", accessor: "last_name" },
      { Header: "Company", accessor: "company_name" },
      { Header: "Branch", accessor: "branch_name" },
      {
        Header: "Joined",
        accessor: (row) => new Date(row.date_joined).toLocaleDateString(),
      },
      {
        Header: "Actions",
        Cell: ({ row }) => (
          <div className="d-flex justify-content-end">
            <Link
              to={`/users-details/${row.original.id}`}
              className="btn btn-sm btn-outline-info me-2"
            >
              View Details
            </Link>
            {/* Replace the navigate button with Link */}
            <Link
              to={`/users-update/${row.original.id}/update`}
              className="btn btn-sm btn-outline-warning me-2"
            >
              Edit
            </Link>
            <button
              className="btn btn-sm btn-outline-danger"
              onClick={() => handleDelete(row.original.id)}
            >
              Delete
            </button>
          </div>
        ),
      },
    ],
    [navigate]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable({ columns, data: users }, useGlobalFilter, useSortBy);

  return (
    <div>
      <div className="page-header d-print-none">
        <div className="container-xl">
          <div className="row g-2 align-items-center">
            <div className="col">
              {/* Page pre-title */}
              <div className="page-pretitle">Configuration</div>
              <h1 className="page-title">User Management</h1>
            </div>
            {/* Page title actions */}
            <div className="col-auto ms-auto d-print-none">
              <div className="btn-list">
                <GlobalFilter globalFilter={state.globalFilter} setGlobalFilter={setGlobalFilter} className="me-3"/>

                <Link to="/admin/configuration/users/new" className="btn btn-primary btn-5 d-none d-sm-inline-block">
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
                </svg> Add User
                </Link>

              </div>
              {/* BEGIN MODAL */}
              {/* END MODAL */}
            </div>
          </div>
        </div>
      </div>
      <main id="content" className="page-body">
        <div className="container">
      


          <div className="card">
            <div className="table-responsive">
              <table {...getTableProps()} className="table table-hover align-middle">
                <thead className="table-light">
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                      {headerGroup.headers.map((column) => (
                        <th
                          {...column.getHeaderProps(column.getSortByToggleProps())}
                          key={column.id}
                        >
                          {column.render("Header")}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                  {rows.length ? (
                    rows.map((row, idx) => {
                      prepareRow(row);
                      return (
                        <tr {...row.getRowProps()} key={row.index}>
                          {row.cells.map((cell) => (
                            <td {...cell.getCellProps()} key={cell.column.id}>
                              {cell.render("Cell")}
                            </td>
                          ))}
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={columns.length} className="text-center text-muted">
                        No users found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>

  );
}
