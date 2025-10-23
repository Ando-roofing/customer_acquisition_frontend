// src/components/Visits.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTable, useSortBy, useGlobalFilter } from "react-table";
import { Link } from "react-router-dom";


// Global Filter + Add Visit link
function GlobalFilter({ globalFilter, setGlobalFilter }) {
  return (
    <div className="d-flex justify-content-between align-items-center mb-3">
      <div className="input-group w-50">
        <span className="input-group-text bg-light">
          <i className="bi bi-search"></i>
        </span>
        <input
          value={globalFilter || ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="form-control"
          placeholder="Search visits..."
        />
      </div>
      
    </div>
  );
}

export default function Visits() {
  const [visits, setVisits] = useState([]);
  const token = localStorage.getItem("accessToken");

  const fetchVisits = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/visits/admin-visit-list/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = Array.isArray(res.data) ? res.data : res.data.results;
      setVisits(data || []);
    } catch (err) {
      console.error("Failed to fetch visits:", err);
    }
  };

  useEffect(() => {
    fetchVisits();
    const interval = setInterval(fetchVisits, 10000); // 🔄 refresh every 10s
    return () => clearInterval(interval);
  }, []);

  const columns = React.useMemo(
    () => [
      { Header: "#", Cell: ({ row }) => row.index + 1 },
      { Header: "Company", accessor: "company_name" },
      { Header: "Location", accessor: "place_name" },
      {
        Header: "Created At",
        accessor: (row) => new Date(row.created_at).toLocaleString(),
      },
      {
        Header: "Actions",
        Cell: ({ row }) => {
          const { id, latitude, longitude } = row.original;
          const mapLink =
            latitude && longitude
              ? `https://www.google.com/maps?q=${latitude},${longitude}`
              : null;

          return (
            <div className="d-flex justify-content-end gap-2">
              <Link
                to={`/admin-visit-details/${id}`}
                className="btn btn-sm btn-outline-info"
              >
                <i className="bi bi-eye"></i> View Detail
              </Link>
               
              {mapLink && (
                <a
                  href={mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-sm btn-outline-primary"
                >
                  <i className="bi bi-geo-alt"></i> Map
                </a>
              )}
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
  } = useTable({ columns, data: visits }, useGlobalFilter, useSortBy);

  return (
    <div className="container mt-4">
      <h3 className="mb-3 fw-bold text-primary">
        <i className="bi bi-calendar2-check me-2"></i> Visit Management
      </h3>

      <GlobalFilter
        globalFilter={state.globalFilter}
        setGlobalFilter={setGlobalFilter}
      />

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
                      {column.isSorted
                        ? column.isSortedDesc
                          ? " 🔽"
                          : " 🔼"
                        : ""}
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
                  No visits found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
