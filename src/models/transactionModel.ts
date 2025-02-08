import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  type: { type: String, required: true, enum: ["credit", "debit"] },
  amount: { type: Number, required: true },
  description: { type: String, required: true },
});

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;