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
  query: (data) => ({
    url: "user/reset_password",
    method: "POST",
    body: data, // should be { userId, password }
  }),
  invalidatesTags: ["User"], // better to use User not admin
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
