"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTransaction = exports.updateTransaction = exports.createTransaction = exports.getTransactionById = exports.getTransactions = void 0;
const transactionModel_1 = __importDefault(require("../models/transactionModel"));
// @desc   Get all transactions
// @route  GET /api/transactions
const getTransactions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transactions = yield transactionModel_1.default.find();
        res.json({ success: true, data: transactions });
    }
    catch (error) {
        console.error("🔥 GET Transactions Error:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
});
exports.getTransactions = getTransactions;
// @desc   Get a single transaction
// @route  GET /api/transactions/:id
const getTransactionById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transaction = yield transactionModel_1.default.findById(req.params.id);
        if (!transaction) {
            res.status(404).json({ success: false, message: "Transaction not found" });
            return;
        }
        res.json({ success: true, data: transaction });
    }
    catch (error) {
        console.error("🔥 GET Transaction Error:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
});
exports.getTransactionById = getTransactionById;
// @desc   Create a new transaction
// @route  POST /api/transactions
const createTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { type, amount, description } = req.body;
        if (!type || !amount || !description) {
            res.status(400).json({ success: false, message: "All fields are required" });
            return;
        }
        const newTransaction = new transactionModel_1.default({ type, amount, description });
        yield newTransaction.save();
        res.status(201).json({ success: true, data: newTransaction });
    }
    catch (error) {
        console.error("🔥 POST Transaction Error:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
});
exports.createTransaction = createTransaction;
// @desc   Update a transaction
// @route  PUT /api/transactions/:id
const updateTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { type, amount, description } = req.body;
        const updatedTransaction = yield transactionModel_1.default.findByIdAndUpdate(req.params.id, { type, amount, description }, { new: true, runValidators: true });
        if (!updatedTransaction) {
            res.status(404).json({ success: false, message: "Transaction not found" });
            return;
        }
        res.json({ success: true, data: updatedTransaction });
    }
    catch (error) {
        console.error("🔥 UPDATE Transaction Error:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
});
exports.updateTransaction = updateTransaction;
// @desc   Delete a transaction
// @route  DELETE /api/transactions/:id
const deleteTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedTransaction = yield transactionModel_1.default.findByIdAndDelete(req.params.id);
        if (!deletedTransaction) {
            res.status(404).json({ success: false, message: "Transaction not found" });
            return;
        }
        res.json({ success: true, message: "Transaction deleted" });
    }
    catch (error) {
        console.error("🔥 DELETE Transaction Error:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
});
exports.deleteTransaction = deleteTransaction;
