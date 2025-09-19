import { baseApi } from "../baseApi";

const plateSellApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // Get all payments by buyer/seller
        getPlateSellPayments: builder.query({
            query: ({ page = 1, limit = 2, searchTerm } = {}) => ({
                url: `payment_gateway/find_by_buyer_seller_all_payment`,
                method: "GET",
                params: {
                  page,
                  limit,
                  searchTerm,
                  ...(searchTerm ? { searchTerm } : {}),
                },
            }),
            providesTags: ["plateSellPayments"],
        }),
    }),
});

export const {
    useGetPlateSellPaymentsQuery,
} = plateSellApi;

export default plateSellApi;