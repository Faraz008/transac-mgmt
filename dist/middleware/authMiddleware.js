"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_1 = require("../utils/jwt");
const authMiddleware = (req, res, next) => {
    var _a;
    const token = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token) {
        return res.status(401).json({ success: false, message: "Access denied. No token provided." });
    }
    const decoded = (0, jwt_1.verifyToken)(token);
    if (!decoded) {
        return res.status(403).json({ success: false, message: "Invalid or expired token" });
    }
    req.user = decoded; // Attach user info to request object
    next();
};
exports.default = authMiddleware;
