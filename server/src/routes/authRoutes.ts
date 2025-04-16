import express from "express";
import * as authController from "../controllers/authController";
import { authenticate } from "../middleware/authenticate";

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/me", authenticate, authController.getCurrentUser);

export default router;
