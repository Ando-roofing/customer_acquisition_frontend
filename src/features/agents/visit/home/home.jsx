// src/components/Visits.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTable, useSortBy, useGlobalFilter } from "react-table";
import { Link } from "react-router-dom";


// Global Filter + Add Visit link
function GlobalFilter({ globalFilter, setGlobalFilter }) {
  return (
    <div className="">
      <div className="row g-2">
        <div className="col">
          <input
            value={globalFilter || ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="form-control"
            placeholder="Search visits..."
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
  const [visits, setVisits] = useState([]);
  const token = localStorage.getItem("accessToken");

  const fetchVisits = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/visits/visit-list/", {
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
                to={`/visit-details/${id}`}
                className="btn btn-sm btn-outline-info"
              >
                <i className="bi bi-eye"></i> View Detail
              </Link>
              <Link
                to={`/visit-update/${id}/update`}
                className="btn btn-sm btn-outline-warning"
              >
                <i className="bi bi-pencil-square"></i> Add Followup
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
    <div className="page-wrapper">
      <div className="page-header d-print-none">
        <div className="container-xl">
          <div className="row g-2 align-items-center">
            <div className="col">
              {/* Page pre-title */}
              <div className="page-pretitle">agent</div>
              <h1 className="page-title">Visit Management</h1>
            </div>
            {/* Page title actions */}
            <div className="col-auto ms-auto d-print-none">
              <div className="btn-list">

                <GlobalFilter globalFilter={state.globalFilter} setGlobalFilter={setGlobalFilter} />

                <Link to="/agent/visit/new" className="btn btn-primary btn-5 d-none d-sm-inline-block">
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
                  </svg> New Visit
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
                className="table table-hover align-middle "
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


        </div>
      </main>
    </div>
  );
}
