"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
const generateToken = (userId) => {
    if (!config_1.default.jwt.secret) {
        throw new Error("JWT secret is not configured");
    }
    return jsonwebtoken_1.default.sign({ id: userId }, config_1.default.jwt.secret, { expiresIn: config_1.default.jwt.expiresIn });
};
exports.generateToken = generateToken;
const verifyToken = (token) => {
    if (!config_1.default.jwt.secret) {
        throw new Error("JWT secret is not configured");
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt.secret);
        return decoded;
    }
    catch (error) {
        throw new Error("Invalid token");
    }
};
exports.verifyToken = verifyToken;
