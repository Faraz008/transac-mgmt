"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const transactionController_1 = require("../controllers/transactionController");
const validateTransaction_1 = __importDefault(require("../middleware/validateTransaction"));
const router = express_1.default.Router();
router.get("/", transactionController_1.getTransactions);
router.get("/:id", transactionController_1.getTransactionById);
router.post("/", validateTransaction_1.default, transactionController_1.createTransaction);
router.put("/:id", validateTransaction_1.default, transactionController_1.updateTransaction);
router.delete("/:id", transactionController_1.deleteTransaction);
exports.default = router;
