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
                        href="empty.html#navbar-base"
                        
                        
                        
                        
                      >
                        <span className="nav-link-icon d-md-none d-lg-inline-block"
                          >{/* Download SVG icon from http://tabler.io/icons/icon/package */}
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
                            <path d="M12 3l8 4.5l0 9l-8 4.5l-8 -4.5l0 -9l8 -4.5" />
                            <path d="M12 12l8 -4.5" />
                            <path d="M12 12l0 9" />
                            <path d="M12 12l-8 -4.5" />
                            <path d="M16 5.25l-8 4.5" /></svg>
                          </span>
                        <span className="nav-link-title"> Interface </span>
                      </Link>
             
                    </li>
                    <li className="nav-item ">
                      <Link
                        className="nav-link "
                        to="/products"
                        
                        
                        
                        
                      >
                        <span className="nav-link-icon d-md-none d-lg-inline-block"
                          >{/* Download SVG icon from http://tabler.io/icons/icon/checkbox */}
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
                            <path d="M9 11l3 3l8 -8" />
                            <path d="M20 12v6a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h9" /></svg>
                          </span>
                        <span className="nav-link-title"> Products </span>
                      </Link>
              
                    </li>
                    <li className="nav-item active ">
                      <Link
                        className="nav-link "
                        to="/branches"
                        
                        
                        
                        
                      >
                        <span className="nav-link-icon d-md-none d-lg-inline-block"
                          >{/* Download SVG icon from http://tabler.io/icons/icon/star */}
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
                            <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" /></svg></span>
                        <span className="nav-link-title"> Branches </span>
                      </Link>
               
                    </li>
                    <li className="nav-item ">
                      <Link
                        className="nav-link "
                        to="/admin-sales-list"
                        
                        
                        
                        
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
                        to="/verifications"
                        
                        
                        
                        
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
                        <span className="nav-link-title"> Visit Verifications </span>
                      </Link>
             
                    </li>
                    <li className="nav-item ">
                      <Link
                        className="nav-link "
                        to="/admin-visit-list"
                        
                        
                        
                        
                      >
                        <span className="nav-link-icon d-md-none d-lg-inline-block"
                          >{/* Download SVG icon from http://tabler.io/icons/icon/gift */}
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
                            <path d="M3 8m0 1a1 1 0 0 1 1 -1h16a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-16a1 1 0 0 1 -1 -1z" />
                            <path d="M12 8l0 13" />
                            <path d="M19 12v7a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-7" />
                            <path d="M7.5 8a2.5 2.5 0 0 1 0 -5a4.8 8 0 0 1 4.5 5a4.8 8 0 0 1 4.5 -5a2.5 2.5 0 0 1 0 5" /></svg>
                        </span>
                        <span className="nav-link-title"> Visits Submitted </span>
                      </Link>
          
                    </li>
                    <li className="nav-item ">
                      <Link
                        className="nav-link "
                        to=""
                        
                        
                        
                        
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
                        <span className="nav-link-title"> Customer Directory </span>
                      </Link>
            
                    </li>
                  </ul>
                  {/* END NAVBAR MENU */}
                </div>
   
              </div>
            </div>
          </div>
        </div>
      </header>)
      }

      export default SubHeader;