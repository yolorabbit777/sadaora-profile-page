import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useProfile } from "../../hooks/useProfile";
import { formatDate } from "../../utils/formatter";
import Button from "../common/Button";
import InterestTags from "./InterestTags";

interface ProfileViewProps {
    userId?: string; // If not provided, displays the current user's profile
}

const ProfileView: React.FC<ProfileViewProps> = ({ userId }) => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { profile, loading, error, removeProfile } = useProfile(userId);

    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);

    const isOwnProfile = !userId || (user && user.id === profile?.userId);

    const handleEdit = () => {
        navigate("/profile/edit");
    };

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            await removeProfile();
            navigate("/feed");
        } catch (error) {
            console.error("Failed to delete profile:", error);
            setIsDeleting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="spinner"></div>
            </div>
        );
    }

    if (error) {
        return <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">{error}</div>;
    }

    if (!profile) {
        return (
            <div className="text-center py-12 px-4">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Profile Not Found</h2>
                {isOwnProfile && (
                    <div>
                        <p className="mb-6 text-gray-600">You don't have a profile yet. Create one to get started!</p>
                        <Button onClick={() => navigate("/profile/edit")}>Create Profile</Button>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto">
            <div className="bg-white shadow overflow-hidden rounded-lg">
                <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">{profile.name}</h2>
                        <p className="mt-1 text-sm text-gray-500">{profile.headline}</p>
                    </div>
                    {isOwnProfile && (
                        <div className="flex space-x-2">
                            <Button variant="secondary" onClick={handleEdit}>
                                Edit Profile
                            </Button>
                            <Button variant="danger" onClick={() => setShowDeleteConfirm(true)}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>

                <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                    <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-4">
                        {profile.photoUrl && (
                            <div className="sm:col-span-1">
                                <div className="w-32 h-32 rounded-full overflow-hidden">
                                    <img
                                        src={profile.photoUrl}
                                        alt={profile.name}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            // Fallback to placeholder if image fails to load
                                            (e.target as HTMLImageElement).src = "https://via.placeholder.com/128";
                                        }}
                                    />
                                </div>
                            </div>
                        )}

                        <div className={profile.photoUrl ? "sm:col-span-3" : "sm:col-span-4"}>
                            <div className="mb-6">
                                <h3 className="text-lg font-medium text-gray-900">About</h3>
                                <p className="mt-1 text-gray-600 whitespace-pre-wrap">{profile.bio || "No bio provided."}</p>
                            </div>

                            <div className="mb-6">
                                <h3 className="text-lg font-medium text-gray-900">Interests</h3>
                                <div className="mt-2">
                                    <InterestTags interests={profile.interests} onChange={() => {}} readOnly />
                                </div>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">Member since {formatDate(profile.createdAt)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {showDeleteConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Delete Profile</h3>
                        <p className="text-gray-600 mb-6">Are you sure you want to delete your profile? This action cannot be undone.</p>
                        <div className="flex justify-end space-x-4">
                            <Button variant="secondary" onClick={() => setShowDeleteConfirm(false)} disabled={isDeleting}>
                                Cancel
                            </Button>
                            <Button variant="danger" onClick={handleDelete} isLoading={isDeleting} disabled={isDeleting}>
                                Delete Profile
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfileView;
