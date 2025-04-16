import React from "react";
import { Link } from "react-router-dom";
import { Profile } from "../../types/profile.types";
import { truncateText } from "../../utils/formatter";
import InterestTags from "../profile/InterestTags";

interface ProfileCardProps {
    profile: Profile;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile }) => {
    return (
        <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6">
                <div className="flex items-start">
                    {profile.photoUrl && (
                        <div className="mr-4">
                            <div className="w-16 h-16 rounded-full overflow-hidden">
                                <img
                                    src={profile.photoUrl}
                                    alt={profile.name}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        // Fallback to placeholder if image fails to load
                                        (e.target as HTMLImageElement).src = "https://via.placeholder.com/64";
                                    }}
                                />
                            </div>
                        </div>
                    )}

                    <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900">
                            <Link to={`/profile/${profile.userId}`} className="hover:underline">
                                {profile.name}
                            </Link>
                        </h3>
                        <p className="text-gray-600">{profile.headline}</p>
                    </div>
                </div>

                <div className="mt-4">
                    <p className="text-gray-700">{truncateText(profile.bio, 150)}</p>
                </div>

                <div className="mt-4">
                    <InterestTags interests={profile.interests} onChange={() => {}} readOnly />
                </div>

                <div className="mt-4">
                    <Link to={`/profile/${profile.userId}`} className="text-blue-600 hover:text-blue-800 hover:underline">
                        View Profile
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;
