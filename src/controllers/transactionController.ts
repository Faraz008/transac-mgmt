import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import Transaction from "../models/transactionModel";

// ✅ Utility function to check valid MongoDB ObjectId
const isValidObjectId = (id: string): boolean => mongoose.Types.ObjectId.isValid(id);

// ✅ GET all transactions
export const getTransactions = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const transactions = await Transaction.find();
    res.json({ success: true, data: transactions });
  } catch (error) {
    next(error);
  }
};

// ✅ GET single transaction by ID
export const getTransactionById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;

    let errors: string[] = [];
    if (!isValidObjectId(id)) errors.push("Invalid Transaction ID");

    if (errors.length > 0) {
      res.status(400).json({ success: false, errors });
      return;
    }

    const transaction = await Transaction.findById(id);
    if (!transaction) {
      res.status(404).json({ success: false, message: "Transaction not found" });
      return;
    }

    res.json({ success: true, data: transaction });
  } catch (error) {
    next(error);
  }
};

// ✅ POST Create a new transaction (Handles Multiple Errors)
export const createTransaction = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { type, amount, description } = req.body;
    let errors: string[] = [];

    if (!type) errors.push("Type is required");
    if (!amount) errors.push("Amount is required");
    if (!description) errors.push("Description is required");

    if (amount !== undefined && (typeof amount !== "number" || amount <= 0)) {
      errors.push("Amount must be a positive number");
    }

    if (type && !["credit", "debit"].includes(type)) {
      errors.push("Type must be either 'credit' or 'debit'");
    }

    if (errors.length > 0) {
      res.status(400).json({ success: false, errors });
      return;
    }

    const newTransaction = new Transaction({ type, amount, description });
    await newTransaction.save();

    res.status(201).json({ success: true, data: newTransaction });
  } catch (error) {
    next(error);
  }
};

// ✅ PUT Update a transaction (Handles Multiple Errors)
export const updateTransaction = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const { type, amount, description } = req.body;
    let errors: string[] = [];

    if (!isValidObjectId(id)) errors.push("Invalid Transaction ID");

    if (amount !== undefined && (typeof amount !== "number" || amount <= 0)) {
      errors.push("Amount must be a positive number");
    }

    if (type && !["credit", "debit"].includes(type)) {
      errors.push("Type must be either 'credit' or 'debit'");
    }

    if (errors.length > 0) {
      res.status(400).json({ success: false, errors });
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
    next(error);
  }
};

// ✅ DELETE a transaction
export const deleteTransaction = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    let errors: string[] = [];

    if (!isValidObjectId(id)) errors.push("Invalid Transaction ID");

    if (errors.length > 0) {
      res.status(400).json({ success: false, errors });
      return;
    }

    const deletedTransaction = await Transaction.findByIdAndDelete(id);
    if (!deletedTransaction) {
      res.status(404).json({ success: false, message: "Transaction not found" });
      return;
    }

    res.json({ success: true, message: "Transaction deleted" });
  } catch (error) {
    next(error);
  }
};
