
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/MyLists.css";

function MyLists() {
  const [lists, setLists] = useState([]);
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [editId, setEditId] = useState(null);
  const [type, setType] = useState("bucketlist");

  // Fetch lists for logged-in user
  const fetchLists = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/lists", {
        headers: { Authorization: `Bearer ${token}` }
      });
  setLists(res.data);
  console.log("Fetched lists:", res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchLists();
  }, []);

  // Add or update list item
  const handleSubmit = async () => {
    if (!title) return alert("Enter place name!");
    const token = localStorage.getItem("token");
    try {
      if (editId) {
        await axios.put(`http://localhost:5000/api/lists/${editId}`,
          { title, notes, description: notes, type },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setEditId(null);
      } else {
        await axios.post("http://localhost:5000/api/lists",
          { title, notes, description: notes, type },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
      setTitle("");
      setNotes("");
      setType("bucketlist");
      fetchLists();
    } catch (err) {
      alert("Failed to save. Try again.");
      console.error(err);
    }
  };

  // Delete list item
  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:5000/api/lists/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchLists();
    } catch (err) {
      alert("Failed to delete. Try again.");
      console.error(err);
    }
  };

  // Toggle between bucketlist and visited
  const handleToggle = async (item) => {
    const token = localStorage.getItem("token");
    try {
      await axios.put(`http://localhost:5000/api/lists/${item._id}`,
        { type: item.type === "bucketlist" ? "visited" : "bucketlist" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchLists();
    } catch (err) {
      alert("Failed to update. Try again.");
      console.error(err);
    }
  };

  // Edit list item
  const handleEdit = (item) => {
    setTitle(item.title);
    setNotes(item.notes);
    setType(item.type);
    setEditId(item._id);
  };

  // Separate lists
  const wantToVisit = lists.filter((item) => item.type === "bucketlist");
  const visited = lists.filter((item) => item.type === "visited");

  return (
    <div className="my-lists-container">
      <h2>My Travel Lists</h2>
      <div className="add-form">
        <input
          type="text"
          placeholder="Place Name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Notes / Description"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
        <select value={type} onChange={e => setType(e.target.value)}>
          <option value="bucketlist">Want to Visit</option>
          <option value="visited">Visited</option>
        </select>
        <button onClick={handleSubmit}>{editId ? "Update" : "Add"}</button>
      </div>
      <div className="lists-grid">
        <div className="list-section">
          <h3>Want to Visit</h3>
          {wantToVisit.length === 0 ? (
            <p>No places in your bucket list.</p>
          ) : (
            <ul>
              {wantToVisit.map((item) => (
                <li key={item._id}>
                  <span>{item.title}</span>
                  <span>{item.description}</span>
                  <input
                    type="checkbox"
                    onChange={() => handleToggle(item)}
                  />
                  <button onClick={() => handleEdit(item)}>Edit</button>
                  <button onClick={() => handleDelete(item._id)}>Delete</button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="list-section">
          <h3>Visited</h3>
          {visited.length === 0 ? (
            <p>No places visited yet.</p>
          ) : (
            <ul>
              {visited.map((item) => (
                <li key={item._id}>
                  <span>{item.title}</span>
                  <span>{item.description}</span>
                  <input
                    type="checkbox"
                    checked
                    onChange={() => handleToggle(item)}
                  />
                  <button onClick={() => handleEdit(item)}>Edit</button>
                  <button onClick={() => handleDelete(item._id)}>Delete</button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyLists;
