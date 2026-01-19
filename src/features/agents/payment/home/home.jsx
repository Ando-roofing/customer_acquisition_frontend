// src/components/PaymentsList.jsx
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
            placeholder="Search payments by customer..."
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
  const [payments, setPayments] = useState([]);
  const token = localStorage.getItem("accessToken");

  const fetchPayments = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/payments/payments-list/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = Array.isArray(res.data) ? res.data : res.data.results;
      setPayments(data || []);
    } catch (err) {
      console.error("Failed to fetch payments:", err);
    }
  };

  useEffect(() => {
    fetchPayments();
    const interval = setInterval(fetchPayments, 10000); // refresh every 10s
    return () => clearInterval(interval);
  }, []);

  const columns = React.useMemo(
    () => [
      { Header: "SN", Cell: ({ row }) => row.index + 1 },
      { Header: "Customer", accessor: "sales__customer__company_name" },
      {
        Header: "Total Collected",
        accessor: "total_collected",
        Cell: ({ value }) => parseFloat(value).toLocaleString() + " TZS",
      },
      {
        Header: "Remaining Balance",
        accessor: "remaining_balance",
        Cell: ({ value }) => (
          <span className={parseFloat(value) > 0 ? "text-danger fw-bold" : "text-success fw-bold"}>
            {parseFloat(value).toLocaleString()} TZS
          </span>
        ),
      },
      {
        Header: "Last Payment Date",
        accessor: "last_payment_date",
        Cell: ({ value }) => (value ? new Date(value).toLocaleString() : "N/A"),
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
  } = useTable({ columns, data: payments }, useGlobalFilter, useSortBy);

  // Calculate totals
  const totalCollectedAll = payments.reduce((sum, p) => sum + parseFloat(p.total_collected || 0), 0);
  const totalRemainingAll = payments.reduce((sum, p) => sum + parseFloat(p.remaining_balance || 0), 0);

  return (

    <div className="page-wrapper">

      <div className="page-header d-print-none">
        <div className="container-xl">
          <div className="row g-2 align-items-center">
            <div className="col">
              {/* Page pre-title */}
              <div className="page-pretitle">agent</div>
              <h1 className="page-title">Customer Payment Summary</h1>
            </div>
            {/* Page title actions */}
            <div className="col-auto ms-auto d-print-none">
              <div className="btn-list">

                <GlobalFilter globalFilter={state.globalFilter} setGlobalFilter={setGlobalFilter} />

      
              </div>
              {/* BEGIN MODAL */}
              {/* END MODAL */}
            </div>
          </div>
        </div>
      </div>
      <main id="content" className="page-body">
        <div className="container ">


<div className="card">
          <div className="table-responsive ">
            <table {...getTableProps()} className="table table-hover align-middle">
              <thead className="table-light">
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                    {headerGroup.headers.map((column) => (
                      <th {...column.getHeaderProps(column.getSortByToggleProps())} key={column.id}>
                        {column.render("Header")}
                        <span>{column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}</span>
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
                      No payments found.
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
