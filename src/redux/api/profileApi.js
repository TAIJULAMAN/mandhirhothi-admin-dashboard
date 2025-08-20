import { baseApi } from "./baseApi";

const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => ({
        url: `auth/myprofile`,
        method: "GET",
      }),
      providesTags: ["profile"],
    }),
    getAdminProfile: builder.query({
      query: () => ({
        url: "auth/profile",
        method: "GET",
      }),
      providesTags: ["profile"],
    }),
    updateProfile: builder.mutation({
      query: (formData) => ({
        url: "auth/update_my_profile",
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["profile"],
    }),
    changeAdminPassword: builder.mutation({
      query: (data) => ({
        url: "auth/change-password",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetProfileQuery,
  useGetAdminProfileQuery,
  useUpdateProfileMutation,
  useChangeAdminPasswordMutation,
} = profileApi;
