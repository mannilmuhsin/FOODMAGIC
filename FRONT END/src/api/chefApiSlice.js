import { apiSlice } from "./apiSlice";

export const chefApiSlice = apiSlice.injectEndpoints({
  endpoints: (bulder) => ({
    addcourse: bulder.mutation({
      query: (formData) => ({
        url: "/chef/addcourse",
        method: "post",
        formData: true,
        body: formData,
        credentials: "include",
      }),
    }),
    editcourse: bulder.mutation({
      query: (Credentials) => ({
        url: "/chef/editcourse",
        method: "post",
        formData: true,
        body: {...Credentials},
        credentials: "include",
      }),
    }),
    addchapter: bulder.mutation({
      query: (formData) => ({
        url: "/chef/addchapter",
        method: "post",
        formData: true,
        body: formData,
        credentials: "include",
      }),
    }),
    addblog: bulder.mutation({
      query: (formData) => ({
        url: "/privet/addblog",
        method: "post",
        formData: true,
        body: formData,
        credentials: "include",
      }),
    }),
    chefsCours: bulder.mutation({
      query: (Credentials) => ({
        url: `/chef/addcourse?user=${Credentials}`,
        method: "get",
      }),
    }),
    getCours: bulder.mutation({
      query: (Credentials) => ({
        url: `/chef/getcourse?id=${Credentials}`,
        method: "get",
      }),
    }),
    getPayments: bulder.mutation({
      query: (Credentials) => ({
        url: `/chef/getpayments?chef_id=${Credentials}`,
        method: "get",
      }),
    }),
    deleteCours: bulder.mutation({
      query: (Credentials) => ({
        url: `/chef/deletecourse/${Credentials}`,
        method: "delete",
      }),
    }),
    deleteChapter: bulder.mutation({
      query: (Credentials) => ({
        url: "/chef/deletechapter",
        method: "put",
        body: { ...Credentials },
      }),
    }),
    handleShowCourse: bulder.mutation({
      query: (Credentials) => ({
        url: "/chef/handleshowcourse",
        method: "put",
        body: { ...Credentials },
      }),
    }),
  }),
});

export const {
  useAddcourseMutation,
  useChefsCoursMutation,
  useGetCoursMutation,
  useHandleShowCourseMutation,
  useDeleteCoursMutation,
  useAddchapterMutation,
  useDeleteChapterMutation,
  useGetPaymentsMutation,
  useAddblogMutation,
  useEditcourseMutation
} = chefApiSlice;
