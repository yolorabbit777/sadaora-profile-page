import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/common/Button";

const NotFoundPage: React.FC = () => {
    return (
        <div className="text-center py-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">Page Not Found</h2>
            <p className="text-gray-600 mb-8">The page you are looking for doesn't exist or has been moved.</p>
            <Link to="/">
                <Button variant="primary">Go to Home</Button>
            </Link>
        </div>
    );
};

export default NotFoundPage;
