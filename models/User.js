const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ["owner", "admin", "user"], default: "user" },
  organizationId: { type: mongoose.Schema.Types.ObjectId, ref: "Organization" },
  invitedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
