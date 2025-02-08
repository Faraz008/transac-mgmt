"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const jwt_1 = require("../utils/jwt");
const transactionRoutes_1 = __importDefault(require("./transactionRoutes"));
const login = (req, res) => {
    const { username, password } = req.body;
    if (username !== "admin" || password !== "password") {
        return res.status(401).json({ success: false, message: "Invalid credentials" });
    }
    const token = (0, jwt_1.generateToken)({ username });
    return res.json({ success: true, token });
};
exports.login = login;
exports.default = transactionRoutes_1.default;
