import { baseApi } from "../baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Plates Sales Earning
    getEarningsStats: builder.query({
      query: () => ({
        url: "payment_gateway/period_ways_plates_sales_earning",
        method: "GET",
      }),
      providesTags: ["earningsStats"],
    }),

    // Subscription Earning
    getSubscriptionEarning: builder.query({
      query: () => ({
        url: "payment_gateway/period_ways_earning",
        method: "GET",
      }),
      providesTags: ["subscriptionEarning"],
    }),
  }),
});

export const {
  useGetEarningsStatsQuery,
  useGetSubscriptionEarningQuery,
} = authApi;

export default authApi;
