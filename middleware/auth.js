const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports.authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.sendStatus(401);

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId);
    next();
  } catch {
    res.sendStatus(401);
  }
};

module.exports.requireRole = (roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) return res.sendStatus(403);
  next();
};
