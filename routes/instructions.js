const express = require('express');
const router = express.Router();
const Instruction = require('../models/Instruction');
const Recipe = require('../models/Recipe');

// Получить инструкцию по рецепту
router.get('/:recipeId', async (req, res) => {
  try {
    const instruction = await Instruction.findOne({ recipeId: req.params.recipeId });
    if (!instruction) return res.status(404).json({ message: 'Инструкция не найдена' });
    res.json(instruction);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Создать новую инструкцию
router.post('/:recipeId', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.recipeId);
    if (!recipe) return res.status(404).json({ message: 'Рецепт не найден' });

    // Проверяем, есть ли уже инструкция
    let instruction = await Instruction.findOne({ recipeId: req.params.recipeId });

    if (instruction) {
      instruction.steps = req.body.steps;
      await instruction.save();
    } else {
      instruction = new Instruction({
        recipeId: req.params.recipeId,
        steps: req.body.steps,
      });
      await instruction.save();
    }

    res.json(instruction);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Удалить инструкцию
router.delete('/:recipeId', async (req, res) => {
  try {
    const result = await Instruction.findOneAndDelete({ recipeId: req.params.recipeId });
    if (!result) return res.status(404).json({ message: 'Инструкция не найдена' });
    res.json({ message: 'Инструкция удалена' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
