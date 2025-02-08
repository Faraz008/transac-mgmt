"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validateTransaction = (req, res, next) => {
    const { type, amount, description } = req.body;
    if (!type || !amount || !description) {
        res.status(400).json({ success: false, message: "All fields are required" });
        return;
    }
    if (typeof amount !== "number" || amount <= 0) {
        res.status(400).json({ success: false, message: "Amount must be a positive number" });
        return;
    }
    if (type !== "credit" && type !== "debit") {
        res.status(400).json({ success: false, message: "Type must be either 'credit' or 'debit'" });
        return;
    }
    next(); //
};
exports.default = validateTransaction;
