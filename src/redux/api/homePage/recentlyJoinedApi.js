import { baseApi } from "../baseApi";

export const recentlyJoinedApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getRecentlyJoinedUsers: builder.query({
            query: () => 'user/recently_joined_user',
        }),
    }),
    overrideExisting: false,
});

export const { useGetRecentlyJoinedUsersQuery } = recentlyJoinedApi;
