import { Request, Response } from "express";
import mongoose from "mongoose"; // ✅ Import mongoose to validate ObjectId
import Transaction from "../models/transactionModel";

// ✅ Utility function to check valid MongoDB ObjectId
const isValidObjectId = (id: string): boolean => mongoose.Types.ObjectId.isValid(id);

// ✅ GET all transactions
export const getTransactions = async (req: Request, res: Response): Promise<void> => {
  try {
    const transactions = await Transaction.find();
    res.json({ success: true, data: transactions });
  } catch (error) {
    console.error("🔥 GET Transactions Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ✅ GET single transaction by ID
export const getTransactionById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      res.status(404).json({ success: false, message: "Transaction not found" });
      return;
    }

    const transaction = await Transaction.findById(id);

    if (!transaction) {
      res.status(404).json({ success: false, message: "Transaction not found" });
      return;
    }

    res.json({ success: true, data: transaction });
  } catch (error) {
    console.error("🔥 GET Transaction Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ✅ POST Create a new transaction
export const createTransaction = async (req: Request, res: Response): Promise<void> => {
  try {
    const { type, amount, description } = req.body;

    if (!type || !amount || !description) {
      res.status(400).json({ success: false, message: "All fields are required" });
      return;
    }

    const newTransaction = new Transaction({ type, amount, description });
    await newTransaction.save();

    res.status(201).json({ success: true, data: newTransaction });
  } catch (error) {
    console.error("🔥 POST Transaction Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ✅ PUT Update a transaction
export const updateTransaction = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { type, amount, description } = req.body;

    if (!isValidObjectId(id)) {
      res.status(404).json({ success: false, message: "Transaction not found" });
      return;
    }

    const updatedTransaction = await Transaction.findByIdAndUpdate(
      id,
      { type, amount, description },
      { new: true, runValidators: true }
    );

    if (!updatedTransaction) {
      res.status(404).json({ success: false, message: "Transaction not found" });
      return;
    }

    res.json({ success: true, data: updatedTransaction });
  } catch (error) {
    console.error("🔥 UPDATE Transaction Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ✅ DELETE a transaction
export const deleteTransaction = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      res.status(404).json({ success: false, message: "Transaction not found" });
      return;
    }

    const deletedTransaction = await Transaction.findByIdAndDelete(id);

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
