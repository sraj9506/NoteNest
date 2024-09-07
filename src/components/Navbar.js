import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const navigate=useNavigate();
  const logoff=()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    navigate("/Login");
  }
  return (
    <>
      <nav
        className="navbar navbar-expand-lg bg-dark fixed-top"
        data-bs-theme="dark"
      >
        <div className="container-fluid justify-content-between">
          <Link className="navbar-brand" to="/">
            iNotebook
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse flex-grow-0"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link px-3 ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link px-3 ${
                    location.pathname === "/About" ? "active" : ""
                  }`}
                  to="/About"
                >
                  About
                </Link>
              </li>
              {localStorage.getItem("token") ?  (
                <li className="nav-item dropdown">
                  <span
                    className="nav-link dropdown-toggle px-3"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {localStorage.getItem("name")}
                  </span>
                  <ul className="dropdown-menu">
                    <li>
                      <span className="dropdown-item" onClick={logoff} role="button">Logout</span>
                    </li>
                  </ul>
                </li>
              ):(
                <li className="nav-item">
                  <Link
                    className={`nav-link px-3 ${
                      location.pathname === "/Login" ? "active" : ""
                    }`}
                    to="/Login"
                  >
                    Login
                  </Link>
                </li>
              ) }
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
