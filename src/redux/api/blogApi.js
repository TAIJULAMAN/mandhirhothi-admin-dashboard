import { baseApi } from "./baseApi";

export const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Create blog (supports FormData for file upload)
    createBlog: builder.mutation({
      query: (formData) => ({
        url: "blogs/create_blogs",
        method: "POST",
        body: formData, // should be FormData, not JSON
      }),
      invalidatesTags: ["blog"],
    }),

    // Get all blogs
    getAllBlogs: builder.query({
      query: (params) => ({
        url: "blogs/find_by_all_blogs",
        method: "GET",
        params,
      }),
      providesTags: ["blog"],
    }),

    // Optionally: get single blog
    getSingleBlog: builder.query({
      query: (id) => ({
        url: `blogs/${id}`,
        method: "GET",
      }),
      providesTags: ["blog"],
    }),

    // Optionally: update blog
    updateBlog: builder.mutation({
      query: ({ id, formData }) => ({
        url: `blogs/update_blog/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["blog"],
    }),

    // Optionally: delete blog
    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `blogs/delete_blogs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["blog"],
    }),
  }),
});

export const {
  useCreateBlogMutation,
  useGetAllBlogsQuery,
  useGetSingleBlogQuery,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = blogApi;
