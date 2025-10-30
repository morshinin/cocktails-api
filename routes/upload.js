const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();

// === Настройка хранения ===
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// === Маршрут для загрузки изображения ===
router.post("/", upload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "Файл не загружен" });

  const imageUrl = `http://localhost:3000/uploads/${req.file.filename}`;
  res.json({ url: imageUrl });
});

module.exports = router;
