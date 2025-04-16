import { Request, Response, NextFunction } from "express";

interface AppError extends Error {
    statusCode?: number;
}

export const errorHandler = (err: AppError, req: Request, res: Response, next: NextFunction): void => {
    console.error(err.stack);

    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        success: false,
        error: err.message || "Server Error",
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
};
