// src/components/PaymentsList.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useTable, useSortBy, useGlobalFilter } from "react-table";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaSearch } from "react-icons/fa";

function GlobalFilter({ globalFilter, setGlobalFilter }) {
  return (
    <div className="d-flex justify-content-between align-items-center mb-3">
      <div className="input-group w-50">
        <span className="input-group-text bg-light">
          <FaSearch />
        </span>
        <input
          value={globalFilter || ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="form-control"
          placeholder="Search payments by customer..."
        />
      </div>
    </div>
  );
}

export default function PaymentsList() {
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
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Customer Payment Summary</h3>
        <div className="text-end">
          <h6 className="mb-1 text-success">Total Collected: {totalCollectedAll.toLocaleString()} TZS</h6>
          <h6 className="text-danger">Total Remaining: {totalRemainingAll.toLocaleString()} TZS</h6>
        </div>
      </div>

      <GlobalFilter globalFilter={state.globalFilter} setGlobalFilter={setGlobalFilter} />

      <div className="table-responsive shadow-sm rounded">
        <table {...getTableProps()} className="table table-hover align-middle table-bordered">
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
  );
}
