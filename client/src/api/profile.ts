import axiosInstance from "./axiosConfig";
import { Profile, ProfileFormData } from "../types/profile.types";

interface IProfileResponse {
    data: Profile;
    success: boolean;
}

export const getProfile = async (userId?: string): Promise<IProfileResponse> => {
    const url = userId ? `/profiles/${userId}` : "/profiles/me";
    const response = await axiosInstance.get<IProfileResponse>(url);
    return response.data;
};

export const createProfile = async (profileData: ProfileFormData): Promise<Profile> => {
    const response = await axiosInstance.post<Profile>("/profiles", profileData);
    return response.data;
};

export const updateProfile = async (profileData: ProfileFormData): Promise<Profile> => {
    const response = await axiosInstance.put<Profile>("/profiles/me", profileData);
    return response.data;
};

export const deleteProfile = async (): Promise<void> => {
    await axiosInstance.delete("/profiles/me");
};
