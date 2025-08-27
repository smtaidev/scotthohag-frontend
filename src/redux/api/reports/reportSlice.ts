import { UserProfile } from "@/interfaces/global";
import baseApi from "../baseApi";

export const getMe = baseApi.injectEndpoints({
  endpoints: (builder) => ({


       reportSubmit: builder.mutation({
      query: (body) => ({
        url: "/reports",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { 
useReportSubmitMutation
 } = getMe;
