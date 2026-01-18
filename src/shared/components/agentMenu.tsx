import { isRouteActive } from '@shared/utils/menu.utils';
import { Link, useLocation } from 'react-router-dom';

function AgentMenu() {
  
  const { pathname } = useLocation();

  return (
    <ul className="nav nav-secondary">
      <li className="nav-section mt-3">
        <span className="sidebar-mini-icon">
          <i className="fas fa-ellipsis-h"></i>
        </span>
        <h4 className="text-section text-white">MENUS</h4>
      </li>

      {/* Regular Links */}
      <li className={`nav-item ${isRouteActive(pathname, '/admin/') ? 'active' : ''}`}>
        <Link to="/agent/visit" className="nav-link text-white d-flex align-items-center">
          <i className="fas fa-home me-2"></i> Home
        </Link>
      </li>



      <li className={`nav-item ${isRouteActive(pathname, '/admin/') ? 'active' : ''}`}>
        <Link to="/agent/sale" className="nav-link text-white d-flex align-items-center">
          <i className="fas fa-shopping-cart me-2"></i> Sales
        </Link>
      </li>


      <li className={`nav-item ${isRouteActive(pathname, '/admin/') ? 'active' : ''}`}>
        <Link to="/agent/visit-verification-list" className="nav-link text-white d-flex align-items-center">
          <i className="fas fa-calendar-check me-2"></i> Submitted Verifications
        </Link>
      </li>


      <li className={`nav-item ${isRouteActive(pathname, '/admin/') ? 'active' : ''}`}>
        <Link to="/agent/payments" className="nav-link text-white d-flex align-items-center">
          <i className="fas fa-money-bill me-2"></i> Payments
        </Link>
      </li>






     
    </ul>
  );
}

export default AgentMenu;