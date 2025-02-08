import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

interface AuthRequest extends Request {
  user?: any;
}

const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ success: false, message: "Access denied. No token provided." });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = verifyToken(token);
    if (!decoded) {
      res.status(403).json({ success: false, message: "Invalid or expired token" });
      return;
    }

    req.user = decoded; // Attach user info to request object
    next(); // ✅ Correctly calling next()
  } catch (error) {
    res.status(403).json({ success: false, message: "Invalid or expired token" });
  }
};

export default authMiddleware;
