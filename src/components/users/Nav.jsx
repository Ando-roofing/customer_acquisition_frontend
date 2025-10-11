import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UserNav() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      axios
        .get('http://127.0.0.1:8000/accounts/user/', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setUser(res.data))
        .catch(() => setUser(null));
    }
  }, []);

  const firstInitial = user?.first_name ? user.first_name[0].toUpperCase() : 'G';
  const fullName =
    user?.first_name && user?.last_name ? `${user.first_name} ${user.last_name}` : 'Guest';
  const email = user?.email || 'Not signed in';

  return (
    <nav
      className="navbar navbar-header navbar-expand-lg border-bottom shadow-sm"
      style={{
        backgroundColor: 'rgb(11, 139, 139)',
        padding: '10px 30px',
      }}
    >
      <div className="container-fluid d-flex justify-content-between align-items-center">
        {/* Brand or Logo (optional) */}
        <div className="text-white fw-bold fs-5">Ando Sales</div>

        {/* Right Section */}
        <div className="d-flex align-items-center gap-4">

          {/* Notification Icon */}
          <div className="position-relative">
            <i
              className="fa fa-bell text-white fs-5"
              style={{ cursor: 'pointer' }}
              title="Notifications"
            ></i>
            <span
              className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
              style={{ fontSize: '10px' }}
            >
              4
            </span>
          </div>

          {/* User Info */}
          <div
            className="d-flex align-items-center bg-white px-3 py-1 rounded-pill shadow-sm"
            style={{ minWidth: '160px' }}
          >
            <div
              className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-2"
              style={{ width: '40px', height: '40px', fontSize: '18px' }}
            >
              {firstInitial}
            </div>
            <div className="d-flex flex-column justify-content-center">
              <span className="fw-semibold text-dark" style={{ fontSize: '14px' }}>
                {fullName}
              </span>
              <span className="text-muted" style={{ fontSize: '12px' }}>
                {email}
              </span>
            </div>
          </div>

        </div>
      </div>
    </nav>
  );
}

export default UserNav;
