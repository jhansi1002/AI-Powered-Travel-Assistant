import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expiry");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      {/* Left side - App Name */}
      <div className="navbar-left">
        
          TravelSphereAI
        
      </div>

      {/* Right side - Dynamic Links */}
      <div className="navbar-right">
        <NavLink
          to="/about"
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          About
        </NavLink>

        {token ? (
          <>
            <NavLink
              to="/home"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Home
            </NavLink>
            <NavLink
              to="/my-lists"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              My Lists
            </NavLink>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink
              to="/signup"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Signup
            </NavLink>
            <NavLink
              to="/login"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Login
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
