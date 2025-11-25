const express = require("express");
const router = express.Router();
const Category = require("../models/Category");

// Получить все категории для заведения
router.get("/", async (req, res) => {
    try {
        const { venueId } = req.query;
        if (!venueId) return res.status(400).json({ message: "Venue ID required" });

        const categories = await Category.find({ venueId });
        res.json(categories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Создать категорию
router.post("/", async (req, res) => {
    try {
        const { name, venueId } = req.body;
        const category = new Category({ name, venueId });
        await category.save();
        res.status(201).json(category);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Обновить категорию
router.put("/:id", async (req, res) => {
    try {
        const { name } = req.body;
        const category = await Category.findByIdAndUpdate(
            req.params.id,
            { name },
            { new: true }
        );
        res.json(category);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Удалить категорию
router.delete("/:id", async (req, res) => {
    try {
        await Category.findByIdAndDelete(req.params.id);
        res.json({ message: "Category deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
