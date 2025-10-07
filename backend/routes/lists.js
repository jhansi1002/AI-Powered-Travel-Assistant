const express = require("express");
const router = express.Router();
const TravelList = require("../models/TravelList");
const auth = require("../middleware/auth");

// Mock "userId" for now
const USER_ID = "default-user";

// GET all lists
router.get("/", auth, async (req, res) => {
  try {
    const lists = await TravelList.find({ userId: req.user.id });
    res.json(lists);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// POST a new place
router.post("/", auth, async (req, res) => {
  const { title, type, notes, description } = req.body;
  try {
    // Check for duplicate title for this user
    const existing = await TravelList.findOne({ userId: req.user.id, title });
    if (existing) {
      return res.status(400).json({ message: "Place already exists in your list." });
    }
    const newPlace = new TravelList({
      userId: req.user.id,
      title,
      type: type && (type === "visited" ? "visited" : "bucketlist"),
      description: description || notes || "",
    });
    if (!newPlace.type) newPlace.type = "bucketlist";
    const saved = await newPlace.save();
    res.json(saved);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// PUT edit or toggle type
router.put("/:id", auth, async (req, res) => {
  const { title, notes, description, type } = req.body;
  try {
    const listItem = await TravelList.findOne({ _id: req.params.id, userId: req.user.id });
    if (!listItem) return res.status(404).json({ message: "Not found" });

    listItem.title = title || listItem.title;
    listItem.description = description || notes || listItem.description;
    listItem.type = type || listItem.type;

    const updated = await listItem.save();
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE a place
router.delete("/:id", auth, async (req, res) => {
  try {
    const listItem = await TravelList.findOne({ _id: req.params.id, userId: req.user.id });
    if (!listItem) return res.status(404).json({ message: "Not found" });

    await listItem.deleteOne();
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
