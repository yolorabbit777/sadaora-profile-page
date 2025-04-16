import express from "express";
import * as profileController from "../controllers/profileController";
import { authenticate } from "../middleware/authenticate";

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Profile routes
router.post("/", profileController.createProfile);
router.get("/me", profileController.getCurrentUserProfile);
router.put("/me", profileController.updateProfile);
router.delete("/me", profileController.deleteProfile);
router.get("/feed", profileController.getProfilesFeed);
router.get("/:userId", profileController.getProfileById);

export default router;
