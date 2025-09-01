import { baseApi } from "../baseApi";

const plateSellApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // Get all payments by buyer/seller
        getPlateSellPayments: builder.query({
            query: ({ page = 1, limit = 10 } = {}) => ({
                url: `payment_gateway/find_by_buyer_seller_all_payment?page=${page}&limit=${limit}`,
                method: "GET",
            }),
            providesTags: ["plateSellPayments"],
        }),
    }),
});

export const {
    useGetPlateSellPaymentsQuery,
} = plateSellApi;

export default plateSellApi;