const express = require("express");
const KitchenMethod = require("../models/KitchenMethod.js");

const router = express.Router();

// Получить все методы кухни
router.get("/", async (req, res) => {
    try {
        const { venueId } = req.query;
        if (!venueId) return res.status(400).json({ message: "Venue ID is required" });

        const methods = await KitchenMethod.find({ venueId }).sort({ name: 1 });
        res.json(methods);
    } catch (e) {
        res.status(500).json({ message: "Ошибка при получении методов" });
    }
});

// Добавить метод кухни
router.post("/", async (req, res) => {
    try {
        const { name, venueId } = req.body;
        if (!name) return res.status(400).json({ message: "Введите название" });
        if (!venueId) return res.status(400).json({ message: "Venue ID is required" });

        const existing = await KitchenMethod.findOne({ name: new RegExp(`^${name}$`, "i"), venueId });
        if (existing)
            return res.status(409).json({ message: "Такой метод уже существует" });

        const newMethod = new KitchenMethod({ name, venueId });
        await newMethod.save();
        res.status(201).json(newMethod);
    } catch (e) {
        res.status(500).json({ message: "Ошибка при добавлении метода" });
    }
});

// Удалить метод кухни
router.delete("/:id", async (req, res) => {
    try {
        await KitchenMethod.findByIdAndDelete(req.params.id);
        res.json({ message: "Метод удалён" });
    } catch (e) {
        res.status(500).json({ message: "Ошибка при удалении" });
    }
});

// Обновить метод кухни
router.put("/:id", async (req, res) => {
    try {
        const { name } = req.body;
        const exists = await KitchenMethod.findOne({
            _id: { $ne: req.params.id },
            name: new RegExp(`^${name}$`, "i"),
        });
        if (exists)
            return res.status(409).json({ message: "Такой метод уже существует" });

        await KitchenMethod.findByIdAndUpdate(req.params.id, { name });
        res.json({ message: "Изменено" });
    } catch (e) {
        res.status(500).json({ message: "Ошибка при обновлении" });
    }
});

module.exports = router;
