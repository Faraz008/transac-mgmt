import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import connectDB from "./utils/db"; 
import transactionRoutes from "./routes/transactionRoutes";
import authRoutes from "./routes/authRoutes";
import errorHandler from "./middleware/errorHandler";
import requestLogger from "./middleware/requestLogger";

dotenv.config();

const app = express();

// Middleware
app.use(express.json()); // Parses JSON bodies
app.use(requestLogger);

// Debugging Middleware (Logs all requests)
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(` [${req.method}] ${req.url}`);
  next();
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);

// Global Error Handler (MUST be after routes)
app.use(errorHandler);

// ✅ Connect to MongoDB (using db.ts)
connectDB();

// Default Route
app.get("/", (req, res) => {
  res.send("🚀 Transaction Management API is running!");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));