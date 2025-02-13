import express from "express";
import { 
  getTransactions, 
  getTransactionById, 
  createTransaction, 
  updateTransaction, 
  deleteTransaction 
} from "../controllers/transactionController";
import validateTransaction from "../middleware/validateTransaction";
import authMiddleware from "../middleware/authMiddleware"; // ✅ Ensure JWT auth middleware is used

const router = express.Router();

router.get("/", authMiddleware, (req, res, next) => getTransactions(req, res, next));
router.get("/:id", authMiddleware, (req, res, next) => getTransactionById(req, res, next));
router.post("/", authMiddleware, validateTransaction, (req, res, next) => createTransaction(req, res, next));
router.put("/:id", authMiddleware, validateTransaction, (req, res, next) => updateTransaction(req, res, next));
router.delete("/:id", authMiddleware, (req, res, next) => deleteTransaction(req, res, next));

export default router;