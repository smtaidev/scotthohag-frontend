import { UserProfile } from "@/interfaces/global";
import baseApi from "../baseApi";

export const getMe = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // need to add types
    getMe: builder.query({
      query: () => "/auth/me",
      providesTags: ["User","Plan"],
    }),

       getSignedUrl: builder.query({
      query: ({ fileType, mimeType }) => ({
        url: `/uploads?fileType=${fileType}&mimeType=${mimeType}`,
        method: 'GET',
      }),
    }),

       updateProfile: builder.mutation({
      query: (body) => ({
        url: "/auth/me",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { 
  useGetMeQuery,
  useUpdateProfileMutation,
  useGetSignedUrlQuery
 } = getMe;
