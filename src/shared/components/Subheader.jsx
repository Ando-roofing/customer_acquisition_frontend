import { Link, useNavigate } from 'react-router-dom';

function SubHeader() {
  return (<header className="navbar-expand-md">
    <div className="collapse navbar-collapse" id="navbar-menu">
      <div className="navbar">
        <div className="container-xl">
          <div className="row flex-column flex-md-row flex-fill align-items-center">
            <div className="col">
              {/* BEGIN NAVBAR MENU */}
              <ul className="navbar-nav">

                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    <span className="nav-link-icon d-md-none d-lg-inline-block"
                    >{/* Download SVG icon from http://tabler.io/icons/icon/home */}
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
                    <span className="nav-link-title"> Home </span>
                  </Link>
                </li>

                <li className="nav-item ">
                  <Link
                    className="nav-link "
                    to="/visits"




                  >
                    <span className="nav-link-icon d-md-none d-lg-inline-block"
                    >{/* Download SVG icon from http://tabler.io/icons/icon/puzzle */}
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
                          d="M4 7h3a1 1 0 0 0 1 -1v-1a2 2 0 0 1 4 0v1a1 1 0 0 0 1 1h3a1 1 0 0 1 1 1v3a1 1 0 0 0 1 1h1a2 2 0 0 1 0 4h-1a1 1 0 0 0 -1 1v3a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-1a2 2 0 0 0 -4 0v1a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1h1a2 2 0 0 0 0 -4h-1a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1"
                        /></svg>
                    </span>
                    <span className="nav-link-title"> Visits</span>
                  </Link>

                </li>

                <li className="nav-item">
                  <Link
                    className="nav-link "
                    to="/sales"




                  >
                    <span className="nav-link-icon d-md-none d-lg-inline-block"
                    >{/* Download SVG icon from http://tabler.io/icons/icon/layout-2 */}
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
                        <path d="M4 4m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v1a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" />
                        <path d="M4 13m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v3a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" />
                        <path d="M14 4m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v3a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" />
                        <path d="M14 15m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v1a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" /></svg>
                    </span>
                    <span className="nav-link-title"> Sales </span>
                  </Link>

                </li>

                <li className="nav-item ">
                  <Link
                    className="nav-link "
                    to="/customers"




                  >
                    <span className="nav-link-icon d-md-none d-lg-inline-block"
                    >{/* Download SVG icon from http://tabler.io/icons/icon/lifebuoy */}
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
                        <path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
                        <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                        <path d="M15 15l3.35 3.35" />
                        <path d="M9 15l-3.35 3.35" />
                        <path d="M5.65 5.65l3.35 3.35" />
                        <path d="M18.35 5.65l-3.35 3.35" /></svg>
                    </span>
                    <span className="nav-link-title"> Customers </span>
                  </Link>

                </li>

                <li className="nav-item ">
                  <Link
                    className="nav-link "
                    to="/payments"




                  >
                    <span className="nav-link-icon d-md-none d-lg-inline-block"
                    >{/* Download SVG icon from http://tabler.io/icons/icon/lifebuoy */}
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
                        <path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
                        <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                        <path d="M15 15l3.35 3.35" />
                        <path d="M9 15l-3.35 3.35" />
                        <path d="M5.65 5.65l3.35 3.35" />
                        <path d="M18.35 5.65l-3.35 3.35" /></svg>
                    </span>
                    <span className="nav-link-title"> Payments </span>
                  </Link>

                </li>

              </ul>
              {/* END NAVBAR MENU */}
            </div>
            <div className="col col-md-auto">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link
                    className="nav-link "
                    to="/visits"  >

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

          </div>
        </div>
      </div>
    </div>
  </header>)
}

export default SubHeader;