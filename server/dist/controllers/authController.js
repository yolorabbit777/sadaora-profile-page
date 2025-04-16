"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentUser = exports.login = exports.register = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const jwtUtils_1 = require("../utils/jwtUtils");
const profileModel_1 = __importDefault(require("../models/profileModel"));
// Register a new user
const register = async (req, res) => {
    try {
        const { email, name, password } = req.body;
        // Check if user already exists
        const existingUser = await userModel_1.default.findOne({ where: { email } });
        if (existingUser) {
            res.status(400).json({
                success: false,
                message: "Email already in use",
            });
            return;
        }
        // Create user
        const user = await userModel_1.default.create({
            email,
            name,
            password,
        });
        // Generate token
        const token = (0, jwtUtils_1.generateToken)(user.id);
        res.status(201).json({
            success: true,
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        });
    }
    catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({
            success: false,
            message: "Error registering user",
        });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Find user by email
        const user = await userModel_1.default.findOne({ where: { email } });
        if (!user) {
            res.status(401).json({
                success: false,
                message: "Invalid credentials",
            });
            return;
        }
        // Check password
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            res.status(401).json({
                success: false,
                message: "Invalid credentials",
            });
            return;
        }
        // Generate token
        const token = (0, jwtUtils_1.generateToken)(user.id);
        res.status(200).json({
            success: true,
            token,
            user: {
                id: user.id,
                email: user.email,
            },
        });
    }
    catch (error) {
        console.error("Login error:", error);
        res.status(500).json({
            success: false,
            message: "Error logging in",
        });
    }
};
exports.login = login;
// Get current user
const getCurrentUser = async (req, res) => {
    try {
        const user = await userModel_1.default.findByPk(req.user.id, {
            attributes: { exclude: ["password"] },
            include: [{ model: profileModel_1.default, as: "profile" }],
        });
        if (!user) {
            res.status(404).json({
                success: false,
                message: "User not found",
            });
            return;
        }
        res.status(200).json({
            success: true,
            data: user,
        });
    }
    catch (error) {
        console.error("Get current user error:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching user data",
        });
    }
};
exports.getCurrentUser = getCurrentUser;
