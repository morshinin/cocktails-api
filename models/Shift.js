const mongoose = require("mongoose");

const shiftSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    venueId: { type: mongoose.Schema.Types.ObjectId, ref: "Venue", required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    role: { type: String }, // Role for this specific shift (e.g., "Bartender", "Waiter")
    notes: { type: String }
}, { timestamps: true });

module.exports = mongoose.model("Shift", shiftSchema);
