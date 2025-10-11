import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useTable, useSortBy, useGlobalFilter } from "react-table";
import "bootstrap/dist/css/bootstrap.min.css";

function GlobalFilter({ globalFilter, setGlobalFilter }) {
  return (
    <span className="mb-2 d-block">
      Search:{" "}
      <input
        value={globalFilter || ""}
        onChange={(e) => setGlobalFilter(e.target.value)}
        className="form-control d-inline-block w-auto"
        placeholder="Search products"
      />
    </span>
  );
}

function Products() {
  const [products, setProducts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const token = localStorage.getItem("accessToken");

  // Fetch products
  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/products/products/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const openModal = (product = null) => {
    if (product) {
      setName(product.name);
      setEditingId(product.id);
    } else {
      setName("");
      setEditingId(null);
    }
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
      setError("Product name is required.");
      return;
    }

    try {
      if (editingId) {
        await axios.put(
          `http://127.0.0.1:8000/products/products/${editingId}/update/`,
          { name },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await axios.post(
          "http://127.0.0.1:8000/products/products/create/",
          { name },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
      fetchProducts();
      closeModal();
    } catch (err) {
      setError(
        err.response?.data?.name?.[0] || "Failed to save product. Please try again."
      );
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`http://127.0.0.1:8000/products/products/${id}/delete/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchProducts();
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  // React Table
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
    [products]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable(
    { columns, data: products },
    useGlobalFilter,
    useSortBy
  );

  return (
    <div className="container mt-4">
      <h3 className="mb-3 fw-bold text-teal-700">
        <i className="fas fa-box-open me-2 text-primary"></i>
        Product Management
      </h3>

      <button className="btn btn-success mb-2" onClick={() => openModal()}>
        <i className="fas fa-plus me-2"></i> Add Product
      </button>

      <GlobalFilter globalFilter={state.globalFilter} setGlobalFilter={setGlobalFilter} />

      <div className="table-responsive">
        <table {...getTableProps()} className="table table-hover align-middle">
          <thead className="table-light">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className="text-nowrap"
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
            {rows.length > 0 ? (
              rows.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    ))}
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={columns.length} className="text-center text-muted">
                  No products found.
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
                  <h5 className="modal-title">
                    {editingId ? "Update Product" : "Add Product"}
                  </h5>
                  <button type="button" className="btn-close" onClick={closeModal}></button>
                </div>
                <div className="modal-body">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter product name"
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

export default Products;
