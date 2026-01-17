import { Link } from 'react-router-dom';

function AgentMenu() {
  return (
    <ul className="nav nav-secondary">
      <li className="nav-section mt-3">
        <span className="sidebar-mini-icon">
          <i className="fas fa-ellipsis-h"></i>
        </span>
        <h4 className="text-section text-white">MENUS</h4>
      </li>

      {/* Regular Links */}
      <li className="nav-item">
        <Link to="/add_visit" className="nav-link text-white d-flex align-items-center">
          <i className="fas fa-home me-2"></i> Home
        </Link>
      </li>



      <li className="nav-item">
        <Link to="/sale-list" className="nav-link text-white d-flex align-items-center">
          <i className="fas fa-shopping-cart me-2"></i> Sales
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/visit-lists" className="nav-link text-white d-flex align-items-center">
          <i className="fas fa-calendar-check me-2"></i> Visits Submitted
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/visit-verification-list" className="nav-link text-white d-flex align-items-center">
          <i className="fas fa-calendar-check me-2"></i> Submitted Verifications
        </Link>
      </li>


      <li className="nav-item">
        <Link to="/customers" className="nav-link text-white d-flex align-items-center">
          <i className="fas fa-address-book me-2"></i> Customer Directory
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/payments" className="nav-link text-white d-flex align-items-center">
          <i className="fas fa-money-bill me-2"></i> Payments
        </Link>
      </li>






     
    </ul>
  );
}

export default AgentMenu;