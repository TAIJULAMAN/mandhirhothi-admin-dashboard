import { baseApi } from "./baseApi";

export const manageSubscriptionApi = baseApi.injectEndpoints({
          endpoints: (builder) => ({
                    getAllSubscription: builder.query({
                              query: () => ({
                                        url: "subscription/findB_by_specific_subscription/68a3a0495f80907c52164597",
                                        method: "GET",
                              }),
                              providesTags: ["subscription"],
                    }),
                    updateSubscription: builder.mutation({
                              query: (data) => ({
                                        url: "subscription/update_subscription/68a3a0495f80907c52164597",
                                        method: "PATCH",
                                        body: data
                              }),
                              invalidatesTags: ["subscription"],
                    }),
          }),
});

export const {
          useGetAllSubscriptionQuery,
          useUpdateSubscriptionMutation,
} = manageSubscriptionApi;