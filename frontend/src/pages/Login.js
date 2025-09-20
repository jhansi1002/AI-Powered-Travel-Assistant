import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css"; // import CSS

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/auth/login", {
        email,
        password,
      });

      // Save token + expiry in localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("expiry", Date.now() + 2 * 60 * 60 * 1000); // 2 hours

      navigate("/home");
    } catch (err) {
      alert("Login failed. Try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Welcome Back</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
        <p>
          New user?{" "}
          <span
            style={{ color: "#dd2476", cursor: "pointer" }}
            onClick={() => navigate("/signup")}
          >
            Signup here
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;