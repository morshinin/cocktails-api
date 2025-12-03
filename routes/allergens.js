const express = require("express");
const Allergen = require("../models/Allergen.js");

const router = express.Router();

// Получить все аллергены
router.get("/", async (req, res) => {
    try {
        const { venueId } = req.query;
        if (!venueId) return res.status(400).json({ message: "Venue ID is required" });

        const allergens = await Allergen.find({ venueId }).sort({ name: 1 });
        res.json(allergens);
    } catch (e) {
        res.status(500).json({ message: "Ошибка при получении аллергенов" });
    }
});

// Добавить аллерген
router.post("/", async (req, res) => {
    try {
        const { name, venueId } = req.body;
        if (!name) return res.status(400).json({ message: "Введите название" });
        if (!venueId) return res.status(400).json({ message: "Venue ID is required" });

        const existing = await Allergen.findOne({ name: new RegExp(`^${name}$`, "i"), venueId });
        if (existing)
            return res.status(409).json({ message: "Такой аллерген уже существует" });

        const newAllergen = new Allergen({ name, venueId });
        await newAllergen.save();
        res.status(201).json(newAllergen);
    } catch (e) {
        res.status(500).json({ message: "Ошибка при добавлении аллергена" });
    }
});

// Удалить аллерген
router.delete("/:id", async (req, res) => {
    try {
        await Allergen.findByIdAndDelete(req.params.id);
        res.json({ message: "Аллерген удалён" });
    } catch (e) {
        res.status(500).json({ message: "Ошибка при удалении" });
    }
});

// Обновить аллерген
router.put("/:id", async (req, res) => {
    try {
        const { name } = req.body;
        const exists = await Allergen.findOne({
            _id: { $ne: req.params.id },
            name: new RegExp(`^${name}$`, "i"),
        });
        if (exists)
            return res.status(409).json({ message: "Такой аллерген уже существует" });

        await Allergen.findByIdAndUpdate(req.params.id, { name });
        res.json({ message: "Изменено" });
    } catch (e) {
        res.status(500).json({ message: "Ошибка при обновлении" });
    }
});

module.exports = router;
