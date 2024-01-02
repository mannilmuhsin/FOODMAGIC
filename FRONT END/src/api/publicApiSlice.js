import { apiSlice } from "./apiSlice";

export const publicApiSlice = apiSlice.injectEndpoints({
  endpoints: (bulder) => ({
    getFullCourses: bulder.mutation({
      query: (Credentials) => ({
        url: "/courses",
        method: "get",
      }),
    }),
    getFullCommunitys: bulder.mutation({
      query: (Credentials) => ({
        url: "/communitys",
        method: "get",
      }),
    }),
    getCourseById: bulder.mutation({
      query: (Credentials) => ({
        url: `/getcourseById?id=${Credentials}`,
        method: "get",
      }),
    }),
    addReview: bulder.mutation({
      query: (Credentials) => ({
        url: "/privet/addreview",
        method: "post",
        body: { ...Credentials },
      }),
    }),
    getAllCategorys: bulder.mutation({
      query: (Credentials) => ({
        url: "/getcategorys",
        method: "get",
      }),
    }),
    getusers: bulder.mutation({
      query: (Credentials) => ({
        url: `/getusers?role=${Credentials}`,
        method: "get",
      }),
    }),
    getCommunityById: bulder.mutation({
      query: (Credentials) => ({
        url: `/getcommunityById/${Credentials}`,
        method: "get",
      }),
    }),
  }),
});

export const {
  useGetFullCoursesMutation,
  useGetCourseByIdMutation,
  useGetFullCommunitysMutation,
  useGetCommunityByIdMutation,
  useAddReviewMutation,
  useGetAllCategorysMutation,
  useGetusersMutation
} = publicApiSlice;
