import axiosInstance from "./axiosConfig";
import { LoginCredentials, RegisterCredentials, AuthResponse } from "../types/auth.types";

export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await axiosInstance.post<AuthResponse>("/auth/login", credentials);
    return response.data;
};

export const register = async (credentials: RegisterCredentials): Promise<AuthResponse> => {
    const response = await axiosInstance.post<AuthResponse>("/auth/register", credentials);
    return response.data;
};

export const getCurrentUser = async (): Promise<AuthResponse["user"]> => {
    const response = await axiosInstance.get<AuthResponse["user"]>("/auth/me");
    return response.data;
};
