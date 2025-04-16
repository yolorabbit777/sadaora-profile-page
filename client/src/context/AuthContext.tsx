import React, { createContext, useState, useEffect, ReactNode } from "react";
import { AuthContextType, AuthUser, LoginCredentials, RegisterCredentials } from "../types/auth.types";
import { login as apiLogin, register as apiRegister, getCurrentUser } from "../api/auth";
import { saveToken, saveUser, getToken, getUser, clearAuth } from "../utils/tokenStorage";

const defaultAuthContext: AuthContextType = {
    user: null,
    isAuthenticated: false,
    isLoading: true,
    login: async () => {},
    register: async () => {},
    logout: () => {},
};

export const AuthContext = createContext<AuthContextType>(defaultAuthContext);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const initAuth = async () => {
            const token = getToken();
            if (token) {
                try {
                    const userData = await getCurrentUser();
                    setUser(userData);
                } catch (error) {
                    console.error("Failed to get current user:", error);
                    clearAuth();
                }
            }
            setIsLoading(false);
        };

        initAuth();
    }, []);

    const login = async (credentials: LoginCredentials) => {
        setIsLoading(true);
        try {
            const response = await apiLogin(credentials);
            saveToken(response.token);
            saveUser(response.user);
            setUser(response.user);
        } catch (error) {
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (credentials: RegisterCredentials) => {
        setIsLoading(true);
        try {
            const response = await apiRegister(credentials);
            saveToken(response.token);
            saveUser(response.user);
            setUser(response.user);
        } catch (error) {
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        clearAuth();
        setUser(null);
    };

    const authContextValue: AuthContextType = {
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
    };

    return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
};
