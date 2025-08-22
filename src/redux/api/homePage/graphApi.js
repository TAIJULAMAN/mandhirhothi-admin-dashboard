import { baseApi } from "../baseApi";

const graphApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getUserGrowthByYear: builder.query({
            query: (year) => {
                const currentYear = new Date().getFullYear();
                return {
                    url: `user/find_by_user_growth?year=${year || currentYear}`,
                    method: "GET",
                };
            },
            providesTags: ["userGrowthByYear"],
        }),
    }),
});

export const {
    useGetUserGrowthByYearQuery,
} = graphApi;

export default graphApi;
