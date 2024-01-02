import { apiSlice } from "./apiSlice";

// const boundary = generateBoundary()

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (bulder) => ({
    profile: bulder.mutation({
      query: (Credentials) => ({
        url: "/privet/profile",
        method: "post",
        body: { ...Credentials },
      }),
    }),
    verifyPassword: bulder.mutation({
      query: (Credentials) => ({
        url: "/privet/verifypassword",
        method: "post",
        body: { ...Credentials },
      }),
    }),
    makePayment: bulder.mutation({
      query: (Credentials) => ({
        url: "/user/makepayment",
        method: "post",
        body: { ...Credentials },
      }),
    }),
    changePassword: bulder.mutation({
      query: (Credentials) => ({
        url: "/privet/changepassword",
        method: "put",
        body: { ...Credentials },
      }),
    }),
    updateProfile: bulder.mutation({
      query: (Credentials) => ({
        url: "/privet/updateProfile",
        method: "put",
        body: { ...Credentials },
      }),
    }),
    myLearnings: bulder.mutation({
      query: (Credentials) => ({
        url: `/user/mylearnings?username=${Credentials}`,
        method: "get",
      }),
    }),
    getAllBlogs: bulder.mutation({
      query: (Credentials) => ({
        url: "/getallblogs",
        method: "get",
      }),
    }),
    updateProimage: bulder.mutation({
      query: (formData) => ({
        url: "/privet/updateProimage",
        method: "PUT",
        formData: true,
        body: formData,
        credentials: "include",
      }),
      // invalidatesTags: ["Images"],
    }),
  }),
});

export const {
  useProfileMutation,
  useVerifyPasswordMutation,
  useChangePasswordMutation,
  useUpdateProfileMutation,
  useUpdateProimageMutation,
  useMakePaymentMutation,
  useSuccessPaymentMutation,
  useMyLearningsMutation,
  useGetAllBlogsMutation,
} = userApiSlice;
