import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RegisterCredentials } from "../../types/auth.types";
import { useAuth } from "../../hooks/useAuth";
import { validateEmail, validatePassword, validateName } from "../../utils/validation";
import Input from "../common/Input";
import Button from "../common/Button";

const RegisterForm: React.FC = () => {
    const navigate = useNavigate();
    const { register } = useAuth();
    const [credentials, setCredentials] = useState<RegisterCredentials>({
        name: "",
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [registerError, setRegisterError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCredentials((prev) => ({ ...prev, [name]: value }));

        // Clear errors when user starts typing
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }

        // Clear general register error when user changes any field
        if (registerError) {
            setRegisterError(null);
        }
    };

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (!validateName(credentials.name)) {
            newErrors.name = "Name must be at least 2 characters";
        }

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
        setRegisterError(null);

        try {
            await register(credentials);
            navigate("/profile/edit");
        } catch (error: any) {
            setRegisterError(error.response?.data?.message || "Registration failed. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-2xl font-bold text-center">Create an Account</h2>

            {registerError && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">{registerError}</div>}

            <Input label="Full Name" type="text" name="name" value={credentials.name} onChange={handleChange} placeholder="John Doe" error={errors.name} required />

            <Input label="Email" type="email" name="email" value={credentials.email} onChange={handleChange} placeholder="you@example.com" error={errors.email} required />

            <Input label="Password" type="password" name="password" value={credentials.password} onChange={handleChange} placeholder="••••••••" error={errors.password} required />

            <Button type="submit" variant="primary" isLoading={isSubmitting} disabled={isSubmitting} className="w-full">
                Sign Up
            </Button>

            <div className="text-center mt-4">
                <p>
                    Already have an account?{" "}
                    <a href="/login" className="text-blue-600 hover:underline">
                        Log in
                    </a>
                </p>
            </div>
        </form>
    );
};

export default RegisterForm;
