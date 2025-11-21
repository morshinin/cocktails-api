const mongoose = require("mongoose");

const decorationSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    venueId: { type: mongoose.Schema.Types.ObjectId, ref: "Venue", required: true },
});

module.exports = mongoose.model("Decoration", decorationSchema);
