import { apiSlice } from "./apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (bulder) => ({
    login: bulder.mutation({
      query: (Credentials) => ({
        url: "/user/login",
        method: "post",
        body: { ...Credentials },
      }),
    }),
    cheflogin: bulder.mutation({
      query: (Credentials) => ({
        url: "/chef/login",
        method: "post",
        body: { ...Credentials },
      }),
    }),
  }),
});

export const { useLoginMutation, useGetUsersMutation, useChefloginMutation } =
  authApiSlice;
