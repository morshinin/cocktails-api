const mongoose = require("mongoose");

const ingredientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, default: "" }, // 🏷 категория (Овощи, Мясо, Специи и т.д.)
    description: { type: String, default: "" }, // 🧾 описание
    unit: { type: String, default: "g" }, // единица измерения по умолчанию
    image: { type: String, default: "" }, // 🖼 ссылка на изображение
    venueId: { type: mongoose.Schema.Types.ObjectId, ref: "Venue", required: true },
});

module.exports = mongoose.model("Ingredient", ingredientSchema);
