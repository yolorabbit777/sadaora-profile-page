"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = {
    port: process.env.PORT || 5050,
    nodeEnv: process.env.NODE_ENV || "development",
    jwt: {
        secret: process.env.JWT_SECRET || "fallback_secret_key_not_for_production",
        expiresIn: process.env.JWT_EXPIRES_IN || "30d",
    },
    db: {
        name: process.env.DB_NAME || "sadaora",
        user: process.env.DB_USER || "postgres",
        password: process.env.DB_PASSWORD || "postgres",
        host: process.env.DB_HOST || "localhost",
        port: parseInt(process.env.DB_PORT || "5432"),
    },
};
