// src/components/Customers.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTable, useSortBy, useGlobalFilter } from "react-table";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// Global filter + Add Customer link
function GlobalFilter({ globalFilter, setGlobalFilter }) {
  return (
    <div className="d-flex justify-content-between align-items-center mb-3">
      <div>
        Search:{" "}
        <input
          value={globalFilter || ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="form-control d-inline-block w-auto"
          placeholder="Search customers"
        />
      </div>
      <Link to="/add-customers" className="btn btn-success">
        Add Customer
      </Link>
    </div>
  );
}

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  // Fetch customers from API
  const fetchCustomers = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/customers/customers/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCustomers(Array.isArray(res.data) ? res.data : res.data.results);
    } catch (err) {
      console.error("Failed to fetch customers:", err);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  // Delete customer
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this customer?")) return;
    try {
      await axios.delete(`http://127.0.0.1:8000/customers/customers/${id}/delete/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCustomers();
    } catch (err) {
      console.error(err);
    }
  };

  // Table columns (only desired fields)
  const columns = React.useMemo(
    () => [
      { Header: "#", Cell: ({ row }) => row.index + 1 },
      { Header: "Company Name", accessor: "company_name" },
      { Header: "Designation", accessor: "designation" },
      { Header: "Email", accessor: "email" },
      {
        Header: "Created At",
        accessor: (row) => new Date(row.created_at).toLocaleDateString(),
      },
      {
        Header: "Actions",
        Cell: ({ row }) => (
          <div className="d-flex justify-content-end">
            <Link
              to={`/customers-details/${row.original.id}`}
              className="btn btn-sm btn-outline-info me-2"
            >
              View
            </Link>
            <Link
              to={`/customers-update/${row.original.id}/update`}
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
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable({ columns, data: customers }, useGlobalFilter, useSortBy);

  return (
    <div className="container mt-4">
      <h3 className="mb-3 fw-bold text-primary">Customer Management</h3>

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
              rows.map((row) => {
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
                  No customers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
