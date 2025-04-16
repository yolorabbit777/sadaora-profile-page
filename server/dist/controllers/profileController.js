"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfilesFeed = exports.deleteProfile = exports.updateProfile = exports.getProfileById = exports.getCurrentUserProfile = exports.createProfile = void 0;
const profileModel_1 = __importDefault(require("../models/profileModel"));
const sequelize_1 = require("sequelize");
// Create profile
const createProfile = async (req, res) => {
    try {
        const { name, bio, headline, photoUrl, interests } = req.body;
        const userId = req.user.id;
        // Check if profile already exists
        const existingProfile = await profileModel_1.default.findOne({ where: { userId } });
        if (existingProfile) {
            res.status(400).json({
                success: false,
                message: "Profile already exists for this user",
            });
            return;
        }
        // Create profile
        const profile = await profileModel_1.default.create({
            userId,
            name,
            bio,
            headline,
            photoUrl,
            interests: Array.isArray(interests) ? interests : [],
        });
        res.status(201).json({
            success: true,
            data: profile,
        });
    }
    catch (error) {
        console.error("Create profile error:", error);
        res.status(500).json({
            success: false,
            message: "Error creating profile",
        });
    }
};
exports.createProfile = createProfile;
// Get current user profile
const getCurrentUserProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const profile = await profileModel_1.default.findOne({ where: { userId } });
        if (!profile) {
            res.status(404).json({
                success: false,
                message: "Profile not found",
            });
            return;
        }
        res.status(200).json({
            success: true,
            data: profile,
        });
    }
    catch (error) {
        console.error("Get profile error:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching profile",
        });
    }
};
exports.getCurrentUserProfile = getCurrentUserProfile;
// Get profile by userId
const getProfileById = async (req, res) => {
    try {
        const { userId } = req.params;
        const profile = await profileModel_1.default.findOne({ where: { userId } });
        if (!profile) {
            res.status(404).json({
                success: false,
                message: "Profile not found",
            });
            return;
        }
        res.status(200).json({
            success: true,
            data: profile,
        });
    }
    catch (error) {
        console.error("Get profile by ID error:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching profile",
        });
    }
};
exports.getProfileById = getProfileById;
// Update profile
const updateProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const { name, bio, headline, photoUrl, interests } = req.body;
        const profile = await profileModel_1.default.findOne({ where: { userId } });
        if (!profile) {
            res.status(404).json({
                success: false,
                message: "Profile not found",
            });
            return;
        }
        // Update profile
        await profile.update({
            name: name || profile.name,
            bio: bio || profile.bio,
            headline: headline || profile.headline,
            photoUrl: photoUrl !== undefined ? photoUrl : profile.photoUrl,
            interests: Array.isArray(interests) ? interests : profile.interests,
        });
        res.status(200).json({
            success: true,
            data: profile,
        });
    }
    catch (error) {
        console.error("Update profile error:", error);
        res.status(500).json({
            success: false,
            message: "Error updating profile",
        });
    }
};
exports.updateProfile = updateProfile;
// Delete profile
const deleteProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const profile = await profileModel_1.default.findOne({ where: { userId } });
        if (!profile) {
            res.status(404).json({
                success: false,
                message: "Profile not found",
            });
            return;
        }
        await profile.destroy();
        res.status(200).json({
            success: true,
            message: "Profile deleted successfully",
        });
    }
    catch (error) {
        console.error("Delete profile error:", error);
        res.status(500).json({
            success: false,
            message: "Error deleting profile",
        });
    }
};
exports.deleteProfile = deleteProfile;
// Get all profiles for feed (excluding current user)
const getProfilesFeed = async (req, res) => {
    try {
        const userId = req.user.id;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search || "";
        const offset = (page - 1) * limit;
        const { count, rows } = await profileModel_1.default.findAndCountAll({
            where: {
                userId: {
                    [sequelize_1.Op.ne]: userId, // Exclude current user
                },
                name: {
                    [sequelize_1.Op.iLike]: `%${search}%`,
                },
            },
            limit,
            offset,
            order: [["createdAt", "DESC"]],
        });
        res.status(200).json({
            success: true,
            data: { totalCount: count, pages: Math.ceil(count / limit), currentPage: page, profiles: rows, hasMore: count > offset + limit },
        });
    }
    catch (error) {
        console.error("Get profiles feed error:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching profiles feed",
        });
    }
};
exports.getProfilesFeed = getProfilesFeed;
