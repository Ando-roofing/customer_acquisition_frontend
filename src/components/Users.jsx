// src/components/Users.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

import { useTable, useSortBy, useGlobalFilter } from "react-table";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// Global filter + Add User link
function GlobalFilter({ globalFilter, setGlobalFilter }) {
  return (
    <div className="d-flex justify-content-between align-items-center mb-3">
      <div>
        Search:{" "}
        <input
          value={globalFilter || ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="form-control d-inline-block w-auto"
          placeholder="Search users"
        />
      </div>
      <Link to="/add-user" className="btn btn-success">
        Add User
      </Link>
    </div>
  );
}

export default function Users() {
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
    <div className="container mt-4">
      <h3 className="mb-3 fw-bold text-primary">User Management</h3>

      <GlobalFilter globalFilter={state.globalFilter} setGlobalFilter={setGlobalFilter} />

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
  );
}
