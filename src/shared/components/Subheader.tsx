import { Link, useLocation, useNavigate } from 'react-router-dom';
import AdminMenu from './adminMenu';
import AgentMenu from './agentMenu';
import { isRouteActive } from '@shared/utils/menu.utils';

export type UserRole = 'admin' | 'agent';

type SubHeaderProps = {
  UserRole: UserRole;
};

function SubHeader({ UserRole }: SubHeaderProps) {
  const { pathname } = useLocation();
  return (<header className="navbar-expand-md">
    <div className="collapse navbar-collapse" id="navbar-menu">
      <div className="navbar">
        <div className="container-xl">
          <div className="row flex-column flex-md-row flex-fill align-items-center">
            <div className="col">
              {/* BEGIN NAVBAR MENU */}
              {UserRole === 'admin' && <AdminMenu />}
              {UserRole === 'agent' && <AgentMenu />}
              {/* END NAVBAR MENU */}
            </div>
            {UserRole === 'admin' && (
            <div className="col col-md-auto">
              <ul className="navbar-nav">
                <li className={`nav-item ${isRouteActive(pathname, '/admin/configuration') ? 'active' : ''}`}>
                  <Link
                    className="nav-link "
                    to="/admin/configuration"  >

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
                        <path
                          d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z"
                        />
                        <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
                      </svg>
                    </span>
                    <span className="nav-link-title"> Configuration </span>
                  </Link>
                </li>
              </ul>
            </div>
            )
            }

          </div>
        </div>
      </div>
    </div>
  </header>)
}

export default SubHeader;