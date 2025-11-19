const mongoose = require("mongoose");

const VenueSchema = new mongoose.Schema({
  name: { type: String, required: true },
  organizationId: { type: mongoose.Schema.Types.ObjectId, ref: "Organization", required: true },
}, { timestamps: true });

module.exports = mongoose.model("Venue", VenueSchema);
