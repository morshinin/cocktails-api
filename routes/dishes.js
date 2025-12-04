const express = require("express");
const Dish = require("../models/Dish");
const router = express.Router();

// GET all dishes for a venue
router.get("/", async (req, res) => {
    try {
        const { venueId } = req.query;
        if (!venueId) return res.status(400).json({ message: "Venue ID is required" });
        const dishes = await Dish.find({ venueId });
        res.json(dishes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST create a dish
router.post("/", async (req, res) => {
    try {
        const dish = new Dish(req.body);
        await dish.save();
        res.status(201).json(dish);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// PUT update a dish
router.put("/:id", async (req, res) => {
    try {
        const dish = await Dish.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(dish);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// DELETE a dish
router.delete("/:id", async (req, res) => {
    try {
        await Dish.findByIdAndDelete(req.params.id);
        res.json({ message: "Dish deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
