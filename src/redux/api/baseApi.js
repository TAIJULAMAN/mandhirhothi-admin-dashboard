import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseUrl } from "../../config/envConfig";

// Helper function to get the auth token
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: getBaseUrl(),
    prepareHeaders: (headers, { getState }) => {
      const token = getState()?.auth?.token;
      if (token) {
        headers.set("Authorization", token);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
  tagTypes: [
    "admin",
    "dashboard",
    "user",
    "list",
    "transaction",
    "subscription",
    "termsAndConditions",
    "privacy",
    "faq",
    "notification",
    "profile",
    "location",
    "city",
    "categories",
    "auth",
  ],
});
