import React from "react";
import { useParams } from "react-router-dom";
import ProfileView from "../components/profile/ProfileView";
import { useAuth } from "../hooks/useAuth";

const ProfilePage: React.FC = () => {
    const { userId } = useParams<{ userId?: string }>();
    const { user, isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <></>;
    }

    return <ProfileView userId={userId ? userId : user!.id} />;
};

export default ProfilePage;
