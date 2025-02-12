import { Request, Response } from "express";
import Transaction from "../models/transactionModel";

// ✅ Function to mask `_id`
const maskTransactionId = (transaction: any, revealId = false) => {
  if (transaction) {
    const maskedTransaction = transaction.toObject();
    maskedTransaction._id = revealId ? transaction._id : "******"; // ✅ Reveal only when needed
    return maskedTransaction;
  }
  return null;
};

// ✅ GET all transactions (Masked IDs)
export const getTransactions = async (req: Request, res: Response): Promise<void> => {
  try {
    const transactions = await Transaction.find();
    res.json({ success: true, data: transactions.map((t) => maskTransactionId(t, false)) });
  } catch (error) {
    console.error("🔥 GET Transactions Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ✅ GET single transaction by ID (Masked ID)
export const getTransactionById = async (req: Request, res: Response): Promise<void> => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      res.status(404).json({ success: false, message: "Transaction not found" });
      return;
    }

    res.json({ success: true, data: maskTransactionId(transaction) }); // ✅ Mask ID
  } catch (error) {
    console.error("🔥 GET Transaction Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ✅ POST Create a new transaction (Returns REAL _id for Postman)
export const createTransaction = async (req: Request, res: Response): Promise<void> => {
  try {
    const { type, amount, description } = req.body;

    if (!type || !amount || !description) {
      res.status(400).json({ success: false, message: "All fields are required" });
      return;
    }

    const newTransaction = new Transaction({ type, amount, description });
    await newTransaction.save();

    res.status(201).json({ success: true, data: newTransaction }); // ✅ Send real _id
  } catch (error) {
    console.error("🔥 POST Transaction Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ✅ PUT Update a transaction (Masked ID)
export const updateTransaction = async (req: Request, res: Response): Promise<void> => {
  try {
    const { type, amount, description } = req.body;

    const updatedTransaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      { type, amount, description },
      { new: true, runValidators: true }
    );

    if (!updatedTransaction) {
      res.status(404).json({ success: false, message: "Transaction not found" });
      return;
    }

    res.json({ success: true, data: maskTransactionId(updatedTransaction) }); // ✅ Mask ID
  } catch (error) {
    console.error("🔥 UPDATE Transaction Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ✅ DELETE a transaction (No ID needed in response)
export const deleteTransaction = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedTransaction = await Transaction.findByIdAndDelete(req.params.id);

    if (!deletedTransaction) {
      res.status(404).json({ success: false, message: "Transaction not found" });
      return;
    }

    res.json({ success: true, message: "Transaction deleted" });
  } catch (error) {
    console.error("🔥 DELETE Transaction Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
