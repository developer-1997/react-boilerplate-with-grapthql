import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import "./header.css";
import profileImg from "./assets/profile.png";
import notificationIcon from "./assets/notification.png";
import Dropdown from "react-bootstrap/Dropdown";
const Header = () => {
  const navigate = useNavigate();
  const isLoggedInValue = localStorage.getItem("isLoggedIn");
  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      <div className="d-flex align-items-center header-bg">
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light p-0">
            <div className="container-fluid px-0">
              <Link className="navbar-brand fs-3 fw-bold pe-4" to="/">
                React Template
              </Link>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              {isLoggedInValue && (
                <>
                  <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                      <li className="nav-item">
                        <Link
                          className="nav-link active"
                          aria-current="page"
                          to="/dashboard"
                        >
                          Home
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div
                    className="collapse navbar-collapse justify-content-end"
                    id="navbarNavDarkDropdown"
                  >
                    <ul className="navbar-nav">
                      <li className="nav-item">
                        <Link
                          className="nav-link active"
                          aria-current="page"
                          to="/"
                        >
                          <img
                            height={30}
                            width={30}
                            src={notificationIcon}
                            alt="Notification"
                          />
                        </Link>
                      </li>
                      <Dropdown>
                        <Dropdown.Toggle
                          variant="light"
                          className="profile-icon"
                          id="dropdown-basic"
                        >
                          <img
                            width={30}
                            height={30}
                            style={{ borderRadius: "50%" }}
                            src={profileImg}
                            alt="Profile"
                          />
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          <Dropdown.Item href="/change-password">
                            Change Password
                          </Dropdown.Item>
                          <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </ul>
                  </div>
                </>
              )}
            </div>
          </nav>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Header;
