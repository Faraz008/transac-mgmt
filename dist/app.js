"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./utils/db"));
const transactionRoutes_1 = __importDefault(require("./routes/transactionRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
(0, db_1.default)();
app.use("/api/transactions", transactionRoutes_1.default);
app.get("/", (req, res) => {
    res.send("Transaction Management API is running!");
});
exports.default = app;
