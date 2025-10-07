const mongoose = require("mongoose");

const travelListSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["bucketlist", "visited"],
    required: true,
    default: "bucketlist"
  },
  description: {
    type: String,
    required: false,
    default: ""
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("TravelList", travelListSchema);
