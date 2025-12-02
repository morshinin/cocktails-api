const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  name: { type: String },
  role: {
    type: String,
    enum: [
      "developer",
      "owner",
      "manager",
      "head_bartender",
      "bartender",
      "head_chef",
      "cook",
      "cleaner",
      "waiter",
      "guest"
    ],
    default: "guest"
  },
  organizationId: { type: mongoose.Schema.Types.ObjectId, ref: "Organization" },
  invitedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  emailVerified: { type: Boolean, default: false },
  emailVerificationToken: { type: String },
  emailVerificationExpires: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
