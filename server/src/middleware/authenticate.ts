import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/userModel";
import config from "../config/config";

interface JwtPayload {
    id: string;
}

// Extend the Express Request interface
declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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
        const decoded = jwt.verify(token, config.jwt.secret) as JwtPayload;

        // Find user by id
        const user = await User.findByPk(decoded.id);

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
    } catch (error) {
        res.status(401).json({
            success: false,
            message: "Not authorized to access this route",
        });
    }
};
