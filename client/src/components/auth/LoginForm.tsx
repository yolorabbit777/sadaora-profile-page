import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginCredentials } from "../../types/auth.types";
import { useAuth } from "../../hooks/useAuth";
import { validateEmail, validatePassword } from "../../utils/validation";
import Input from "../common/Input";
import Button from "../common/Button";

const LoginForm: React.FC = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [credentials, setCredentials] = useState<LoginCredentials>({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [loginError, setLoginError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCredentials((prev) => ({ ...prev, [name]: value }));

        // Clear errors when user starts typing
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }

        // Clear general login error when user changes any field
        if (loginError) {
            setLoginError(null);
        }
    };

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (!validateEmail(credentials.email)) {
            newErrors.email = "Please enter a valid email address";
        }

        if (!validatePassword(credentials.password)) {
            newErrors.password = "Password must be at least 6 characters";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);
        setLoginError(null);

        try {
            await login(credentials);
            navigate("/feed");
        } catch (error: any) {
            setLoginError(error.response?.data?.message || "Login failed. Please check your credentials.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-2xl font-bold text-center">Log In</h2>

            {loginError && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">{loginError}</div>}

            <Input label="Email" type="email" name="email" value={credentials.email} onChange={handleChange} placeholder="you@example.com" error={errors.email} required />

            <Input label="Password" type="password" name="password" value={credentials.password} onChange={handleChange} placeholder="••••••••" error={errors.password} required />

            <Button type="submit" variant="primary" isLoading={isSubmitting} disabled={isSubmitting} className="w-full">
                Log In
            </Button>

            <div className="text-center mt-4">
                <p>
                    Don't have an account?{" "}
                    <a href="/register" className="text-blue-600 hover:underline">
                        Sign up
                    </a>
                </p>
            </div>
        </form>
    );
};

export default LoginForm;
