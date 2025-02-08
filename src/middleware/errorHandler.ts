import { Request, Response, NextFunction } from "express";

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction): void => {
  console.error("🔥 ERROR:", err.message);
  console.error("🛠 Stack Trace:", err.stack);

  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};

export default errorHandler;