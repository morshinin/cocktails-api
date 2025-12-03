const mongoose = require("mongoose");

const kitchenMethodSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true, trim: true },
    venueId: { type: mongoose.Schema.Types.ObjectId, ref: "Venue", required: true },
});

module.exports = mongoose.model("KitchenMethod", kitchenMethodSchema);
