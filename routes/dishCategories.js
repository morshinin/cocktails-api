const express = require("express");
const DishCategory = require("../models/DishCategory.js");

const router = express.Router();

// Получить все категории блюд
router.get("/", async (req, res) => {
    try {
        const { venueId } = req.query;
        if (!venueId) return res.status(400).json({ message: "Venue ID is required" });

        const categories = await DishCategory.find({ venueId }).sort({ name: 1 });
        res.json(categories);
    } catch (e) {
        res.status(500).json({ message: "Ошибка при получении категорий" });
    }
});

// Добавить категорию блюд
router.post("/", async (req, res) => {
    try {
        const { name, venueId } = req.body;
        if (!name) return res.status(400).json({ message: "Введите название" });
        if (!venueId) return res.status(400).json({ message: "Venue ID is required" });

        const existing = await DishCategory.findOne({ name: new RegExp(`^${name}$`, "i"), venueId });
        if (existing)
            return res.status(409).json({ message: "Такая категория уже существует" });

        const newCategory = new DishCategory({ name, venueId });
        await newCategory.save();
        res.status(201).json(newCategory);
    } catch (e) {
        res.status(500).json({ message: "Ошибка при добавлении категории" });
    }
});

// Удалить категорию блюд
router.delete("/:id", async (req, res) => {
    try {
        await DishCategory.findByIdAndDelete(req.params.id);
        res.json({ message: "Категория удалена" });
    } catch (e) {
        res.status(500).json({ message: "Ошибка при удалении" });
    }
});

// Обновить категорию блюд
router.put("/:id", async (req, res) => {
    try {
        const { name } = req.body;
        const exists = await DishCategory.findOne({
            _id: { $ne: req.params.id },
            name: new RegExp(`^${name}$`, "i"),
        });
        if (exists)
            return res.status(409).json({ message: "Такая категория уже существует" });

        await DishCategory.findByIdAndUpdate(req.params.id, { name });
        res.json({ message: "Изменено" });
    } catch (e) {
        res.status(500).json({ message: "Ошибка при обновлении" });
    }
});

module.exports = router;
