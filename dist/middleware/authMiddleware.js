"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_1 = require("../utils/jwt");
const authMiddleware = (req, res, next) => {
    const authHeader = req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({ success: false, message: "Access denied. No token provided." });
        return;
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = (0, jwt_1.verifyToken)(token);
        if (!decoded) {
            res.status(403).json({ success: false, message: "Invalid or expired token" });
            return;
        }
        req.user = decoded; // Attach user info to request object
        next(); // ✅ Correctly calling next()
    }
    catch (error) {
        res.status(403).json({ success: false, message: "Invalid or expired token" });
    }
};
exports.default = authMiddleware;
