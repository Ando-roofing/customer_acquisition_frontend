// src/components/SalesList.jsx
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
          placeholder="Search sales by customer..."
        />
      </div>
     
    </div>
  );
}

export default function SalesList() {
  const [sales, setSales] = useState([]);
  const token = localStorage.getItem("accessToken");

  const fetchSales = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/sales/admin-sales-list/", {
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
                to={`/admin-sales-details/${sale.id}`}
                className="btn btn-sm btn-outline-info"
              >
                Admin View Sales
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

  return (
    <div className="container mt-4">
      <h3 className="mb-3 fw-bold text-primary">
        Sales Management
      </h3>

      <GlobalFilter globalFilter={state.globalFilter} setGlobalFilter={setGlobalFilter} />

      <div className="table-responsive shadow-sm rounded">
        <table
          {...getTableProps()}
          className="table table-hover align-middle table-bordered"
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
  );
}
