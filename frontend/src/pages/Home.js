import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css"; // import CSS

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const expiry = localStorage.getItem("expiry");

    if (!token || Date.now() > expiry) {
      localStorage.removeItem("token");
      localStorage.removeItem("expiry");
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expiry");
    navigate("/login");
  };

  return (
    <div className="home-container">
      <h2>🌍 AI-Powered Travel Assistant</h2>
      <p>Welcome! You are logged in successfully 🎉</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Home;