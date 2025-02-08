"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (err, req, res, next) => {
    console.error("🔥 ERROR:", err.message);
    console.error("🛠 Stack Trace:", err.stack);
    res.status(500).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
};
exports.default = errorHandler;
