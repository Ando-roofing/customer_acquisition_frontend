import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function GlobalFilter({ globalFilter, setGlobalFilter }) {
  return (
    <span className="mb-2 d-block">
      Search:{" "}
      <input
        value={globalFilter || ""}
        onChange={(e) => setGlobalFilter(e.target.value)}
        className="form-control d-inline-block w-auto"
        placeholder="Search branches"
      />
    </span>
  );
}

function Branches() {
  const [branches, setBranches] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const [globalFilter, setGlobalFilter] = useState("");
  const token = localStorage.getItem("accessToken");

  // Fetch branches
  const fetchBranches = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/accounts/branches/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBranches(res.data);
    } catch (err) {
      console.error("Error fetching branches:", err);
    }
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  const openModal = (branch = null) => {
    if (branch) {
      setName(branch.name);
      setEditingId(branch.id);
    } else {
      setName("");
      setEditingId(null);
    }
    setError("");
    setModalOpen(true);
  };

  const closeModal = () => {
    setName("");
    setEditingId(null);
    setError("");
    setModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Branch name is required.");
      return;
    }

    try {
      if (editingId) {
        await axios.put(
          `http://127.0.0.1:8000/accounts/branches/${editingId}/update/`,
          { name },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await axios.post(
          "http://127.0.0.1:8000/accounts/branches/create/",
          { name },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
      fetchBranches();
      closeModal();
    } catch (err) {
      setError(
        err.response?.data?.name?.[0] || "Failed to save branch. Please try again."
      );
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this branch?")) return;
    try {
      await axios.delete(`http://127.0.0.1:8000/accounts/branches/${id}/delete/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchBranches();
    } catch (err) {
      console.error("Error deleting branch:", err);
    }
  };

  const columns = useMemo(
    () => [
      {
        Header: "#",
        Cell: ({ row }) => row.index + 1,
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Created",
        accessor: (row) => new Date(row.created_at).toLocaleString(),
      },
      {
        Header: "Updated",
        accessor: (row) => new Date(row.updated_at).toLocaleString(),
      },
      {
        Header: "Actions",
        Cell: ({ row }) => (
          <div className="text-end">
            <button
              className="btn btn-sm btn-outline-primary me-2"
              onClick={() => openModal(row.original)}
            >
              <i className="fas fa-edit"></i>
            </button>
            <button
              className="btn btn-sm btn-outline-danger"
              onClick={() => handleDelete(row.original.id)}
            >
              <i className="fas fa-trash"></i>
            </button>
          </div>
        ),
      },
    ],
    [branches]
  );

  // Filter & sort
  const filteredBranches = branches.filter((b) =>
    b.name.toLowerCase().includes(globalFilter.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h3 className="mb-3 fw-bold text-teal-700">
        <i className="fas fa-code-branch me-2 text-primary"></i> Branch Management
      </h3>

      <button className="btn btn-success mb-2" onClick={() => openModal()}>
        <i className="fas fa-plus me-2"></i> Add Branch
      </button>

      <GlobalFilter globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />

      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Created</th>
              <th>Updated</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBranches.length > 0 ? (
              filteredBranches.map((branch, index) => (
                <tr key={branch.id}>
                  <td>{index + 1}</td>
                  <td>{branch.name}</td>
                  <td>{new Date(branch.created_at).toLocaleString()}</td>
                  <td>{new Date(branch.updated_at).toLocaleString()}</td>
                  <td className="text-end">
                    <button
                      className="btn btn-sm btn-outline-primary me-2"
                      onClick={() => openModal(branch)}
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(branch.id)}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center text-muted">
                  No branches found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <form onSubmit={handleSubmit}>
                <div className="modal-header">
                  <h5 className="modal-title">{editingId ? "Update Branch" : "Add Branch"}</h5>
                  <button type="button" className="btn-close" onClick={closeModal}></button>
                </div>
                <div className="modal-body">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter branch name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  {error && <div className="text-danger mt-2">{error}</div>}
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={closeModal}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {editingId ? "Update" : "Add"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Branches;
