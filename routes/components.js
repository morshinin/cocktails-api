const express = require("express");
const router = express.Router();
const Component = require("../models/Component");

// Получить все компоненты
router.get("/", async (req, res) => {
  try {
    const components = await Component.find();
    res.json(components);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Получить один компонент по ID
router.get("/:id", async (req, res) => {
  try {
    const component = await Component.findById(req.params.id);
    if (!component) return res.status(404).json({ error: "Компонент не найден" });
    res.json(component);
  } catch (err) {
    res.status(500).json({ error: "Ошибка при получении компонента" });
  }
});

// Добавить компонент
router.post("/", async (req, res) => {
  const { name, category, description, image } = req.body;

  const exists = await Component.findOne({ name });
  if (exists) return res.status(409).json({ error: "Компонент уже существует" });

  const component = new Component({ name, category, description, image });
  await component.save();
  res.json(component);
});

// Обновить компонент
router.put("/:id", async (req, res) => {
  const { name, category, description, image } = req.body;
  const updated = await Component.findByIdAndUpdate(
    req.params.id,
    { name, category, description, image },
    { new: true }
  );
  res.json(updated);
});

// Удалить компонент
router.delete("/:id", async (req, res) => {
  await Component.findByIdAndDelete(req.params.id);
  res.json({ message: "Компонент удалён" });
});

module.exports = router;
