import express from "express";
import cors from "cors";
import connectDB from "./utils/db";
import transactionRoutes from "./routes/transactionRoutes";

const app = express();
app.use(express.json());
app.use(cors());

connectDB();

app.use("/api/transactions", transactionRoutes);

app.get("/", (req, res) => {
  res.send("Transaction Management API is running!");
});

export default app;