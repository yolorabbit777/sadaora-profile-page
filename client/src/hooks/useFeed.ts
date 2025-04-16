import { useState, useEffect, useCallback } from "react";
import { FeedFilters } from "../types/feed.types";
import { Profile } from "../types/profile.types";
import { getFeed } from "../api/feed";

const DEFAULT_PAGE_SIZE = 10;

export const useFeed = (initialFilters?: Partial<FeedFilters>) => {
    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [filters, setFilters] = useState<FeedFilters>({
        page: 1,
        limit: DEFAULT_PAGE_SIZE,
        search: "",
        ...initialFilters,
    });
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [totalCount, setTotalCount] = useState<number>(0);

    const fetchFeed = useCallback(
        async (reset: boolean = false) => {
            setLoading(true);
            setError(null);
            try {
                const data = await getFeed(filters);
                console.log(data);
                setProfiles((p) => (reset ? data.data.profiles : [...p, ...data.data.profiles]));
                setHasMore(data.data.hasMore);
                setTotalCount(data.data.totalCount);
            } catch (err: any) {
                setError(err.message || "Failed to fetch feed");
            } finally {
                setLoading(false);
            }
        },
        [filters]
    );

    const loadMore = () => {
        if (!loading && hasMore) {
            setFilters((prev) => ({ ...prev, page: prev.page + 1 }));
        }
    };

    const updateFilters = (newFilters: Partial<FeedFilters>) => {
        setFilters((prev) => ({ ...prev, ...newFilters, page: 1 }));
    };

    useEffect(() => {
        fetchFeed(filters.page === 1);
    }, [filters, fetchFeed]);

    return {
        profiles,
        loading,
        error,
        hasMore,
        totalCount,
        filters,
        loadMore,
        updateFilters,
        refresh: () => fetchFeed(true),
    };
};
