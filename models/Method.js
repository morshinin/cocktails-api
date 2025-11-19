// models/Method.js
const mongoose = require("mongoose");

const methodSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, trim: true },
  venueId: { type: mongoose.Schema.Types.ObjectId, ref: "Venue", required: true },
});

module.exports = mongoose.model("Method", methodSchema);
