import { Request, Response } from "express";
import { generateToken } from "../utils/jwt";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

export const login = (req: Request, res: Response): void => {
  const { username, password } = req.body;

  const adminUsername = process.env.ADMIN_USERNAME;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (username !== adminUsername || password !== adminPassword) {
    res.status(401).json({ success: false, message: "Invalid credentials" });
    return; // ✅ Ensure function exits after sending response
  }

  const token = generateToken({ username });
  res.json({ success: true, token });
};