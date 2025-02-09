"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const transactionController_1 = require("../controllers/transactionController");
const validateTransaction_1 = __importDefault(require("../middleware/validateTransaction"));
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware")); // ✅ Import authentication middleware
const router = express_1.default.Router();
// ✅ Apply authentication middleware to all protected routes
router.get("/", authMiddleware_1.default, transactionController_1.getTransactions);
router.get("/:id", authMiddleware_1.default, transactionController_1.getTransactionById);
router.post("/", authMiddleware_1.default, validateTransaction_1.default, transactionController_1.createTransaction);
router.put("/:id", authMiddleware_1.default, validateTransaction_1.default, transactionController_1.updateTransaction);
router.delete("/:id", authMiddleware_1.default, transactionController_1.deleteTransaction);
exports.default = router;
