import { baseApi } from "./baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    logIn: builder.mutation({
      query: (data) => {
        return {
          url: "auth/login_user",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["admin"],
    }),
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: "user/forgot_password",
        method: "POST",
        body: data,
      }),
    }),
    verifyEmail: builder.mutation({
      query: (data) => ({
        url: "user/verification_forgot_user",
        method: "POST",
        body: data,
      }),
    }),
    
resetPassword: builder.mutation({
  query: ({ userId, password }) => {
    const token = localStorage.getItem("accessToken");
    return {
      url: "user/reset_password",
      method: "POST",
      body: { userId, password },
      headers: {
        Authorization: `${token}`,
      },
    };
  },
  invalidatesTags: ["User"],
}),
    
}),
});

export const {
  useLogInMutation,
  useForgotPasswordMutation,
  useVerifyEmailMutation,
  useResetPasswordMutation,

} = authApi;

export default authApi;
