import React from "react";

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-100 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex justify-between items-center">
                    <div>
                        <p className="text-gray-500 text-sm">© {new Date().getFullYear()} Sadaora. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
