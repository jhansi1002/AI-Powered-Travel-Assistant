import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import About from "./pages/About";
import MyLists from "./pages/MyLists";
import Navbar from "./components/Navbar";
import "./App.css";
function App() {
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <>
      <Navbar />
      <div className="app-container">
        <div className="page-content">
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/home"
            element={isLoggedIn ? <Home /> : <Navigate to="/home" />}
          />
          <Route path="*" element={<Navigate to="/home" />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/my-lists"
            element={isLoggedIn ? <MyLists /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
      </div>
    </>
  );
}

export default App;
