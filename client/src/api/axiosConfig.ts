import axios from "axios";
import { getToken } from "../utils/tokenStorage";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5050";

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Add a request interceptor to add the auth token to every request
axiosInstance.interceptors.request.use(
    (config: any) => {
        const token = getToken();
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error: any) => Promise.reject(error)
);

export default axiosInstance;
