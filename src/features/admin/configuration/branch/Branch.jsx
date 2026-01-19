import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";


function GlobalFilter({ globalFilter, setGlobalFilter }) {
  return (
    <div className="">
      <div className="row g-2">
        <div className="col">
        <input
          value={globalFilter || ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="form-control d-inline-block w-auto"
          placeholder="Search branches"
        />
      </div>
      <div className="col-auto">
        <a  className="btn btn-2 btn-icon" aria-label="Button">

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

function Branch() {
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
    <div >
      <div className="page-header d-print-none">
        <div className="container-xl">
          <div className="row g-2 align-items-center">
            <div className="col">
              {/* Page pre-title */}
              <div className="page-pretitle">Configuration</div>
              <h1 className="page-title">Branch Management</h1>
            </div>
            {/* Page title actions */}
            <div className="col-auto ms-auto d-print-none">
              <div className="btn-list">

                <GlobalFilter globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />

                <a className="btn btn-primary btn-5 d-none d-sm-inline-block"  onClick={() => openModal()}>
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
                  </svg> New Branch
                </a>

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
      </main>
    </div>
  );
}

export { Branch };
