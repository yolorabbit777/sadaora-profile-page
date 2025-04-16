"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../models/userModel"));
const config_1 = __importDefault(require("../config/config"));
const authenticate = async (req, res, next) => {
    try {
        let token;
        // Check for token in headers
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
        }
        if (!token) {
            res.status(401).json({
                success: false,
                message: "Not authorized to access this route",
            });
            return;
        }
        // Verify token
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt.secret);
        // Find user by id
        const user = await userModel_1.default.findByPk(decoded.id);
        if (!user) {
            res.status(404).json({
                success: false,
                message: "User not found",
            });
            return;
        }
        // Attach user to request object
        req.user = user;
        next();
    }
    catch (error) {
        res.status(401).json({
            success: false,
            message: "Not authorized to access this route",
        });
    }
};
exports.authenticate = authenticate;
