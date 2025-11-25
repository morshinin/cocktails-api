const express = require("express");
const Ingredient = require("../models/Ingredient");
const router = express.Router();

// GET all ingredients for a venue
router.get("/", async (req, res) => {
    try {
        const { venueId } = req.query;
        if (!venueId) return res.status(400).json({ message: "Venue ID is required" });
        const ingredients = await Ingredient.find({ venueId });
        res.json(ingredients);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST create an ingredient
router.post("/", async (req, res) => {
    try {
        const ingredient = new Ingredient(req.body);
        await ingredient.save();
        res.status(201).json(ingredient);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// DELETE an ingredient
router.delete("/:id", async (req, res) => {
    try {
        await Ingredient.findByIdAndDelete(req.params.id);
        res.json({ message: "Ingredient deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
