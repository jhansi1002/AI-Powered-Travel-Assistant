import React, { useState, useEffect } from "react";
import "../styles/MyLists.css";

function MyLists() {
  const [lists, setLists] = useState([]);

  // Mock data fetch (replace with real API if needed)
  useEffect(() => {
    const mockLists = [
      { id: 1, name: "Paris Trip", date: "2025-10-15" },
      { id: 2, name: "Tokyo Adventure", date: "2025-11-05" },
      { id: 3, name: "New York City Tour", date: "2025-12-20" },
    ];
    setLists(mockLists);
  }, []);

  return (
    <div className="my-lists-container">
      <h2>My Travel Lists</h2>
      {lists.length === 0 ? (
        <p>You have no saved trips yet.</p>
      ) : (
        <ul className="lists">
          {lists.map((item) => (
            <li key={item.id} className="list-item">
              <span className="list-name">{item.name}</span>
              <span className="list-date">{item.date}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MyLists;
