import baseApi from "../baseApi";

export const allPlans = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // need to add types
    getMyPlan: builder.query({
      query: () => "/subscriptions/plan",
     providesTags:['Plan']
    }),

  updatePlan: builder.mutation({
      query: (body) => ({
        url: "/subscriptions/plan",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Plan"],
    }),
  createSubscription: builder.mutation({
      query: (body) => ({
        url: "/subscriptions",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Plan"],
    }),

  cancelSubscription: builder.mutation({
      query: () => ({
        url: "/subscriptions",
        method: "DELETE",
      }),
      invalidatesTags: ["Plan"],
    }),


   
  }),
});

export const { 
  useGetMyPlanQuery,
 useUpdatePlanMutation,
 useCreateSubscriptionMutation,
 useCancelSubscriptionMutation
 } = allPlans;
