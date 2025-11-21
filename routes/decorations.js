const express = require("express");
const router = express.Router();
const Decoration = require("../models/Decoration");

// Получить все украшения
router.get("/", async (req, res) => {
    try {
        const { venueId } = req.query;
        if (!venueId) return res.status(400).json({ error: "Venue ID is required" });

        const decorations = await Decoration.find({ venueId });
        res.json(decorations);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Добавить украшение
router.post("/", async (req, res) => {
    const { name, venueId } = req.body;
    if (!venueId) return res.status(400).json({ error: "Venue ID is required" });

    const exists = await Decoration.findOne({ name, venueId });
    if (exists) return res.status(409).json({ error: "Такое украшение уже существует" });

    const decoration = new Decoration({ name, venueId });
    await decoration.save();
    res.json(decoration);
});

// Обновить украшение
router.put("/:id", async (req, res) => {
    const { name } = req.body;
    const updated = await Decoration.findByIdAndUpdate(
        req.params.id,
        { name },
        { new: true }
    );
    res.json(updated);
});

// Удалить украшение
router.delete("/:id", async (req, res) => {
    await Decoration.findByIdAndDelete(req.params.id);
    res.json({ message: "Украшение удалено" });
});

module.exports = router;
