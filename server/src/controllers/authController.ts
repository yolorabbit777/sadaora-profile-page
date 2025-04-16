import { Request, Response } from "express";
import User from "../models/userModel";
import { generateToken } from "../utils/jwtUtils";
import Profile from "../models/profileModel";

// Register a new user
export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, name, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            res.status(400).json({
                success: false,
                message: "Email already in use",
            });
            return;
        }

        // Create user
        const user = await User.create({
            email,
            name,
            password,
        });

        // Generate token
        const token = generateToken(user.id);

        res.status(201).json({
            success: true,
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({
            success: false,
            message: "Error registering user",
        });
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ where: { email } });
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
        const token = generateToken(user.id);

        res.status(200).json({
            success: true,
            token,
            user: {
                id: user.id,
                email: user.email,
            },
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({
            success: false,
            message: "Error logging in",
        });
    }
};

// Get current user
export const getCurrentUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await User.findByPk(req.user.id, {
            attributes: { exclude: ["password"] },
            include: [{ model: Profile, as: "profile" }],
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
    } catch (error) {
        console.error("Get current user error:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching user data",
        });
    }
};
