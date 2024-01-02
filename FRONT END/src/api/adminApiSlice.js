import { apiSlice } from "./apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (bulder) => ({
    adminprofile: bulder.mutation({
      query: (Credentials) => ({
        url: "/admin/profile",
        method: "post",
        body: { ...Credentials },
      }),
    }),
    getusers: bulder.mutation({
      query: (Credentials) => ({
        url: `/privet/getusers?role=${Credentials}`,
        method: "get",
      }),
    }),
    getAllPayments: bulder.mutation({
      query: (Credentials) => ({
        url: "/privet/getpayments",
        method: "get",
      }),
    }),
    // getAllCategorys: bulder.mutation({
    //   query: (Credentials) => ({
    //     url: "/privet/getcategorys",
    //     method: "get",
    //   }),
    // }),
    handleaccess: bulder.mutation({
      query: (Credentials) => ({
        url: "/admin/handleaccess",
        method: "put",
        body: { ...Credentials },
      }),
    }),
    handlePaymentOfChef: bulder.mutation({
      query: (Credentials) => ({
        url: "/admin/handlePaymentOfChef",
        method: "put",
        body: { ...Credentials },
      }),
    }),
    addCatogery: bulder.mutation({
      query: (formData) => ({
        url: "/admin/addcatogery",
        method: "post",
        formData: true,
        body: formData,
        credentials: "include",
      }),
    }),
    changeImage: bulder.mutation({
      query: (formData) => ({
        url: "/admin/changeimage",
        method: "post",
        formData: true,
        body: formData,
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useAdminprofileMutation,
  useHandleaccessMutation,
  // useGetusersMutation,
  useGetAllPaymentsMutation,
  useHandlePaymentOfChefMutation,
  useAddCatogeryMutation,
  useChangeImageMutation,
} = userApiSlice;
// useGetAllCategorysMutation,
