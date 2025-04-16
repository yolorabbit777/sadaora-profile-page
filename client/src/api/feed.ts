import axiosInstance from "./axiosConfig";
import { FeedFilters, FeedResponse } from "../types/feed.types";

interface IFeedResponse {
    data: FeedResponse;
    success: boolean;
}

export const getFeed = async (filters: FeedFilters): Promise<IFeedResponse> => {
    const { page, limit, search } = filters;
    const response = await axiosInstance.get<IFeedResponse>("/profiles/feed", {
        params: { page, limit, search },
    });
    return response.data;
};
