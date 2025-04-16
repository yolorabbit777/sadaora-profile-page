import jwt from "jsonwebtoken";
import config from "../config/config";

interface JwtPayload {
    id: string;
}

export const generateToken = (userId: string): string => {
    if (!config.jwt.secret) {
        throw new Error("JWT secret is not configured");
    }

    return jwt.sign({ id: userId }, config.jwt.secret, { expiresIn: config.jwt.expiresIn } as jwt.SignOptions);
};

export const verifyToken = (token: string): JwtPayload => {
    if (!config.jwt.secret) {
        throw new Error("JWT secret is not configured");
    }

    try {
        const decoded = jwt.verify(token, config.jwt.secret) as JwtPayload;
        return decoded;
    } catch (error) {
        throw new Error("Invalid token");
    }
};
