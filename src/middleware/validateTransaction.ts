import { Request, Response, NextFunction } from "express";

const validateTransaction = (req: Request, res: Response, next: NextFunction): void => {
  const { type, amount, description } = req.body;
  let errors: string[] = [];

  if (!type) errors.push("Type is required");
  if (!amount) errors.push("Amount is required");
  if (!description) errors.push("Description is required");

  if (amount !== undefined && (typeof amount !== "number" || amount <= 0)) {
    errors.push("Amount must be a positive number");
  }

  if (type && !["credit", "debit"].includes(type.toLowerCase())) {
    errors.push("Type must be either 'credit' or 'debit'");
  }

  if (errors.length > 0) {
    return next({ message: errors.join(", "), status: 400 }); // ✅ Pass errors to error handler
  }

  next();
};

export default validateTransaction;
