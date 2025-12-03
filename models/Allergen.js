const mongoose = require("mongoose");

const allergenSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true, trim: true },
    venueId: { type: mongoose.Schema.Types.ObjectId, ref: "Venue", required: true },
});

module.exports = mongoose.model("Allergen", allergenSchema);
