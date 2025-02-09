"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const jwt_1 = require("../utils/jwt");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // Load environment variables
const login = (req, res) => {
    const { username, password } = req.body;
    const adminUsername = process.env.ADMIN_USERNAME;
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (username !== adminUsername || password !== adminPassword) {
        res.status(401).json({ success: false, message: "Invalid credentials" });
        return; // ✅ Ensure function exits after sending response
    }
    const token = (0, jwt_1.generateToken)({ username });
    res.json({ success: true, token });
};
exports.login = login;
