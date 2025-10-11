// src/components/Sidebar.jsx
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function Sidebar() {
  const navigate = useNavigate();

  // Plain JS dropdown handler
  useEffect(() => {
    const toggles = Array.from(
      document.querySelectorAll('.sidebar .nav-item.dropdown > .nav-link')
    );

    function closeAll() {
      document.querySelectorAll('.sidebar .nav-item.dropdown.show').forEach((parent) => {
        parent.classList.remove('show');
        parent.querySelector('.dropdown-menu')?.classList.remove('show');
        parent.querySelector('.nav-link')?.setAttribute('aria-expanded', 'false');
      });
    }

    function handleToggle(e) {
      e.preventDefault();
      e.stopPropagation();
      const toggle = e.currentTarget;
      const parent = toggle.parentElement;
      const menu = parent.querySelector('.dropdown-menu');
      const isOpen = menu.classList.contains('show');
      closeAll();
      if (!isOpen) {
        parent.classList.add('show');
        menu.classList.add('show');
        toggle.setAttribute('aria-expanded', 'true');
      }
    }

    toggles.forEach((t) => t.addEventListener('click', handleToggle));
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.sidebar .nav-item.dropdown')) closeAll();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeAll();
    });

    return () => {
      toggles.forEach((t) => t.removeEventListener('click', handleToggle));
    };
  }, []);

  // ✅ Fully working logout
  const handleLogout = async () => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    try {
      await axios.post(
        'http://127.0.0.1:8000/accounts/logout/',
        { refresh: refreshToken }, // must send refresh token
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
    } catch (error) {
      console.warn('Logout failed:', error);
    } finally {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      navigate('/'); // redirect to login
    }
  };

  return (
    <div className="sidebar" data-background-color="dark">
      <div className="sidebar-logo">
        <div className="logo-header" data-background-color="dark">
          <div className="nav-toggle">
            <button className="btn btn-toggle toggle-sidebar">
              <i className="fas fa-angle-double-right"></i>
            </button>
            <button className="btn btn-toggle sidenav-toggler">
              <i className="fas fa-angle-double-left"></i>
            </button>
          </div>
          <button className="topbar-toggler more">
            <i className="fas fa-ellipsis-v"></i>
          </button>
        </div>
      </div>

      <div className="sidebar-wrapper scrollbar scrollbar-inner">
        <div className="sidebar-content">
          <ul className="nav nav-secondary">
            <li className="nav-section mt-3">
              <span className="sidebar-mini-icon">
                <i className="fas fa-ellipsis-h"></i>
              </span>
              <h4 className="text-section text-white">MENUS</h4>
            </li>

            {/* Regular Links */}
            <li className="nav-item">
              <Link to="/" className="nav-link text-white d-flex align-items-center">
                <i className="fas fa-home me-2"></i> Home
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/products" className="nav-link text-white d-flex align-items-center">
                <i className="fas fa-box-open me-2"></i> Products
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/branches" className="nav-link text-white d-flex align-items-center">
                <i className="fas fa-code-branch me-2"></i> Branches
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/sales" className="nav-link text-white d-flex align-items-center">
                <i className="fas fa-shopping-cart me-2"></i> Sales
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/visits" className="nav-link text-white d-flex align-items-center">
                <i className="fas fa-calendar-check me-2"></i> Visits Submitted
              </Link>
            </li>

            <li className="nav-item">
              <Link to="" className="nav-link text-white d-flex align-items-center">
                <i className="fas fa-address-book me-2"></i> Customer Directory
              </Link>
            </li>

                  <li className="nav-item">
        <Link to="/users" className="nav-link text-white d-flex align-items-center">
          <i className="fas fa-building me-2"></i> Company Directory
        </Link>
      </li>

            {/* Manage Account Dropdown */}
            <li className="nav-item dropdown">
              <a
                href="#"
                className="nav-link dropdown-toggle text-white d-flex align-items-center"
                id="manageAccountDropdown"
                role="button"
                aria-expanded="false"
              >
                <i className="fas fa-user-cog me-2"></i> Setting
              </a>
              <ul
                className="dropdown-menu shadow border-0"
                aria-labelledby="manageAccountDropdown"
                style={{
                  backgroundColor: 'white',
                  zIndex: 2000,
                  borderRadius: '8px',
                  minWidth: '180px',
                }}
              >
                <li>
                  <Link to="/profile" className="dropdown-item text-dark">
                    <i className="bi bi-person me-2"></i> Profile
                  </Link>
                </li>
                <li>
                  <Link to="/admin-change-password" className="dropdown-item text-dark">
                    <i className="bi bi-lock me-2"></i> Change Password
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="dropdown-item text-danger fw-semibold"
                  >
                    <i className="bi bi-box-arrow-right me-2"></i> Logout
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
