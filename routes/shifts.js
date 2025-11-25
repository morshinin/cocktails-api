const express = require("express");
const Shift = require("../models/Shift");
const router = express.Router();

// GET all shifts for a venue
router.get("/", async (req, res) => {
    try {
        const { venueId, start, end } = req.query;
        if (!venueId) return res.status(400).json({ message: "Venue ID is required" });

        const query = { venueId };

        // Optional date filtering
        if (start && end) {
            query.startTime = { $gte: new Date(start), $lte: new Date(end) };
        }

        const shifts = await Shift.find(query).populate("userId", "email role"); // Populate user details
        res.json(shifts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST create a shift
router.post("/", async (req, res) => {
    try {
        const shift = new Shift(req.body);
        await shift.save();
        res.status(201).json(shift);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// DELETE a shift
router.delete("/:id", async (req, res) => {
    try {
        await Shift.findByIdAndDelete(req.params.id);
        res.json({ message: "Shift deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
