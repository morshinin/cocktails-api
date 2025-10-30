const mongoose = require("mongoose");

const componentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  amount: { type: Number, required: true } // количество в миллилитрах
});

const recipeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  glass: { type: String },
  method: { type: String },
  components: [componentSchema],
  decoration: { type: String },
  category: {
    type: String,
    enum: ["Classic", "Signature"],
    default: "Signature",
  },
});

module.exports = mongoose.model("Recipe", recipeSchema);
