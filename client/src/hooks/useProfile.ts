import { useState, useEffect, useCallback } from "react";
import { Profile, ProfileFormData } from "../types/profile.types";
import { getProfile, createProfile, updateProfile, deleteProfile } from "../api/profile";

export const useProfile = (userId?: string) => {
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProfile = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getProfile(userId);
            setProfile(data.data);
        } catch (err: any) {
            setError(err.message || "Failed to fetch profile");
        } finally {
            setLoading(false);
        }
    }, [userId]);

    const saveProfile = async (profileData: ProfileFormData) => {
        setLoading(true);
        setError(null);
        try {
            let data;
            if (profile) {
                data = await updateProfile(profileData);
            } else {
                data = await createProfile(profileData);
            }
            setProfile(data);
            return data;
        } catch (err: any) {
            setError(err.message || "Failed to save profile");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const removeProfile = async () => {
        setLoading(true);
        setError(null);
        try {
            await deleteProfile();
            setProfile(null);
        } catch (err: any) {
            setError(err.message || "Failed to delete profile");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, [userId, fetchProfile]);

    return {
        profile,
        loading,
        error,
        fetchProfile,
        saveProfile,
        removeProfile,
    };
};
