import { NavLink, Outlet } from "react-router-dom";

import './layout.css';

const Layout: React.FC = () => {
  
  return (
    <div className="flex-fill bg-white">
      <div className="container">
        <div className="row g-0">
          <div className="col-docs d-none d-lg-block border-end">
            <div className="py-4">
              <div className="space-y space-y-5">
                <div className="nav nav-vertical">

                  <NavLink to="/admin/configuration/users" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                    <span className="border me-2 rounded p-1">{/* Download SVG icon from http://tabler.io/icons/icon/world */}
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-1"><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" /><path d="M3.6 9h16.8" /><path d="M3.6 15h16.8" /><path d="M11.5 3a17 17 0 0 0 0 18" /><path d="M12.5 3a17 17 0 0 1 0 18" /></svg></span>
                    Users
                  </NavLink>

                </div>
                <div className="flex-fill">
                  <nav className="space-y space-y-5" id="menu">
                    <div>
                      <div className="subheader mb-2">
                        Company Structure
                      </div>
                      <nav className="nav nav-vertical">
                        <div>
                          <NavLink to="/admin/configuration/company" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Companies </NavLink>
                        </div>
                        <div>
                          <NavLink to="/admin/configuration/zone" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Zones </NavLink>
                        </div>
                        <div>
                          <NavLink to="/admin/configuration/branch" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Branches </NavLink>
                        </div>
                      </nav>
                    </div>
                    <div>
                      <div className="subheader mb-2">
                        Inventory
                      </div>
                      <nav className="nav nav-vertical">
                        <div>
                          <NavLink to="/admin/configuration/products" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Products</NavLink>
                        </div>
                      </nav>
                    </div>
                  </nav>
                </div>
              </div>
            </div>
          </div>
          <div className="col bg-docs-gradient">
            <div className="py-lg-5 ps-lg-5">
              <div className="py-6 ps-lg-6 p-xxl-6">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Layout }