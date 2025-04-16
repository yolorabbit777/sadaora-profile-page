import dotenv from "dotenv";
dotenv.config();

export default {
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
