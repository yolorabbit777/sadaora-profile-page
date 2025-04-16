import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import profileRoutes from "./routes/profileRoutes";
import { errorHandler } from "./middleware/errorHandler";

const app = express();

// Middleware

const corsOptions = {
    origin: "*", // Replace with your client URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/auth", authRoutes);
app.use("/profiles", profileRoutes);

// Error handler
app.use(errorHandler);

export default app;
