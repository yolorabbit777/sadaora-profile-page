import { Request, Response } from "express";
import Profile from "../models/profileModel";
import User from "../models/userModel";
import { Op } from "sequelize";

// Create profile
export const createProfile = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, bio, headline, photoUrl, interests } = req.body;
        const userId = req.user.id;

        // Check if profile already exists
        const existingProfile = await Profile.findOne({ where: { userId } });
        if (existingProfile) {
            res.status(400).json({
                success: false,
                message: "Profile already exists for this user",
            });
            return;
        }

        // Create profile
        const profile = await Profile.create({
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
    } catch (error) {
        console.error("Create profile error:", error);
        res.status(500).json({
            success: false,
            message: "Error creating profile",
        });
    }
};

// Get current user profile
export const getCurrentUserProfile = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.user.id;

        const profile = await Profile.findOne({ where: { userId } });
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
    } catch (error) {
        console.error("Get profile error:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching profile",
        });
    }
};

// Get profile by userId
export const getProfileById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId } = req.params;

        const profile = await Profile.findOne({ where: { userId } });
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
    } catch (error) {
        console.error("Get profile by ID error:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching profile",
        });
    }
};

// Update profile
export const updateProfile = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.user.id;
        const { name, bio, headline, photoUrl, interests } = req.body;

        const profile = await Profile.findOne({ where: { userId } });
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
    } catch (error) {
        console.error("Update profile error:", error);
        res.status(500).json({
            success: false,
            message: "Error updating profile",
        });
    }
};

// Delete profile
export const deleteProfile = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.user.id;

        const profile = await Profile.findOne({ where: { userId } });
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
    } catch (error) {
        console.error("Delete profile error:", error);
        res.status(500).json({
            success: false,
            message: "Error deleting profile",
        });
    }
};

// Get all profiles for feed (excluding current user)
export const getProfilesFeed = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.user.id;
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const search = (req.query.search as string) || "";
        const offset = (page - 1) * limit;

        const { count, rows } = await Profile.findAndCountAll({
            where: {
                userId: {
                    [Op.ne]: userId, // Exclude current user
                },
                name: {
                    [Op.iLike]: `%${search}%`,
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
    } catch (error) {
        console.error("Get profiles feed error:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching profiles feed",
        });
    }
};
