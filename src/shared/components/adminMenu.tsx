import { isRouteActive } from '@shared/utils/menu.utils';
import { Link, useLocation } from 'react-router-dom';


function AdminMenu() {

  const { pathname } = useLocation();

  return (
    <ul className="navbar-nav">
      <li className={`nav-item ${isRouteActive(pathname, '/admin/') ? 'active' : ''}`}>
        <Link className="nav-link" to="/admin/">
          <span className="nav-link-icon d-md-none d-lg-inline-block"> 
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
              className="icon icon-1"
            >
              <path d="M5 12l-2 0l9 -9l9 9l-2 0" />
              <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
              <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" /></svg>
          </span>
          <span className="nav-link-title">Home</span>
        </Link>
      </li>

      <li className={`nav-item ${isRouteActive(pathname, '/admin/visits') ? 'active' : ''}`}>
        <Link className="nav-link" to="/admin/visits">
          <span className="nav-link-icon d-md-none d-lg-inline-block"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-map-pin-2"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 18.5l-3 -1.5l-6 3v-13l6 -3l6 3l6 -3v7" /><path d="M9 4v13" /><path d="M15 7v5" /><path d="M21.121 20.121a3 3 0 1 0 -4.242 0c.418 .419 1.125 1.045 2.121 1.879c1.051 -.89 1.759 -1.516 2.121 -1.879" /><path d="M19 18v.01" /></svg></span>
          <span className="nav-link-title">Visits</span>
        </Link>
      </li>

      <li className={`nav-item ${isRouteActive(pathname, '/admin/sales') ? 'active' : ''}`}>
        <Link className="nav-link" to="/admin/sales">
          <span className="nav-link-icon d-md-none d-lg-inline-block"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-shopping-bag"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6.331 8h11.339a2 2 0 0 1 1.977 2.304l-1.255 8.152a3 3 0 0 1 -2.966 2.544h-6.852a3 3 0 0 1 -2.965 -2.544l-1.255 -8.152a2 2 0 0 1 1.977 -2.304" /><path d="M9 11v-5a3 3 0 0 1 6 0v5" /></svg></span>
          <span className="nav-link-title">Sales</span>
        </Link>
      </li>

      <li className={`nav-item ${isRouteActive(pathname, '/admin/payment') ? 'active' : ''}`}>
        <Link className="nav-link" to="/admin/payment">
          <span className="nav-link-icon d-md-none d-lg-inline-block"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-report-money"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" /><path d="M9 5a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2" /><path d="M14 11h-2.5a1.5 1.5 0 0 0 0 3h1a1.5 1.5 0 0 1 0 3h-2.5" /><path d="M12 17v1m0 -8v1" /></svg></span>
          <span className="nav-link-title">Payments</span>
        </Link>
      </li>

      <li className={`nav-item ${isRouteActive(pathname, '/admin/delivery') ? 'active' : ''}`}>
        <Link className="nav-link" to="/admin/delivery">
          <span className="nav-link-icon d-md-none d-lg-inline-block"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-truck-delivery"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 17a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M15 17a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M5 17h-2v-4m-1 -8h11v12m-4 0h6m4 0h2v-6h-8m0 -5h5l3 5" /><path d="M3 9l4 0" /></svg></span>
          <span className="nav-link-title">Delivery</span>
        </Link>
      </li>

      <li className={`nav-item ${isRouteActive(pathname, '/admin/customers') ? 'active' : ''}`}>
        <Link className="nav-link" to="/admin/customers">
          <span className="nav-link-icon d-md-none d-lg-inline-block"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-users"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 7a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" /><path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /><path d="M21 21v-2a4 4 0 0 0 -3 -3.85" /></svg></span>
          <span className="nav-link-title">Customers</span>
        </Link>
      </li>

      
    </ul>
  );
}

export default AdminMenu;
