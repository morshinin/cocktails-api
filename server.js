require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const componentsRouter = require("./routes/components.js");
const methodsRouter = require("./routes/methods.js");
const recipesRouter = require("./routes/recipes");
const instructionsRouter = require("./routes/instructions");
const authRouter = require("./routes/auth");
const glassesRouter = require("./routes/glasses");

const venueRouter = require("./routes/venues");
const organizationsRouter = require("./routes/organizations");
const { authenticate } = require("./middleware/auth");

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;

// === Подключаем маршруты ===
const uploadRouter = require("./routes/upload");

const app = express();
app.use(cors());
app.use(express.json());
// app.use("/api/methods", methodsRouter);
app.use("/api/recipes", recipesRouter);
app.use("/api/components", componentsRouter);
app.use("/api/instructions", instructionsRouter);
// === Делаем папку uploads доступной ===
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/upload", uploadRouter);
app.use("/api/methods", authenticate, methodsRouter);
app.use("/api/glasses", authenticate, glassesRouter);
app.use("/api/organizations", authenticate, organizationsRouter);
app.use("/api/venues", venueRouter);
app.use("/api", authRouter);

mongoose.connect(MONGO_URL, {
  dbName: "cocktails",
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
  console.log("✅ Подключено к MongoDB");
});

// --- Запуск ---
app.listen(PORT, () => console.log(`🚀 Сервер запущен на http://localhost:${PORT}`));
