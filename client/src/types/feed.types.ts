import { Profile } from "./profile.types";

export interface FeedFilters {
    page: number;
    limit: number;
    search?: string;
}

export interface FeedResponse {
    profiles: Profile[];
    totalCount: number;
    hasMore: boolean;
}
