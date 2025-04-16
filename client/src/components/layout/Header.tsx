import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Button from "../common/Button";

const Header: React.FC = () => {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <header className="bg-white shadow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center">
                            <Link to="/" className="text-xl font-bold text-blue-600">
                                Sadaora
                            </Link>
                        </div>
                    </div>
                    <div className="flex items-center">
                        {isAuthenticated ? (
                            <div className="flex items-center space-x-4">
                                <Link to="/feed" className="text-gray-600 hover:text-gray-900">
                                    Feed
                                </Link>
                                <Link to={`/profile/me`} className="text-gray-600 hover:text-gray-900">
                                    My Profile
                                </Link>
                                <Button variant="secondary" onClick={handleLogout}>
                                    Logout
                                </Button>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <Link to="/login" className="text-gray-600 hover:text-gray-900">
                                    Login
                                </Link>
                                <Link to="/register">
                                    <Button variant="primary">Sign Up</Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
