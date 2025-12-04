const express = require("express");
const Upsell = require("../models/Upsell.js");

const router = express.Router();

// Получить все доп. продажи
router.get("/", async (req, res) => {
    try {
        const { venueId } = req.query;
        if (!venueId) return res.status(400).json({ message: "Venue ID is required" });

        const upsells = await Upsell.find({ venueId }).sort({ name: 1 });
        res.json(upsells);
    } catch (e) {
        res.status(500).json({ message: "Ошибка при получении доп. продаж" });
    }
});

// Добавить доп. продажу
router.post("/", async (req, res) => {
    try {
        const { name, venueId } = req.body;
        if (!name) return res.status(400).json({ message: "Введите название" });
        if (!venueId) return res.status(400).json({ message: "Venue ID is required" });

        const existing = await Upsell.findOne({ name: new RegExp(`^${name}$`, "i"), venueId });
        if (existing)
            return res.status(409).json({ message: "Такая доп. продажа уже существует" });

        const newUpsell = new Upsell({ name, venueId });
        await newUpsell.save();
        res.status(201).json(newUpsell);
    } catch (e) {
        res.status(500).json({ message: "Ошибка при добавлении доп. продажи" });
    }
});

// Удалить доп. продажу
router.delete("/:id", async (req, res) => {
    try {
        await Upsell.findByIdAndDelete(req.params.id);
        res.json({ message: "Доп. продажа удалена" });
    } catch (e) {
        res.status(500).json({ message: "Ошибка при удалении" });
    }
});

// Обновить доп. продажу
router.put("/:id", async (req, res) => {
    try {
        const { name } = req.body;
        const exists = await Upsell.findOne({
            _id: { $ne: req.params.id },
            name: new RegExp(`^${name}$`, "i"),
        });
        if (exists)
            return res.status(409).json({ message: "Такая доп. продажа уже существует" });

        await Upsell.findByIdAndUpdate(req.params.id, { name });
        res.json({ message: "Изменено" });
    } catch (e) {
        res.status(500).json({ message: "Ошибка при обновлении" });
    }
});

module.exports = router;
