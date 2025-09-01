import { baseApi } from "../baseApi";

const statsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // Total User & Total Revenue
        getTotalUserTotalRevenue: builder.query({
            query: () => ({
                url: "payment_gateway/find_by_total_user_total_revenue",
                method: "GET",
            }),
            providesTags: ["totalUserTotalRevenue"],
        }),
    }),
});

export const {
    useGetTotalUserTotalRevenueQuery,
} = statsApi;

export default statsApi;