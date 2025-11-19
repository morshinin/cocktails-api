const mongoose = require("mongoose");

const OrganizationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  address: { type: String },
  phone: { type: String },
  email: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("Organization", OrganizationSchema);
