"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const transactionRoutes_1 = __importDefault(require("./routes/transactionRoutes"));
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
const requestLogger_1 = __importDefault(require("./middleware/requestLogger"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json()); // Parses JSON bodies
app.use(requestLogger_1.default);
// Debugging Middleware (Logs all requests)
app.use((req, res, next) => {
    console.log(` [${req.method}] ${req.url}`);
    next();
});
// Routes
app.use("/api/auth", authRoutes_1.default);
app.use("/api/transactions", transactionRoutes_1.default);
// Global Error Handler (MUST be after routes)
app.use(errorHandler_1.default);
// MongoDB Connection
mongoose_1.default
    .connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch((error) => console.error("❌ MongoDB Connection Error:", error));
// Enable MongoDB Debug Mode
mongoose_1.default.set("debug", true);
// Default Route
app.get("/", (req, res) => {
    res.send("🚀 Transaction Management API is running!");
});
// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
