// src/components/Customers.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTable, useSortBy, useGlobalFilter } from "react-table";
import { useNavigate, Link } from "react-router-dom";


// Global filter + Add Customer link
function GlobalFilter({ globalFilter, setGlobalFilter }) {
  return (

    <div className="">
      <div className="row g-2">
        <div className="col">
          <input
            value={globalFilter || ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="form-control d-inline-block w-auto"
            placeholder="Search customers"
          />
        </div>
        <div className="col-auto">
          <a href="form-elements.html#" className="btn btn-2 btn-icon" aria-label="Button">

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

  // Table columns (with red badge for missing designation)
  const columns = React.useMemo(
    () => [
      { Header: "#", Cell: ({ row }) => row.index + 1 },
      { Header: "Company Name", accessor: "company_name" },
      {
        Header: "Designation",
        accessor: "designation",
        Cell: ({ value }) =>
          value ? (
            value
          ) : (
            <span className="badge bg-danger text-white">No Designation</span>
          ),
      },
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

  return (<div className="page-wrapper">

    <div className="page-header d-print-none">
      <div className="container-xl">
        <div className="row g-2 align-items-center">
          <div className="col">
            {/* Page pre-title */}
            <div className="page-pretitle">admin</div>
            <h1 className="page-title">Customer Management</h1>
          </div>
          {/* Page title actions */}
          <div className="col-auto ms-auto d-print-none">
            <div className="btn-list">

              <GlobalFilter globalFilter={state.globalFilter} setGlobalFilter={setGlobalFilter} />

              <Link to="/admin/customers/new" className="btn btn-primary btn-5 d-none d-sm-inline-block">
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
                </svg> Add Customer
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
            <table {...getTableProps()} className="table table-vcenter card-table table-striped">
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
      </div>
    </main>
  </div>
  );
}
