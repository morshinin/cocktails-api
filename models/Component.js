const mongoose = require("mongoose");

const componentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, default: "" }, // 🏷 категория
  description: { type: String, default: "" }, // 🧾 описание
  image: { type: String, default: "" }, // 🖼 ссылка на изображение
});

module.exports = mongoose.model("Component", componentSchema);
