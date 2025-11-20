const express = require("express");
const router = express.Router();
const Glass = require("../models/Glass");

// Получить все бокалы
router.get("/", async (req, res) => {
    try {
        const { venueId } = req.query;
        if (!venueId) return res.status(400).json({ error: "Venue ID is required" });

        const glasses = await Glass.find({ venueId });
        res.json(glasses);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Добавить бокал
router.post("/", async (req, res) => {
    const { name, venueId } = req.body;
    if (!venueId) return res.status(400).json({ error: "Venue ID is required" });

    const exists = await Glass.findOne({ name, venueId });
    if (exists) return res.status(409).json({ error: "Такой бокал уже существует" });

    const glass = new Glass({ name, venueId });
    await glass.save();
    res.json(glass);
});

// Обновить бокал
router.put("/:id", async (req, res) => {
    const { name } = req.body;
    const updated = await Glass.findByIdAndUpdate(
        req.params.id,
        { name },
        { new: true }
    );
    res.json(updated);
});

// Удалить бокал
router.delete("/:id", async (req, res) => {
    await Glass.findByIdAndDelete(req.params.id);
    res.json({ message: "Бокал удалён" });
});

module.exports = router;
