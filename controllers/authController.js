const User = require("../models/User");
const Organization = require("../models/Organization");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

module.exports.registerOwner = async (req, res) => {
  try {
    const { email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email already registered" });

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      passwordHash,
      role: "owner",
    });

    const org = await Organization.create({
      name: `${email}'s Organization`,
      ownerId: user._id,
    });

    user.organizationId = org._id;
    await user.save();

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "7d" });

    res.json({
      token,
      user: {
        email: user.email,
        role: user.role,
        organizationId: user.organizationId,
      },
    });

  } catch (err) {
    res.status(500).json({ message: "Error registering owner" });
  }
};

module.exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(403).json({ message: "Invalid login" });

  const isPassValid = await bcrypt.compare(password, user.passwordHash);
  if (!isPassValid) return res.status(403).json({ message: "Invalid login" });

  const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "7d" });

  res.json({
    token,
    user: {
      email: user.email,
      role: user.role,
      organizationId: user.organizationId,
    }
  });
};

module.exports.getProfile = async (req, res) => {
  res.json({
    user: {
      email: req.user.email,
      role: req.user.role,
      organizationId: req.user.organizationId,
    }
  });
};
