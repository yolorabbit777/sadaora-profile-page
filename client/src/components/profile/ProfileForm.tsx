import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useProfile } from "../../hooks/useProfile";
import { ProfileFormData } from "../../types/profile.types";
import Input from "../common/Input";
import Button from "../common/Button";
import InterestTags from "./InterestTags";

import { CLOUDINARY_UPLOAD_URL, CLOUDINARY_UPLOAD_PRESET } from "../../config";

const ProfileForm: React.FC = () => {
    const navigate = useNavigate();
    const { profile, loading, saveProfile } = useProfile();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [formData, setFormData] = useState<ProfileFormData>({
        name: "",
        bio: "",
        headline: "",
        photoUrl: "",
        interests: [],
    });

    const [formErrors, setFormErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [saveError, setSaveError] = useState<string | null>(null);
    const [uploadingImage, setUploadingImage] = useState<boolean>(false);
    const [uploadError, setUploadError] = useState<string | null>(null);
    const [uploadProgress, setUploadProgress] = useState<number>(0);

    // Initialize form data when profile is loaded
    useEffect(() => {
        if (profile) {
            setFormData({
                name: profile.name,
                bio: profile.bio,
                headline: profile.headline,
                photoUrl: profile.photoUrl || "",
                interests: profile.interests,
            });
        }
    }, [profile]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        // Clear errors when user starts typing
        if (formErrors[name]) {
            setFormErrors((prev) => ({ ...prev, [name]: "" }));
        }

        // Clear general save error when user changes any field
        if (saveError) {
            setSaveError(null);
        }
    };

    const handleInterestsChange = (interests: string[]) => {
        setFormData((prev) => ({ ...prev, interests }));
    };

    const handleAvatarClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const uploadToCloudinary = async (file: File): Promise<string> => {
        try {
            // Create a FormData object to send the file
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
            formData.append("folder", "user_avatars"); // Optional: organize uploads in a folder

            // Use axios to upload the file with progress tracking
            const response = await axios.post(CLOUDINARY_UPLOAD_URL, formData, {
                onUploadProgress: (progressEvent) => {
                    if (progressEvent.total) {
                        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        setUploadProgress(percentCompleted);
                    }
                },
            });

            // Return the secure URL of the uploaded image
            return response.data.secure_url;
        } catch (error) {
            console.error("Error uploading to Cloudinary:", error);
            throw error;
        }
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith("image/")) {
            setUploadError("Please select an image file.");
            return;
        }

        // Validate file size (e.g., max 2MB)
        const maxSize = 2 * 1024 * 1024; // 2MB
        if (file.size > maxSize) {
            setUploadError("Image size should be less than 2MB.");
            return;
        }

        setUploadingImage(true);
        setUploadError(null);
        setUploadProgress(0);

        try {
            // Upload to Cloudinary
            const imageUrl = await uploadToCloudinary(file);

            // Update form data with the Cloudinary URL
            setFormData((prev) => ({
                ...prev,
                photoUrl: imageUrl,
            }));
        } catch (error) {
            setUploadError("Failed to upload image. Please try again.");
            console.error("Upload error:", error);
        } finally {
            setUploadingImage(false);
            setUploadProgress(0);
        }
    };

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
        }

        if (!formData.headline.trim()) {
            newErrors.headline = "Headline is required";
        } else if (formData.headline.length > 100) {
            newErrors.headline = "Headline must be 100 characters or less";
        }

        if (formData.bio.length > 500) {
            newErrors.bio = "Bio must be 500 characters or less";
        }

        setFormErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);
        setSaveError(null);

        try {
            await saveProfile(formData);
            navigate("/profile/me");
        } catch (error: any) {
            setSaveError(error.response?.data?.message || "Failed to save profile. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading && !profile) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="spinner"></div>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">{profile ? "Edit Profile" : "Create Profile"}</h1>

            {saveError && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">{saveError}</div>}

            <form onSubmit={handleSubmit} className="space-y-6">
                <Input label="Name" type="text" name="name" value={formData.name} onChange={handleChange} error={formErrors.name} required />

                <Input label="Headline" type="text" name="headline" value={formData.headline} onChange={handleChange} placeholder="Software Engineer at Sadaora" error={formErrors.headline} required />

                <div className="mb-4">
                    <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                        Bio
                    </label>
                    <textarea id="bio" name="bio" rows={4} value={formData.bio} onChange={handleChange} placeholder="Tell us about yourself..." className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${formErrors.bio ? "border-red-500" : "border-gray-300"}`} />
                    {formErrors.bio && <p className="mt-1 text-sm text-red-600">{formErrors.bio}</p>}
                </div>

                {/* Avatar Upload Section */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Profile Photo</label>
                    <div className="flex items-center space-x-4">
                        <div onClick={handleAvatarClick} className="w-24 h-24 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer overflow-hidden hover:border-blue-500 transition-colors">
                            {formData.photoUrl ? (
                                <img
                                    src={formData.photoUrl}
                                    alt="Profile avatar"
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        // Handle image loading error
                                        e.currentTarget.src = "/placeholder-avatar.png"; // Replace with your placeholder
                                    }}
                                />
                            ) : uploadingImage ? (
                                <div className="text-center">
                                    <div className="w-16 h-1 bg-gray-200 rounded-full overflow-hidden">
                                        <div className="h-full bg-blue-500" style={{ width: `${uploadProgress}%` }}></div>
                                    </div>
                                    <span className="text-xs text-gray-500 mt-1">{uploadProgress}%</span>
                                </div>
                            ) : (
                                <div className="text-gray-400 text-xs text-center">Click to upload</div>
                            )}
                        </div>
                        <div className="flex-1">
                            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
                            <Button type="button" variant="secondary" onClick={handleAvatarClick} disabled={uploadingImage}>
                                {formData.photoUrl ? "Change Photo" : "Upload Photo"}
                            </Button>
                            {formData.photoUrl && (
                                <Button type="button" variant="danger" onClick={() => setFormData((prev) => ({ ...prev, photoUrl: "" }))} className="ml-2">
                                    Remove
                                </Button>
                            )}
                            <p className="text-sm text-gray-500 mt-1">Max file size: 2MB. Recommended dimensions: 200x200px.</p>
                            {uploadError && <p className="text-sm text-red-600 mt-1">{uploadError}</p>}
                        </div>
                    </div>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Interests</label>
                    <InterestTags interests={formData.interests} onChange={handleInterestsChange} />
                </div>

                <div className="flex justify-end space-x-4">
                    <Button type="button" variant="secondary" onClick={() => navigate("/profile")}>
                        Cancel
                    </Button>
                    <Button type="submit" variant="primary" isLoading={isSubmitting} disabled={isSubmitting || uploadingImage}>
                        Save Profile
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default ProfileForm;
