"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const profileRoutes_1 = __importDefault(require("./routes/profileRoutes"));
const errorHandler_1 = require("./middleware/errorHandler");
const app = (0, express_1.default)();
// Middleware
const corsOptions = {
    origin: "*", // Replace with your client URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Routes
app.use("/auth", authRoutes_1.default);
app.use("/profiles", profileRoutes_1.default);
// Error handler
app.use(errorHandler_1.errorHandler);
exports.default = app;
