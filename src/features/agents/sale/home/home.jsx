// src/components/SalesList.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useTable, useSortBy, useGlobalFilter } from "react-table";

import { FaSearch } from "react-icons/fa";

function GlobalFilter({ globalFilter, setGlobalFilter }) {
  return (
    <div className="">
      <div className="row g-2">
        <div className="col">
          <input
            value={globalFilter || ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="form-control"
            placeholder="Search sales by customer..."
          />
        </div>
        <div className="col-auto">
          <a className="btn btn-2 btn-icon" aria-label="Button">

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
  const [sales, setSales] = useState([]);
  const token = localStorage.getItem("accessToken");

  const fetchSales = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/sales/sales-list/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = Array.isArray(res.data) ? res.data : res.data.results;
      setSales(data || []);
    } catch (err) {
      console.error("Failed to fetch sales:", err);
    }
  };

  useEffect(() => {
    fetchSales();
    const interval = setInterval(fetchSales, 10000); // refresh every 10s
    return () => clearInterval(interval);
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case "Open":
        return "bg-secondary";
      case "Paid":
        return "bg-success";
      case "Won":
        return "bg-primary";
      case "Lost":
        return "bg-danger";
      default:
        return "bg-secondary";
    }
  };

  const columns = React.useMemo(
    () => [
      { Header: "#", Cell: ({ row }) => row.index + 1 },
      { Header: "Customer", accessor: "customer_name" },
      { Header: "Total Price", accessor: (row) => `${row.total_price || 0} TZS` },
      {
        Header: "Final Order",
        accessor: "is_order_final",
        Cell: ({ value }) =>
          value ? (
            <span className="badge bg-success">Yes</span>
          ) : (
            <span className="badge bg-danger">No</span>
          ),
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ value }) => (
          <span className={`badge ${getStatusBadge(value)}`}>{value || "N/A"}</span>
        ),
      },
      {
        Header: "Date",
        accessor: (row) => new Date(row.created_at).toLocaleString(),
      },
      {
        Header: "Actions",
        Cell: ({ row }) => {
          const sale = row.original;
          return (
            <div className="d-flex gap-2 justify-content-end">
              <Link
                to={`/sales-details/${sale.id}`}
                className="btn btn-sm btn-outline-info"
              >
                View Sales
              </Link>

            </div>
          );
        },
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
  } = useTable({ columns, data: sales }, useGlobalFilter, useSortBy);

  return (<div className="page-wrapper">

    <div className="page-header d-print-none">
      <div className="container-xl">
        <div className="row g-2 align-items-center">
          <div className="col">
            {/* Page pre-title */}
            <div className="page-pretitle">agent</div>
            <h1 className="page-title">Sales Management</h1>
          </div>
          {/* Page title actions */}
          <div className="col-auto ms-auto d-print-none">
            <div className="btn-list">

              <GlobalFilter globalFilter={state.globalFilter} setGlobalFilter={setGlobalFilter} />

              <Link to="/agent/sale/new" className="btn btn-primary btn-5 d-none d-sm-inline-block">
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
                </svg> New Sale
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
            <table
              {...getTableProps()}
              className="table table-hover align-middle"
            >
              <thead className="table-light">
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                    {headerGroup.headers.map((column) => (
                      <th
                        {...column.getHeaderProps(column.getSortByToggleProps())}
                        key={column.id}
                      >
                        {column.render("Header")}
                        <span>
                          {column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}
                        </span>
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
                      <tr {...row.getRowProps()} key={row.id}>
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
                      No sales found.
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
