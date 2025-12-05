const User = require("../models/User");
const Organization = require("../models/Organization");
const Venue = require("../models/Venue");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { sendVerificationEmail } = require("../services/emailService");

const JWT_SECRET = process.env.JWT_SECRET;

module.exports.registerOwner = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email already registered" });

    const passwordHash = await bcrypt.hash(password, 10);

    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const verificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    const user = await User.create({
      email,
      passwordHash,
      name,
      role: "owner",
      emailVerified: false,
      emailVerificationToken: verificationToken,
      emailVerificationExpires: verificationExpires,
    });

    const org = await Organization.create({
      name: name ? `${name}'s Organization` : `${email}'s Organization`,
      ownerId: user._id,
    });

    user.organizationId = org._id;
    await user.save();

    // Send verification email
    try {
      await sendVerificationEmail(email, verificationToken, name);
    } catch (emailError) {
      console.error('Failed to send verification email:', emailError);
      // Continue registration even if email fails
    }

    res.json({
      message: "Registration successful! Please check your email to verify your account.",
      email: user.email,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error registering owner" });
  }
};

module.exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(403).json({ message: "Invalid login" });

  const isPassValid = await bcrypt.compare(password, user.passwordHash);
  if (!isPassValid) return res.status(403).json({ message: "Invalid login" });

  // Check if email is verified
  if (!user.emailVerified) {
    return res.status(403).json({
      message: "Please verify your email before logging in",
      emailNotVerified: true,
      email: user.email
    });
  }

  const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "7d" });

  res.json({
    token,
    user: {
      email: user.email,
      role: user.role,
      organizationId: user.organizationId,
      name: user.name,
      photoUrl: user.photoUrl,
    }
  });
};

module.exports.getProfile = async (req, res) => {
  try {
    const user = req.user;
    const organization = await Organization.findById(user.organizationId);
    const venues = await Venue.find({ organizationId: user.organizationId });

    res.json({
      user: {
        email: user.email,
        role: user.role,
        organizationId: user.organizationId,
        name: user.name,
        photoUrl: user.photoUrl,
      },
      organization,
      venues
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching profile" });
  }
};

module.exports.verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;
    console.log('🔍 Verifying email with token:', token);

    const user = await User.findOne({
      emailVerificationToken: token,
      emailVerificationExpires: { $gt: Date.now() },
    });

    if (!user) {
      console.log('❌ No user found with this token or token expired');
      return res.status(400).json({ message: "Invalid or expired verification token" });
    }

    console.log('✅ User found:', user.email);
    console.log('📧 Current emailVerified status:', user.emailVerified);

    user.emailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpires = undefined;
    await user.save();

    console.log('✅ Email verified successfully for:', user.email);
    res.json({ message: "Email verified successfully! You can now log in." });
  } catch (err) {
    console.error('❌ Error in verifyEmail:', err);
    res.status(500).json({ message: "Error verifying email" });
  }
};

module.exports.resendVerification = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.emailVerified) {
      return res.status(400).json({ message: "Email already verified" });
    }

    // Generate new verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const verificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    user.emailVerificationToken = verificationToken;
    user.emailVerificationExpires = verificationExpires;
    await user.save();

    // Send verification email
    await sendVerificationEmail(user.email, verificationToken, user.name);

    res.json({ message: "Verification email sent! Please check your inbox." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error resending verification email" });
  }
};

module.exports.updateProfile = async (req, res) => {
  try {
    const user = req.user;
    const { name, email, password, photoUrl } = req.body;

    // Update allowed fields
    if (name !== undefined) user.name = name;
    if (email !== undefined) user.email = email;
    if (photoUrl !== undefined) user.photoUrl = photoUrl;

    // Update password if provided
    if (password) {
      user.passwordHash = await bcrypt.hash(password, 10);
    }

    await user.save();

    res.json({
      user: {
        email: user.email,
        role: user.role,
        organizationId: user.organizationId,
        name: user.name,
        photoUrl: user.photoUrl,
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating profile" });
  }
};


