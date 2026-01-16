function Header() {
    return (
        <header className="navbar navbar-expand-md d-print-none">
            <div className="container-xl">
                {/* BEGIN NAVBAR TOGGLER */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbar-menu"
                    aria-controls="navbar-menu"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                {/* END NAVBAR TOGGLER */}
                {/* BEGIN NAVBAR LOGO */}
                <div className="navbar-brand navbar-brand-autodark d-none-navbar-horizontal pe-0 pe-md-3">
                    <a href="preview_tabler_default.html" aria-label="Tabler"
                    ><svg xmlns="http://www.w3.org/2000/svg" width="110" height="32" viewBox="0 0 232 68" className="navbar-brand-image">
                            <path
                                d="M64.6 16.2C63 9.9 58.1 5 51.8 3.4 40 1.5 28 1.5 16.2 3.4 9.9 5 5 9.9 3.4 16.2 1.5 28 1.5 40 3.4 51.8 5 58.1 9.9 63 16.2 64.6c11.8 1.9 23.8 1.9 35.6 0C58.1 63 63 58.1 64.6 51.8c1.9-11.8 1.9-23.8 0-35.6zM33.3 36.3c-2.8 4.4-6.6 8.2-11.1 11-1.5.9-3.3.9-4.8.1s-2.4-2.3-2.5-4c0-1.7.9-3.3 2.4-4.1 2.3-1.4 4.4-3.2 6.1-5.3-1.8-2.1-3.8-3.8-6.1-5.3-2.3-1.3-3-4.2-1.7-6.4s4.3-2.9 6.5-1.6c4.5 2.8 8.2 6.5 11.1 10.9 1 1.4 1 3.3.1 4.7zM49.2 46H37.8c-2.1 0-3.8-1-3.8-3s1.7-3 3.8-3h11.4c2.1 0 3.8 1 3.8 3s-1.7 3-3.8 3z"
                                fill="#066fd1"
                                style={{fill: 'var(--tblr-primary, #066fd1)'}}
                            />
                            <path
                                d="M105.8 46.1c.4 0 .9.2 1.2.6s.6 1 .6 1.7c0 .9-.5 1.6-1.4 2.2s-2 .9-3.2.9c-2 0-3.7-.4-5-1.3s-2-2.6-2-5.4V31.6h-2.2c-.8 0-1.4-.3-1.9-.8s-.9-1.1-.9-1.9c0-.7.3-1.4.8-1.8s1.2-.7 1.9-.7h2.2v-3.1c0-.8.3-1.5.8-2.1s1.3-.8 2.1-.8 1.5.3 2 .8.8 1.3.8 2.1v3.1h3.4c.8 0 1.4.3 1.9.8s.8 1.2.8 1.9-.3 1.4-.8 1.8-1.2.7-1.9.7h-3.4v13c0 .7.2 1.2.5 1.5s.8.5 1.4.5c.3 0 .6-.1 1.1-.2.5-.2.8-.3 1.2-.3zm28-20.7c.8 0 1.5.3 2.1.8.5.5.8 1.2.8 2.1v20.3c0 .8-.3 1.5-.8 2.1-.5.6-1.2.8-2.1.8s-1.5-.3-2-.8-.8-1.2-.8-2.1c-.8.9-1.9 1.7-3.2 2.4-1.3.7-2.8 1-4.3 1-2.2 0-4.2-.6-6-1.7-1.8-1.1-3.2-2.7-4.2-4.7s-1.6-4.3-1.6-6.9c0-2.6.5-4.9 1.5-6.9s2.4-3.6 4.2-4.8c1.8-1.1 3.7-1.7 5.9-1.7 1.5 0 3 .3 4.3.8 1.3.6 2.5 1.3 3.4 2.1 0-.8.3-1.5.8-2.1.5-.5 1.2-.7 2-.7zm-9.7 21.3c2.1 0 3.8-.8 5.1-2.3s2-3.4 2-5.7-.7-4.2-2-5.8c-1.3-1.5-3-2.3-5.1-2.3-2 0-3.7.8-5 2.3-1.3 1.5-2 3.5-2 5.8s.6 4.2 1.9 5.7 3 2.3 5.1 2.3zm32.1-21.3c2.2 0 4.2.6 6 1.7 1.8 1.1 3.2 2.7 4.2 4.7s1.6 4.3 1.6 6.9-.5 4.9-1.5 6.9-2.4 3.6-4.2 4.8c-1.8 1.1-3.7 1.7-5.9 1.7-1.5 0-3-.3-4.3-.9s-2.5-1.4-3.4-2.3v.3c0 .8-.3 1.5-.8 2.1-.5.6-1.2.8-2.1.8s-1.5-.3-2.1-.8c-.5-.5-.8-1.2-.8-2.1V18.9c0-.8.3-1.5.8-2.1.5-.6 1.2-.8 2.1-.8s1.5.3 2.1.8c.5.6.8 1.3.8 2.1v10c.8-1 1.8-1.8 3.2-2.5 1.3-.7 2.8-1 4.3-1zm-.7 21.3c2 0 3.7-.8 5-2.3s2-3.5 2-5.8-.6-4.2-1.9-5.7-3-2.3-5.1-2.3-3.8.8-5.1 2.3-2 3.4-2 5.7.7 4.2 2 5.8c1.3 1.6 3 2.3 5.1 2.3zm23.6 1.9c0 .8-.3 1.5-.8 2.1s-1.3.8-2.1.8-1.5-.3-2-.8-.8-1.3-.8-2.1V18.9c0-.8.3-1.5.8-2.1s1.3-.8 2.1-.8 1.5.3 2 .8.8 1.3.8 2.1v29.7zm29.3-10.5c0 .8-.3 1.4-.9 1.9-.6.5-1.2.7-2 .7h-15.8c.4 1.9 1.3 3.4 2.6 4.4 1.4 1.1 2.9 1.6 4.7 1.6 1.3 0 2.3-.1 3.1-.4.7-.2 1.3-.5 1.8-.8.4-.3.7-.5.9-.6.6-.3 1.1-.4 1.6-.4.7 0 1.2.2 1.7.7s.7 1 .7 1.7c0 .9-.4 1.6-1.3 2.4-.9.7-2.1 1.4-3.6 1.9s-3 .8-4.6.8c-2.7 0-5-.6-7-1.7s-3.5-2.7-4.6-4.6-1.6-4.2-1.6-6.6c0-2.8.6-5.2 1.7-7.2s2.7-3.7 4.6-4.8 3.9-1.7 6-1.7 4.1.6 6 1.7 3.4 2.7 4.5 4.7c.9 1.9 1.5 4.1 1.5 6.3zm-12.2-7.5c-3.7 0-5.9 1.7-6.6 5.2h12.6v-.3c-.1-1.3-.8-2.5-2-3.5s-2.5-1.4-4-1.4zm30.3-5.2c1 0 1.8.3 2.4.8.7.5 1 1.2 1 1.9 0 1-.3 1.7-.8 2.2-.5.5-1.1.8-1.8.7-.5 0-1-.1-1.6-.3-.2-.1-.4-.1-.6-.2-.4-.1-.7-.1-1.1-.1-.8 0-1.6.3-2.4.8s-1.4 1.3-1.9 2.3-.7 2.3-.7 3.7v11.4c0 .8-.3 1.5-.8 2.1-.5.6-1.2.8-2.1.8s-1.5-.3-2.1-.8c-.5-.6-.8-1.3-.8-2.1V28.8c0-.8.3-1.5.8-2.1.5-.6 1.2-.8 2.1-.8s1.5.3 2.1.8c.5.6.8 1.3.8 2.1v.6c.7-1.3 1.8-2.3 3.2-3 1.3-.7 2.8-1 4.3-1z"
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                fill="#4a4a4a"
                            /></svg>
                    </a>
                </div>
                {/* END NAVBAR LOGO */}
                <div className="navbar-nav flex-row order-md-last">
                    <div className="nav-item d-none d-md-flex me-3">
                        <div className="btn-list">
                            <a href="https://github.com/tabler/tabler" className="btn btn-5" target="_blank" rel="noreferrer">
                                {/* Download SVG icon from http://tabler.io/icons/icon/brand-github */}
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
                                    className="icon icon-2"
                                >
                                    <path
                                        d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5"
                                    />
                                </svg>
                                Source code
                            </a>
                            <a href="https://github.com/sponsors/codecalm" className="btn btn-6" target="_blank" rel="noreferrer">
                                {/* Download SVG icon from http://tabler.io/icons/icon/heart */}
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
                                    className="icon text-pink icon-2"
                                >
                                    <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
                                </svg>
                                Sponsor
                            </a>
                        </div>
                    </div>
                    <div className="d-none d-md-flex">
                        <div className="nav-item">
                            <a href="https://preview.tabler.io/empty.html?theme=dark" className="nav-link px-0 hide-theme-dark" title="Enable dark mode" data-bs-toggle="tooltip" data-bs-placement="bottom">
                                {/* Download SVG icon from http://tabler.io/icons/icon/moon */}
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
                                    <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z" />
                                </svg>
                            </a>
                            <a href="https://preview.tabler.io/empty.html?theme=light" className="nav-link px-0 hide-theme-light" title="Enable light mode" data-bs-toggle="tooltip" data-bs-placement="bottom">
                                {/* Download SVG icon from http://tabler.io/icons/icon/sun */}
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
                                    <path d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7" />
                                </svg>
                            </a>
                        </div>
                        <div className="nav-item dropdown d-none d-md-flex">
                            <a
                                href="empty.html#"
                                className="nav-link px-0"
                                data-bs-toggle="dropdown"
                                tabindex="-1"
                                aria-label="Show notifications"
                                data-bs-auto-close="outside"
                                aria-expanded="false"
                            >
                                {/* Download SVG icon from http://tabler.io/icons/icon/bell */}
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
                                    <path d="M10 5a2 2 0 1 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
                                    <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
                                </svg>
                                <span className="badge bg-red"></span>
                            </a>
                            <div className="dropdown-menu dropdown-menu-arrow dropdown-menu-end dropdown-menu-card">
                                <div className="card">
                                    <div className="card-header d-flex">
                                        <h3 className="card-title">Notifications</h3>
                                        <div className="btn-close ms-auto" data-bs-dismiss="dropdown"></div>
                                    </div>
                                    <div className="list-group list-group-flush list-group-hoverable">
                                        <div className="list-group-item">
                                            <div className="row align-items-center">
                                                <div className="col-auto"><span className="status-dot status-dot-animated bg-red d-block"></span></div>
                                                <div className="col text-truncate">
                                                    <a href="empty.html#" className="text-body d-block">Example 1</a>
                                                    <div className="d-block text-secondary text-truncate mt-n1">Change deprecated html tags to text decoration classNamees (#29604)</div>
                                                </div>
                                                <div className="col-auto">
                                                    <a href="empty.html#" className="list-group-item-actions">
                                                        {/* Download SVG icon from http://tabler.io/icons/icon/star */}
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
                                                            className="icon text-muted icon-2"
                                                        >
                                                            <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
                                                        </svg>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="list-group-item">
                                            <div className="row align-items-center">
                                                <div className="col-auto"><span className="status-dot d-block"></span></div>
                                                <div className="col text-truncate">
                                                    <a href="empty.html#" className="text-body d-block">Example 2</a>
                                                    <div className="d-block text-secondary text-truncate mt-n1">justify-content:between ⇒ justify-content:space-between (#29734)</div>
                                                </div>
                                                <div className="col-auto">
                                                    <a href="empty.html#" className="list-group-item-actions show">
                                                        {/* Download SVG icon from http://tabler.io/icons/icon/star */}
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
                                                            className="icon text-yellow icon-2"
                                                        >
                                                            <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
                                                        </svg>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="list-group-item">
                                            <div className="row align-items-center">
                                                <div className="col-auto"><span className="status-dot d-block"></span></div>
                                                <div className="col text-truncate">
                                                    <a href="empty.html#" className="text-body d-block">Example 3</a>
                                                    <div className="d-block text-secondary text-truncate mt-n1">Update change-version.js (#29736)</div>
                                                </div>
                                                <div className="col-auto">
                                                    <a href="empty.html#" className="list-group-item-actions">
                                                        {/* Download SVG icon from http://tabler.io/icons/icon/star */}
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
                                                            className="icon text-muted icon-2"
                                                        >
                                                            <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
                                                        </svg>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="list-group-item">
                                            <div className="row align-items-center">
                                                <div className="col-auto"><span className="status-dot status-dot-animated bg-green d-block"></span></div>
                                                <div className="col text-truncate">
                                                    <a href="empty.html#" className="text-body d-block">Example 4</a>
                                                    <div className="d-block text-secondary text-truncate mt-n1">Regenerate package-lock.json (#29730)</div>
                                                </div>
                                                <div className="col-auto">
                                                    <a href="empty.html#" className="list-group-item-actions">
                                                        {/* Download SVG icon from http://tabler.io/icons/icon/star */}
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
                                                            className="icon text-muted icon-2"
                                                        >
                                                            <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
                                                        </svg>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col">
                                                <a href="empty.html#" className="btn btn-2 w-100"> Archive all </a>
                                            </div>
                                            <div className="col">
                                                <a href="empty.html#" className="btn btn-2 w-100"> Mark all as read </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="nav-item dropdown d-none d-md-flex me-3">
                            <a
                                href="empty.html#"
                                className="nav-link px-0"
                                data-bs-toggle="dropdown"
                                tabindex="-1"
                                aria-label="Show app menu"
                                data-bs-auto-close="outside"
                                aria-expanded="false"
                            >
                                {/* Download SVG icon from http://tabler.io/icons/icon/apps */}
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
                                    <path d="M4 4m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" />
                                    <path d="M4 14m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" />
                                    <path d="M14 14m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" />
                                    <path d="M14 7l6 0" />
                                    <path d="M17 4l0 6" />
                                </svg>
                            </a>
                            <div className="dropdown-menu dropdown-menu-arrow dropdown-menu-end dropdown-menu-card">
                                <div className="card">
                                    <div className="card-header">
                                        <div className="card-title">My Apps</div>
                                        <div className="card-actions btn-actions">
                                            <a href="empty.html#" className="btn-action">
                                                {/* Download SVG icon from http://tabler.io/icons/icon/settings */}
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
                                            </a>
                                        </div>
                                    </div>
                                    <div className="card-body scroll-y p-2" style={{maxHeight: '50vh'}}>
                                        <div className="row g-0">
                                            <div className="col-4">
                                                <a href="empty.html#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                                                    <img src="static/brands/amazon.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                                                    <span className="h5">Amazon</span>
                                                </a>
                                            </div>
                                            <div className="col-4">
                                                <a href="empty.html#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                                                    <img src="static/brands/android.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                                                    <span className="h5">Android</span>
                                                </a>
                                            </div>
                                            <div className="col-4">
                                                <a href="empty.html#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                                                    <img src="static/brands/app-store.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                                                    <span className="h5">Apple App Store</span>
                                                </a>
                                            </div>
                                            <div className="col-4">
                                                <a href="empty.html#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                                                    <img src="static/brands/apple-podcast.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                                                    <span className="h5">Apple Podcast</span>
                                                </a>
                                            </div>
                                            <div className="col-4">
                                                <a href="empty.html#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                                                    <img src="static/brands/apple.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                                                    <span className="h5">Apple</span>
                                                </a>
                                            </div>
                                            <div className="col-4">
                                                <a href="empty.html#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                                                    <img src="static/brands/behance.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                                                    <span className="h5">Behance</span>
                                                </a>
                                            </div>
                                            <div className="col-4">
                                                <a href="empty.html#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                                                    <img src="static/brands/discord.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                                                    <span className="h5">Discord</span>
                                                </a>
                                            </div>
                                            <div className="col-4">
                                                <a href="empty.html#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                                                    <img src="static/brands/dribbble.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                                                    <span className="h5">Dribbble</span>
                                                </a>
                                            </div>
                                            <div className="col-4">
                                                <a href="empty.html#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                                                    <img src="static/brands/dropbox.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                                                    <span className="h5">Dropbox</span>
                                                </a>
                                            </div>
                                            <div className="col-4">
                                                <a href="empty.html#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                                                    <img src="static/brands/ever-green.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                                                    <span className="h5">Ever Green</span>
                                                </a>
                                            </div>
                                            <div className="col-4">
                                                <a href="empty.html#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                                                    <img src="static/brands/facebook.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                                                    <span className="h5">Facebook</span>
                                                </a>
                                            </div>
                                            <div className="col-4">
                                                <a href="empty.html#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                                                    <img src="static/brands/figma.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                                                    <span className="h5">Figma</span>
                                                </a>
                                            </div>
                                            <div className="col-4">
                                                <a href="empty.html#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                                                    <img src="static/brands/github.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                                                    <span className="h5">GitHub</span>
                                                </a>
                                            </div>
                                            <div className="col-4">
                                                <a href="empty.html#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                                                    <img src="static/brands/gitlab.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                                                    <span className="h5">GitLab</span>
                                                </a>
                                            </div>
                                            <div className="col-4">
                                                <a href="empty.html#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                                                    <img src="static/brands/google-ads.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                                                    <span className="h5">Google Ads</span>
                                                </a>
                                            </div>
                                            <div className="col-4">
                                                <a href="empty.html#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                                                    <img src="static/brands/google-adsense.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                                                    <span className="h5">Google AdSense</span>
                                                </a>
                                            </div>
                                            <div className="col-4">
                                                <a href="empty.html#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                                                    <img src="static/brands/google-analytics.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                                                    <span className="h5">Google Analytics</span>
                                                </a>
                                            </div>
                                            <div className="col-4">
                                                <a href="empty.html#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                                                    <img src="static/brands/google-cloud.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                                                    <span className="h5">Google Cloud</span>
                                                </a>
                                            </div>
                                            <div className="col-4">
                                                <a href="empty.html#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                                                    <img src="static/brands/google-drive.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                                                    <span className="h5">Google Drive</span>
                                                </a>
                                            </div>
                                            <div className="col-4">
                                                <a href="empty.html#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                                                    <img src="static/brands/google-fit.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                                                    <span className="h5">Google Fit</span>
                                                </a>
                                            </div>
                                            <div className="col-4">
                                                <a href="empty.html#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                                                    <img src="static/brands/google-home.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                                                    <span className="h5">Google Home</span>
                                                </a>
                                            </div>
                                            <div className="col-4">
                                                <a href="empty.html#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                                                    <img src="static/brands/google-maps.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                                                    <span className="h5">Google Maps</span>
                                                </a>
                                            </div>
                                            <div className="col-4">
                                                <a href="empty.html#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                                                    <img src="static/brands/google-meet.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                                                    <span className="h5">Google Meet</span>
                                                </a>
                                            </div>
                                            <div className="col-4">
                                                <a href="empty.html#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                                                    <img src="static/brands/google-photos.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                                                    <span className="h5">Google Photos</span>
                                                </a>
                                            </div>
                                            <div className="col-4">
                                                <a href="empty.html#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                                                    <img src="static/brands/google-play.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                                                    <span className="h5">Google Play</span>
                                                </a>
                                            </div>
                                            <div className="col-4">
                                                <a href="empty.html#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                                                    <img src="static/brands/google-shopping.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                                                    <span className="h5">Google Shopping</span>
                                                </a>
                                            </div>
                                            <div className="col-4">
                                                <a href="empty.html#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                                                    <img src="static/brands/google-teams.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                                                    <span className="h5">Google Teams</span>
                                                </a>
                                            </div>
                                            <div className="col-4">
                                                <a href="empty.html#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                                                    <img src="static/brands/google.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                                                    <span className="h5">Google</span>
                                                </a>
                                            </div>
                                            <div className="col-4">
                                                <a href="empty.html#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                                                    <img src="static/brands/instagram.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                                                    <span className="h5">Instagram</span>
                                                </a>
                                            </div>
                                            <div className="col-4">
                                                <a href="empty.html#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                                                    <img src="static/brands/klarna.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                                                    <span className="h5">Klarna</span>
                                                </a>
                                            </div>
                                            <div className="col-4">
                                                <a href="empty.html#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                                                    <img src="static/brands/linkedin.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                                                    <span className="h5">LinkedIn</span>
                                                </a>
                                            </div>
                                            <div className="col-4">
                                                <a href="empty.html#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                                                    <img src="static/brands/mailchimp.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                                                    <span className="h5">Mailchimp</span>
                                                </a>
                                            </div>
                                            <div className="col-4">
                                                <a href="empty.html#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                                                    <img src="static/brands/medium.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                                                    <span className="h5">Medium</span>
                                                </a>
                                            </div>
                                            <div className="col-4">
                                                <a href="empty.html#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                                                    <img src="static/brands/messenger.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                                                    <span className="h5">Messenger</span>
                                                </a>
                                            </div>
                                            <div className="col-4">
                                                <a href="empty.html#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                                                    <img src="static/brands/meta.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                                                    <span className="h5">Meta</span>
                                                </a>
                                            </div>
                                            <div className="col-4">
                                                <a href="empty.html#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                                                    <img src="static/brands/monday.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                                                    <span className="h5">Monday</span>
                                                </a>
                                            </div>
                                            <div className="col-4">
                                                <a href="empty.html#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                                                    <img src="static/brands/netflix.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                                                    <span className="h5">Netflix</span>
                                                </a>
                                            </div>
                                            <div className="col-4">
                                                <a href="empty.html#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                                                    <img src="static/brands/notion.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                                                    <span className="h5">Notion</span>
                                                </a>
                                            </div>
                                            <div className="col-4">
                                                <a href="empty.html#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                                                    <img src="static/brands/office-365.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                                                    <span className="h5">Office 365</span>
                                                </a>
                                            </div>
                                            <div className="col-4">
                                                <a href="empty.html#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                                                    <img src="static/brands/opera.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                                                    <span className="h5">Opera</span>
                                                </a>
                                            </div>
                                            <div className="col-4">
                                                <a href="empty.html#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                                                    <img src="static/brands/paypal.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                                                    <span className="h5">PayPal</span>
                                                </a>
                                            </div>
                                            <div className="col-4">
                                                <a href="empty.html#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                                                    <img src="static/brands/petreon.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                                                    <span className="h5">Patreon</span>
                                                </a>
                                            </div>
                                            <div className="col-4">
                                                <a href="empty.html#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                                                    <img src="static/brands/pinterest.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                                                    <span className="h5">Pinterest</span>
                                                </a>
                                            </div>
                                            <div className="col-4">
                                                <a href="empty.html#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                                                    <img src="static/brands/play-store.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                                                    <span className="h5">Play Store</span>
                                                </a>
                                            </div>
                                            <div className="col-4">
                                                <a href="empty.html#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                                                    <img src="static/brands/quora.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                                                    <span className="h5">Quora</span>
                                                </a>
                                            </div>
                                            <div className="col-4">
                                                <a href="empty.html#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                                                    <img src="static/brands/reddit.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                                                    <span className="h5">Reddit</span>
                                                </a>
                                            </div>
                                            <div className="col-4">
                                                <a href="empty.html#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                                                    <img src="static/brands/shopify.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                                                    <span className="h5">Shopify</span>
                                                </a>
                                            </div>
                                            <div className="col-4">
                                                <a href="empty.html#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                                                    <img src="static/brands/skype.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                                                    <span className="h5">Skype</span>
                                                </a>
                                            </div>
                                            <div className="col-4">
                                                <a href="empty.html#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                                                    <img src="static/brands/slack.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                                                    <span className="h5">Slack</span>
                                                </a>
                                            </div>
                                            <div className="col-4">
                                                <a href="empty.html#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                                                    <img src="static/brands/snapchat.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                                                    <span className="h5">Snapchat</span>
                                                </a>
                                            </div>
                                            <div className="col-4">
                                                <a href="empty.html#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                                                    <img src="static/brands/soundcloud.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                                                    <span className="h5">SoundCloud</span>
                                                </a>
                                            </div>
                                            <div className="col-4">
                                                <a href="empty.html#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                                                    <img src="static/brands/spotify.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                                                    <span className="h5">Spotify</span>
                                                </a>
                                            </div>
                                            <div className="col-4">
                                                <a href="empty.html#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                                                    <img src="static/brands/stripe.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                                                    <span className="h5">Stripe</span>
                                                </a>
                                            </div>
                                            <div className="col-4">
                                                <a href="empty.html#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                                                    <img src="static/brands/telegram.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                                                    <span className="h5">Telegram</span>
                                                </a>
                                            </div>
                                            <div className="col-4">
                                                <a href="empty.html#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                                                    <img src="static/brands/tiktok.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                                                    <span className="h5">TikTok</span>
                                                </a>
                                            </div>
                                            <div className="col-4">
                                                <a href="empty.html#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                                                    <img src="static/brands/tinder.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                                                    <span className="h5">Tinder</span>
                                                </a>
                                            </div>
                                            <div className="col-4">
                                                <a href="empty.html#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                                                    <img src="static/brands/trello.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                                                    <span className="h5">Trello</span>
                                                </a>
                                            </div>
                                            <div className="col-4">
                                                <a href="empty.html#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                                                    <img src="static/brands/truth.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                                                    <span className="h5">Truth</span>
                                                </a>
                                            </div>
                                            <div className="col-4">
                                                <a href="empty.html#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                                                    <img src="static/brands/tumblr.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                                                    <span className="h5">Tumblr</span>
                                                </a>
                                            </div>
                                            <div className="col-4">
                                                <a href="empty.html#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                                                    <img src="static/brands/twitch.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                                                    <span className="h5">Twitch</span>
                                                </a>
                                            </div>
                                            <div className="col-4">
                                                <a href="empty.html#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                                                    <img src="static/brands/twitter.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                                                    <span className="h5">Twitter</span>
                                                </a>
                                            </div>
                                            <div className="col-4">
                                                <a href="empty.html#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                                                    <img src="static/brands/vimeo.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                                                    <span className="h5">Vimeo</span>
                                                </a>
                                            </div>
                                            <div className="col-4">
                                                <a href="empty.html#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                                                    <img src="static/brands/vk.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                                                    <span className="h5">VK</span>
                                                </a>
                                            </div>
                                            <div className="col-4">
                                                <a href="empty.html#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                                                    <img src="static/brands/watppad.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                                                    <span className="h5">Wattpad</span>
                                                </a>
                                            </div>
                                            <div className="col-4">
                                                <a href="empty.html#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                                                    <img src="static/brands/webflow.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                                                    <span className="h5">Webflow</span>
                                                </a>
                                            </div>
                                            <div className="col-4">
                                                <a href="empty.html#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                                                    <img src="static/brands/whatsapp.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                                                    <span className="h5">WhatsApp</span>
                                                </a>
                                            </div>
                                            <div className="col-4">
                                                <a href="empty.html#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                                                    <img src="static/brands/wordpress.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                                                    <span className="h5">WordPress</span>
                                                </a>
                                            </div>
                                            <div className="col-4">
                                                <a href="empty.html#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                                                    <img src="static/brands/xing.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                                                    <span className="h5">Xing</span>
                                                </a>
                                            </div>
                                            <div className="col-4">
                                                <a href="empty.html#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                                                    <img src="static/brands/yelp.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                                                    <span className="h5">Yelp</span>
                                                </a>
                                            </div>
                                            <div className="col-4">
                                                <a href="empty.html#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                                                    <img src="static/brands/youtube.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                                                    <span className="h5">YouTube</span>
                                                </a>
                                            </div>
                                            <div className="col-4">
                                                <a href="empty.html#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                                                    <img src="static/brands/zapier.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                                                    <span className="h5">Zapier</span>
                                                </a>
                                            </div>
                                            <div className="col-4">
                                                <a href="empty.html#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                                                    <img src="static/brands/zendesk.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                                                    <span className="h5">Zendesk</span>
                                                </a>
                                            </div>
                                            <div className="col-4">
                                                <a href="empty.html#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                                                    <img src="static/brands/zoom.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                                                    <span className="h5">Zoom</span>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="nav-item dropdown">
                        <a href="empty.html#" className="nav-link d-flex lh-1 p-0 px-2" data-bs-toggle="dropdown" aria-label="Open user menu">
                            <span className="avatar avatar-sm" style={{backgroundImage: 'url(./static/avatars/000m.jpg)'}}> </span>
                            <div className="d-none d-xl-block ps-2">
                                <div>Paweł Kuna</div>
                                <div className="mt-1 small text-secondary">UI Designer</div>
                            </div>
                        </a>
                        <div className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                            <a href="empty.html#" className="dropdown-item">Status</a>
                            <a href="profile.html" className="dropdown-item">Profile</a>
                            <a href="empty.html#" className="dropdown-item">Feedback</a>
                            <div className="dropdown-divider"></div>
                            <a href="settings.html" className="dropdown-item">Settings</a>
                            <a href="sign-in.html" className="dropdown-item">Logout</a>
                        </div>
                    </div>
                </div>
            </div>
        </header>)
}

export default Header;