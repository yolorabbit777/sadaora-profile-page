"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const db_1 = __importDefault(require("./config/db"));
const config_1 = __importDefault(require("./config/config"));
// Start server
const startServer = async () => {
    try {
        // Sync database
        await db_1.default.sync({ alter: true });
        console.log("Database synchronized");
        // Start server
        app_1.default.listen(config_1.default.port, () => {
            console.log(`Server running in ${config_1.default.nodeEnv} mode on port ${config_1.default.port}`);
        });
    }
    catch (error) {
        console.error("Error starting server:", error);
        process.exit(1);
    }
};
startServer();
