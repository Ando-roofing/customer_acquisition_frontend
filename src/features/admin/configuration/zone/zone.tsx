function Zone() {
    return (
    < div >
            <div className="page-header d-print-none">
                <div className="container-xl">
                    <div className="row g-2 align-items-center">
                        <div className="col">
                            {/* Page pre-title */}
                            <div className="page-pretitle">Configuration</div>
                            <h1 className="page-title">Company Management</h1>
                        </div>
                        {/* Page title actions */}
                        <div className="col-auto ms-auto d-print-none">
                            <div className="btn-list">
                          

                                <button  className="btn btn-primary btn-5 d-none d-sm-inline-block">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        aria-hidden="true"
                                        focusable="false"
                                        className="icon icon-2"
                                    >
                                        <path d="M12 5l0 14" />
                                        <path d="M5 12l14 0" />
                                    </svg> New
                                </button>

                            </div>
                            {/* BEGIN MODAL */}
                            {/* END MODAL */}
                        </div>
                    </div>
                </div>
            </div>
            <main id="content" className="page-body">
                <div className="container">
                    Zone
                </div>
            </main>
        </div >
        )
}

export { Zone };