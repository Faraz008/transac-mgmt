import express from "express";
import {
  getTransactions,
  getTransactionById,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from "../controllers/transactionController";
import validateTransaction from "../middleware/validateTransaction";
import authMiddleware from "../middleware/authMiddleware"; // ✅ Import authentication middleware

const router = express.Router();

// ✅ Apply authentication middleware to all protected routes
router.get("/", authMiddleware, getTransactions);
router.get("/:id", authMiddleware, getTransactionById);
router.post("/", authMiddleware, validateTransaction, createTransaction);
router.put("/:id", authMiddleware, validateTransaction, updateTransaction);
router.delete("/:id", authMiddleware, deleteTransaction);

export default router;