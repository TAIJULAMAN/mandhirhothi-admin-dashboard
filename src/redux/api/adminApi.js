import { baseApi } from "./baseApi";

export const adminApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // Create user
        createAdmin: builder.mutation({
            query: (userData) => ({
                url: "user/create_user",
                method: "POST",
                body: userData, // expects JSON
            }),
            invalidatesTags: ["admin"],
        }),
        // Get all admins with pagination
        getAllAdmins: builder.query({
            query: ({ limit = 10, page = 1 } = {}) =>
            `auth/find_by_all_admin?limit=${limit}&page=${page}`,
            providesTags: ["admin"],
        }),
        // Delete admin
        deleteAdmin: builder.mutation({
            query: (id) => ({
                url: `user/delete_user/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["admin"],
        }),
    }),
});
export const {
    useCreateAdminMutation,
    useGetAllAdminsQuery,
    useDeleteAdminMutation,
} = adminApi;

export default adminApi;