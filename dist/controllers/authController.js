"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const jwt_1 = require("../utils/jwt");
const login = (req, res) => {
    const { username, password } = req.body;
    if (username !== "faraz" || password !== "faraz") {
        return res.status(401).json({ success: false, message: "Invalid credentials" });
    }
    const token = (0, jwt_1.generateToken)({ username });
    res.json({ success: true, token });
};
exports.login = login;
