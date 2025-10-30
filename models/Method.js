// models/Method.js
const mongoose = require("mongoose");

const methodSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, trim: true },
});

module.exports = mongoose.model("Method", methodSchema);
