import React from "react";

const ProfileCardSkeleton: React.FC = () => {
    return (
        <div className="bg-white rounded-lg shadow overflow-hidden animate-pulse">
            <div className="p-6">
                <div className="flex items-start">
                    <div className="mr-4">
                        <div className="w-16 h-16 rounded-full bg-gray-200"></div>
                    </div>

                    <div className="flex-1">
                        <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                </div>

                <div className="mt-4">
                    <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                    <div className="h-6 bg-gray-200 rounded-full w-16"></div>
                    <div className="h-6 bg-gray-200 rounded-full w-24"></div>
                    <div className="h-6 bg-gray-200 rounded-full w-20"></div>
                </div>

                <div className="mt-4">
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                </div>
            </div>
        </div>
    );
};

export default ProfileCardSkeleton;
