import { baseApi } from "../baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Subscription Earning
    getSubscriptionEarning: builder.query({
      query: () => ({
        url: "payment_gateway/period_ways_earning",
        method: "GET",
      }),
      providesTags: ["subscriptionEarning"],
    }),
    // Get all subs 
    getPlateSellPayments: builder.query({
      query: ({ page = 1, limit = 10 } = {}) => ({
        url: `payment_gateway/find_by_buyer_seller_all_payment?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["plateSellPayments"],
    }),
  }),
});

export const { useGetSubscriptionEarningQuery,  } = authApi;

export default authApi;
