import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import RegisterForm from "../components/auth/RegisterForm";

const RegisterPage: React.FC = () => {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isAuthenticated) {
        return <Navigate to="/profile/edit" replace />;
    }

    return (
        <div className="max-w-md mx-auto">
            <RegisterForm />
        </div>
    );
};

export default RegisterPage;
