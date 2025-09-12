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

    getReportReplies: builder.query({
  query: ({ id, sort = "desc", take = 5, skip = 0, count = true }) =>
    `/reports/reply/${id}?sort=${sort}&take=${take}&skip=${skip}&count=${count}`,
  providesTags: ["Reports"],
}),

   sendReportReply: builder.mutation({
      query: (body) => ({
        url: "/reports/reply",
        method: "POST",
        body,
      }),
   
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
  useReportDetailsQuery,
  useGetReportRepliesQuery,
  useSendReportReplyMutation
} = getMe;
