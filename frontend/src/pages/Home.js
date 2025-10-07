
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

function Home() {
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName") || "Traveler";
  const [budget, setBudget] = useState("");
  const [days, setDays] = useState("");
  const [preference, setPreference] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const expiry = localStorage.getItem("expiry");
    if (!token || Date.now() > expiry) {
      localStorage.removeItem("token");
      localStorage.removeItem("expiry");
      navigate("/login");
    }
  }, [navigate]);

  // Dummy AI suggestions (replace with real API later)
  useEffect(() => {
    setSuggestions([
      {
        place: "Paris",
        highlights: "Eiffel Tower, Louvre, Seine River",
        season: "Spring",
        history: "City of Light, rich culture and art."
      },
      {
        place: "Tokyo",
        highlights: "Shibuya, Senso-ji, Cherry Blossoms",
        season: "Spring",
        history: "Blend of tradition and technology."
      }
    ]);
  }, []);

  const handlePlanTrip = (e) => {
    e.preventDefault();
    // TODO: Call backend AI planner
    alert("Trip planning coming soon!");
  };

  return (
    <div className="home-container">
      <h2>Welcome, {userName}! Ready for your next adventure?</h2>
      <div style={{ margin: "24px 0" }}>
        <button onClick={() => navigate("/plan")}>Plan My Trip</button>
        <button onClick={() => navigate("/my-lists")} style={{ marginLeft: 12 }}>My Lists</button>
        <button onClick={() => navigate("/calendar")} style={{ marginLeft: 12 }}>Calendar</button>
      </div>

      <div className="trip-planner" style={{ marginBottom: 32, background: "#fff", borderRadius: 8, padding: 20, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
        <h3>Plan Your Trip</h3>
        <form onSubmit={handlePlanTrip} style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <input
            type="number"
            placeholder="Budget (₹)"
            value={budget}
            onChange={e => setBudget(e.target.value)}
            style={{ flex: 1, minWidth: 120 }}
            required
          />
          <input
            type="number"
            placeholder="Days"
            value={days}
            onChange={e => setDays(e.target.value)}
            style={{ flex: 1, minWidth: 80 }}
            required
          />
          <select value={preference} onChange={e => setPreference(e.target.value)} style={{ flex: 1, minWidth: 140 }} required>
            <option value="">Select Preference</option>
            <option value="adventure">Adventure</option>
            <option value="culture">Culture</option>
            <option value="luxury">Luxury</option>
            <option value="nature">Nature</option>
          </select>
          <button type="submit">Get AI Suggestions</button>
        </form>
      </div>

      <div className="suggestions" style={{ marginBottom: 32 }}>
        <h3>Top picks for you this season…</h3>
        <div style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
          {suggestions.map((s, idx) => (
            <div key={idx} style={{ background: "#f7f7ff", borderRadius: 8, padding: 16, minWidth: 220, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
              <h4 style={{ marginBottom: 8 }}>{s.place}</h4>
              <div><strong>Highlights:</strong> {s.highlights}</div>
              <div><strong>Best Season:</strong> {s.season}</div>
              <div><strong>History:</strong> {s.history}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="upcoming-trips" style={{ background: "#fff", borderRadius: 8, padding: 20, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
        <h3>Upcoming Trips</h3>
        <p>No upcoming trips yet. Start planning to see your itinerary here!</p>
      </div>
    </div>
  );
}

export default Home;