import { UserProfile } from "@/interfaces/global";
import baseApi from "../baseApi";

export const getMe = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // need to add types
    getAllReports: builder.query({
      query: (params = {}) => {
        const searchParams = new URLSearchParams();

        // Add all parameters to the query string
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            searchParams.append(key, String(value));
          }
        });

        const queryString = searchParams.toString();
        return `/reports${queryString ? `?${queryString}` : ""}`;
      },
      providesTags:["Reports"]
    }),

    reportSubmit: builder.mutation({
      query: (body) => ({
        url: "/reports",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User","Reports"],
    }),

    reportDetails: builder.query({
      query: (id) => ({
        url: `/reports/${id}`,
        method: "GET",
      }),
      
    }),
  }),
});

export const {
  useReportSubmitMutation,
  useGetAllReportsQuery,
  useReportDetailsQuery
} = getMe;
