const mongoose = require("mongoose");

const ingredientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    amount: { type: Number, required: true }, // количество
    unit: { type: String, default: "g" } // единица измерения (гр, мл, шт)
});

const dishSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    category: { type: String }, // e.g., "Appetizer", "Main Course", "Dessert"
    ingredients: [ingredientSchema],
    price: { type: Number },
    image: { type: String },
    venueId: { type: mongoose.Schema.Types.ObjectId, ref: "Venue", required: true },
});

module.exports = mongoose.model("Dish", dishSchema);
