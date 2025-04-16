import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "danger";
    isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, variant = "primary", isLoading = false, disabled, className = "", ...props }) => {
    const baseClasses = "px-4 py-2 rounded font-medium transition-colors focus:outline-none focus:ring-2";

    const variantClasses = {
        primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-300",
        secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-300",
        danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-300",
    };

    const classes = `${baseClasses} ${variantClasses[variant]} ${className} ${disabled || isLoading ? "opacity-70 cursor-not-allowed" : ""}`;

    return (
        <button className={classes} disabled={disabled || isLoading} {...props}>
            {isLoading ? (
                <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Loading...
                </span>
            ) : (
                children
            )}
        </button>
    );
};

export default Button;
