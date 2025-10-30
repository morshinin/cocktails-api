const mongoose = require('mongoose');

const StepSchema = new mongoose.Schema({
  order: Number,
  text: String,
});

const InstructionSchema = new mongoose.Schema({
  recipeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe', required: true },
  steps: [StepSchema],
});

module.exports = mongoose.model('Instruction', InstructionSchema);
