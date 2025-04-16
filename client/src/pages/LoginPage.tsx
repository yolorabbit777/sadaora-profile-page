import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import LoginForm from "../components/auth/LoginForm";

const LoginPage: React.FC = () => {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isAuthenticated) {
        return <Navigate to="/feed" replace />;
    }

    return (
        <div className="max-w-md mx-auto">
            <LoginForm />
        </div>
    );
};

export default LoginPage;
