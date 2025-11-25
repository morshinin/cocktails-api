const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  venueId: { type: mongoose.Schema.Types.ObjectId, ref: "Venue", required: true },
});

module.exports = mongoose.model("Category", categorySchema);
