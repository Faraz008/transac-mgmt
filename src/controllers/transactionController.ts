import { Request, Response } from "express";
import Transaction from "../models/transactionModel";

// @desc   Get all transactions
// @route  GET /api/transactions
export const getTransactions = async (req: Request, res: Response): Promise<void> => {
  try {
    const transactions = await Transaction.find();
    res.json({ success: true, data: transactions });
  } catch (error) {
    console.error("🔥 GET Transactions Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// @desc   Get a single transaction
// @route  GET /api/transactions/:id
export const getTransactionById = async (req: Request, res: Response): Promise<void> => {
    try {
      const transaction = await Transaction.findById(req.params.id);
  
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
  

// @desc   Create a new transaction
// @route  POST /api/transactions
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

// @desc   Update a transaction
// @route  PUT /api/transactions/:id
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
  
      res.json({ success: true, data: updatedTransaction });
    } catch (error) {
      console.error("🔥 UPDATE Transaction Error:", error);
      res.status(500).json({ success: false, message: "Server Error" });
    }
  };
  

// @desc   Delete a transaction
// @route  DELETE /api/transactions/:id
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