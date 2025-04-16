import React from "react";
import FeedList from "../components/feed/FeedList";

const FeedPage: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Discover People</h1>
            <FeedList />
        </div>
    );
};

export default FeedPage;
