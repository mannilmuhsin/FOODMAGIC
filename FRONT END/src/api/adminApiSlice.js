import { apiSlice } from "./apiSlice"

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints:bulder =>({
        adminprofile:bulder.mutation({
            query:Credentials =>({
                url:'/admin/profile',
                method:'post',
                body:{...Credentials}
            })
        }),
        getusers:bulder.mutation({
            query:Credentials =>({
                url:`/admin/getusers?role=${Credentials}`,
                method:'get',
            })
        }),
        getAllPayments:bulder.mutation({
            query:Credentials =>({
                url:'/admin/getpayments',
                method:'get',
            })
        }),
        handleaccess:bulder.mutation({
            query:Credentials =>({
                url:'/admin/handleaccess',
                method:'put',
                body:{...Credentials}
            })
        }),
        handlePaymentOfChef:bulder.mutation({
            query:Credentials =>({
                url:'/admin/handlePaymentOfChef',
                method:'put',
                body:{...Credentials}
            })
        }),
       
    })
})

export const {
   useAdminprofileMutation,
   useHandleaccessMutation,
   useGetusersMutation,
   useGetAllPaymentsMutation,
   useHandlePaymentOfChefMutation
} = userApiSlice