import { isRouteActive } from '@shared/utils/menu.utils';
import { Link, useLocation } from 'react-router-dom';

function AgentMenu() {

  const { pathname } = useLocation();

  return (
    <ul className="navbar-nav">


      {/* Regular Links */}
      <li className={`nav-item ${isRouteActive(pathname, '/agent/visit') ? 'active' : ''}`}>
        <Link to="/agent/visit" className="nav-link">
          <span className="nav-link-icon d-md-none d-lg-inline-block"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-map-pin-2"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 18.5l-3 -1.5l-6 3v-13l6 -3l6 3l6 -3v7" /><path d="M9 4v13" /><path d="M15 7v5" /><path d="M21.121 20.121a3 3 0 1 0 -4.242 0c.418 .419 1.125 1.045 2.121 1.879c1.051 -.89 1.759 -1.516 2.121 -1.879" /><path d="M19 18v.01" /></svg></span>
          <span className="nav-link-title">Visit</span>
        </Link>
      </li>



      <li className={`nav-item ${isRouteActive(pathname, '/agent/sale') ? 'active' : ''}`}>
        <Link to="/agent/sale" className="nav-link">
          <span className="nav-link-icon d-md-none d-lg-inline-block"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-shopping-bag"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M6.331 8h11.339a2 2 0 0 1 1.977 2.304l-1.255 8.152a3 3 0 0 1 -2.966 2.544h-6.852a3 3 0 0 1 -2.965 -2.544l-1.255 -8.152a2 2 0 0 1 1.977 -2.304" /><path d="M9 11v-5a3 3 0 0 1 6 0v5" /></svg></span>
          <span className="nav-link-title">Sales</span>
        </Link>
      </li>


      <li className={`nav-item ${isRouteActive(pathname, '/agent/payment') ? 'active' : ''}`}>
        <Link to="/agent/payment" className="nav-link">
          <span className="nav-link-icon d-md-none d-lg-inline-block"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-report-money"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" /><path d="M9 5a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2" /><path d="M14 11h-2.5a1.5 1.5 0 0 0 0 3h1a1.5 1.5 0 0 1 0 3h-2.5" /><path d="M12 17v1m0 -8v1" /></svg></span>
          <span className="nav-link-title">Payments</span>
        </Link>
      </li>


    </ul>
  );
}

export default AgentMenu;