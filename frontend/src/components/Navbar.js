import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  // Dummy user info (replace with real data from backend)
  const [showProfile, setShowProfile] = useState(false);
  const user = {
    name: localStorage.getItem("userName") || "John Doe",
    email: localStorage.getItem("userEmail") || "john@example.com",
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expiry");
    navigate("/login");
  };

  const handleProfileClick = () => {
    setShowProfile((prev) => !prev);
  };

  const handleChangeUsername = () => {
    const newName = prompt("Enter new username:", user.name);
    if (newName) {
      localStorage.setItem("userName", newName);
      window.location.reload();
    }
  };

  const handleChangePassword = () => {
    alert("Password change feature coming soon!");
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
            {/* Profile icon (clickable) */}
            <span
              title="Profile"
              style={{ marginLeft: "10px", cursor: "pointer", fontSize: "22px", position: "relative" }}
              onClick={handleProfileClick}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="8" r="4" fill="#1abc9c" />
                <rect x="4" y="16" width="16" height="6" rx="3" fill="#1abc9c" />
              </svg>
              {showProfile && (
                <div
                  style={{
                    position: "absolute",
                    top: "36px",
                    right: 0,
                    background: "white",
                    color: "#333",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                    minWidth: "220px",
                    zIndex: 1001,
                    padding: "16px",
                  }}
                >
                  <div style={{ marginBottom: "10px", fontWeight: "bold" }}>Profile</div>
                  <div style={{ marginBottom: "6px" }}>Name: {user.name}</div>
                  <div style={{ marginBottom: "12px" }}>Email: {user.email}</div>
                  <button style={{ width: "100%", marginBottom: "8px" }} onClick={handleChangeUsername}>
                    Change Username
                  </button>
                  <button style={{ width: "100%" }} onClick={handleChangePassword}>
                    Change Password
                  </button>
                </div>
              )}
            </span>
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
