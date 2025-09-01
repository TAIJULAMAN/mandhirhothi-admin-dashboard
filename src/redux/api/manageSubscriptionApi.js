// redux/api/manageSubscriptionApi.js
import { baseApi } from "./baseApi";

export const manageSubscriptionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSubscription: builder.query({
      query: () => ({
        url: "subscription/find_all_buyer_subscription",
        method: "GET",
      }),
      providesTags: ["subscription"],
    }),
    updateSubscription: builder.mutation({
      query: ({ id, data }) => ({
        url: `subscription/update_subscription/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["subscription"],
    }),
  }),
});

export const { useGetAllSubscriptionQuery, useUpdateSubscriptionMutation } =
  manageSubscriptionApi;
