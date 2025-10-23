import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTable, useSortBy, useGlobalFilter } from "react-table";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// Global Filter + Add Submission Button
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
          placeholder="Search submissions..."
        />
      </div>
      <Link to="/submit-verification" className="btn btn-success">
        <i className="bi bi-plus-circle me-1"></i> Add Verification
      </Link>
    </div>
  );
}

export default function MySubmissionsTable() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("accessToken");

  // Fetch submissions
  const fetchSubmissions = async () => {
    try {
      const res = await axios.get(
        "http://127.0.0.1:8000/verifications/visits/my-submissions/",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSubmissions(Array.isArray(res.data) ? res.data : res.data.results);
    } catch (err) {
      console.error("Error fetching submissions:", err);
      setError("Failed to load submissions.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
    const interval = setInterval(fetchSubmissions, 10000); // auto-refresh every 10s
    return () => clearInterval(interval);
  }, []);

  // Table columns with colored status badges
  const columns = React.useMemo(
    () => [
      {
        Header: "Visit",
        accessor: (row) =>
          row.customer_name ? row.customer_name : `Visit #${row.visit_id}`,
      },
      { Header: "Sent To (Supervisor)", accessor: "sent_to_name" },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ value }) => {
          let bgColor = "";
          switch (value) {
            case "Pending":
              bgColor = "bg-warning text-dark";
              break;
            case "Approved":
              bgColor = "bg-success text-white";
              break;
            case "Returned":
              bgColor = "bg-danger text-white";
              break;
            default:
              bgColor = "bg-secondary text-white";
          }
          return <span className={`badge ${bgColor} px-2 py-1`}>{value}</span>;
        },
      },
      {
        Header: "Submitted At",
        accessor: (row) =>
          new Date(row.created_at).toLocaleString("en-US", {
            dateStyle: "short",
            timeStyle: "short",
          }),
      },
      {
        Header: "Actions",
        Cell: ({ row }) => {
          const { visit_id } = row.original;
          return (
            <div className="d-flex justify-content-end gap-2">
              <Link
                    to={`/verifications-details/${row.original.id}`}
                    className="btn btn-sm btn-outline-info"
                    >
                    <i className="bi bi-eye"></i> View Detail
                    </Link>

               <Link
                                      to={`/user-verification-message/${row.original.id}`}
                                      className="btn btn-sm btn-outline-warning"
                                      >
                                      <i className="bi bi-pencil-square"></i> View Chats
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
  } = useTable({ columns, data: submissions }, useGlobalFilter, useSortBy);

  if (loading) return <div className="text-center mt-4">Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container mt-4">
      <h3 className="mb-3 fw-bold text-primary">
        <i className="bi bi-check2-square me-2"></i> My Verification Submissions
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
                  No submissions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
