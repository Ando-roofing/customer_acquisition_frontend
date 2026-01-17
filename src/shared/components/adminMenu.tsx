import { Link } from 'react-router-dom';

function AdminMenu() {
  return (
    <ul className="navbar-nav">
      <li className="nav-item">
        <Link className="nav-link" to="/admin/">
          <span className="nav-link-title">Home</span>
        </Link>
      </li>

      <li className="nav-item">
        <Link className="nav-link" to="/admin/visits">
          <span className="nav-link-title">Visits</span>
        </Link>
      </li>

      <li className="nav-item">
        <Link className="nav-link" to="/admin/sales">
          <span className="nav-link-title">Sales</span>
        </Link>
      </li>

      <li className="nav-item">
        <Link className="nav-link" to="/admin/customers">
          <span className="nav-link-title">Customers</span>
        </Link>
      </li>

      <li className="nav-item">
        <Link className="nav-link" to="/admin/payment">
          <span className="nav-link-title">Payments</span>
        </Link>
      </li>
    </ul>
  );
}

export default AdminMenu;
