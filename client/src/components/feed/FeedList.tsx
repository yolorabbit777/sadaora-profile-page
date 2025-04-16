import React, { useRef, useCallback } from "react";
import { useFeed } from "../../hooks/useFeed";
import { useAuth } from "../../hooks/useAuth";
import ProfileCard from "./ProfileCard";
import ProfileCardSkeleton from "./ProfileCardSkeleton";

const FeedList: React.FC = () => {
    const { user } = useAuth();
    const { profiles, loading, error, hasMore, filters, loadMore, updateFilters } = useFeed({
        page: 1,
        limit: 10,
    });

    // Setup infinite scrolling with intersection observer
    const observer = useRef<IntersectionObserver | null>(null);
    const lastProfileRef = useCallback(
        (node: HTMLDivElement | null) => {
            if (loading) return;
            if (observer.current) observer.current.disconnect();

            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    loadMore();
                }
            });

            if (node) observer.current.observe(node);
        },
        [loading, hasMore, loadMore]
    );

    console.log(profiles);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateFilters({ search: e.target.value, page: 1 });
    };

    return (
        <div>
            <div className="mb-6">
                <input type="text" placeholder="Search profiles..." value={filters.search || ""} onChange={handleSearch} className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">{error}</div>}

            {profiles && profiles.length === 0 && !loading && (
                <div className="text-center py-12">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No profiles found</h3>
                    <p className="text-gray-600">{filters.search ? `No results for "${filters.search}"` : "There are no other users yet. Invite some friends!"}</p>
                </div>
            )}

            <div className="space-y-6">
                {profiles &&
                    profiles
                        .filter((profile) => profile.userId !== user?.id) // Filter out current user's profile
                        .map((profile, index) => {
                            const isLastProfile = index === profiles.length - 1;

                            return isLastProfile ? (
                                <div key={profile.id} ref={lastProfileRef}>
                                    <ProfileCard profile={profile} />
                                </div>
                            ) : (
                                <div key={profile.id}>
                                    <ProfileCard profile={profile} />
                                </div>
                            );
                        })}

                {loading && Array.from({ length: 3 }).map((_, index) => <ProfileCardSkeleton key={`skeleton-${index}`} />)}
            </div>
        </div>
    );
};

export default FeedList;
