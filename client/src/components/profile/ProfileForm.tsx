import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../../hooks/useProfile";
import { ProfileFormData } from "../../types/profile.types";
import Input from "../common/Input";
import Button from "../common/Button";
import InterestTags from "./InterestTags";

const ProfileForm: React.FC = () => {
    const navigate = useNavigate();
    const { profile, loading, saveProfile } = useProfile();

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

                <Input label="Profile Photo URL" type="url" name="photoUrl" value={formData.photoUrl} onChange={handleChange} placeholder="https://example.com/photo.jpg" error={formErrors.photoUrl} />

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Interests</label>
                    <InterestTags interests={formData.interests} onChange={handleInterestsChange} />
                </div>

                <div className="flex justify-end space-x-4">
                    <Button type="button" variant="secondary" onClick={() => navigate("/profile")}>
                        Cancel
                    </Button>
                    <Button type="submit" variant="primary" isLoading={isSubmitting} disabled={isSubmitting}>
                        Save Profile
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default ProfileForm;
