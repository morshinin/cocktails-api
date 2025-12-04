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
    image: { type: String },
    method: { type: String },
    allergens: [{ type: String }],
    upsells: [{ type: String }],
    notes: { type: String },
    pairing: { type: String },
    venueId: { type: mongoose.Schema.Types.ObjectId, ref: "Venue", required: true },
});

module.exports = mongoose.model("Dish", dishSchema);
