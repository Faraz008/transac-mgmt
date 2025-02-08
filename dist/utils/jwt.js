"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const secretKey = process.env.JWT_SECRET;
if (!secretKey) {
    console.error("❌ Error: JWT_SECRET is not defined in .env");
    process.exit(1);
}
// ✅ Function to generate a JWT Token
const generateToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, secretKey, { expiresIn: "1h" });
};
exports.generateToken = generateToken;
// ✅ Function to verify a JWT Token
const verifyToken = (token) => {
    try {
        return jsonwebtoken_1.default.verify(token, secretKey);
    }
    catch (error) {
        return null;
    }
};
exports.verifyToken = verifyToken;
console.log("✅ JWT Utility Initialized Successfully!");
