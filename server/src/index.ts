import app from "./app";
import sequelize from "./config/db";
import config from "./config/config";

// Start server
const startServer = async () => {
    try {
        // Sync database
        await sequelize.sync({ alter: true });
        console.log("Database synchronized");

        // Start server
        app.listen(config.port, () => {
            console.log(`Server running in ${config.nodeEnv} mode on port ${config.port}`);
        });
    } catch (error) {
        console.error("Error starting server:", error);
        process.exit(1);
    }
};

startServer();
