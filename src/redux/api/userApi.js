import { baseApi } from "./baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUser: builder.query({
      query: (params) => ({
        url: "auth/find_by_admin_all_users",
        method: "GET",
        params: {
          ...params,
        },
      }),
      providesTags: ["user"],
    }),
    updateUser: builder.mutation({
      query: ({ id }) => ({
        url: `/auth/block/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["user"],
    }),
    getSingleUser: builder.query({
      query: ({ user }) => ({
        url: `product/admin-get-all`,
        method: "GET",
        params: {
          user,
        },
      }),
      providesTags: ["user"],
    }),
    changeStatus: builder.mutation({
      query: (data) => ({
        url: `auth/change_status/${data?.id}`,
        method: "PATCH",
        body: data.status,
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useGetAllUserQuery,
  useUpdateUserMutation,
  useGetSingleUserQuery,
  useChangeStatusMutation,
} = userApi;
