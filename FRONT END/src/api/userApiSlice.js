import { apiSlice } from "./apiSlice"

// const boundary = generateBoundary()

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints:bulder =>({
        profile:bulder.mutation({
            query:Credentials =>({
                url:'/user/profile',
                method:'post',
                body:{...Credentials}
            })
        }),
        verifyPassword:bulder.mutation({
            query:Credentials =>({
                url:'/user/verifypassword',
                method:'post',
                body:{...Credentials}
            })
        }),
        makePayment:bulder.mutation({
            query:Credentials =>({
                url:'/user/makepayment',
                method:'post',
                body:{...Credentials}
            })
        }),
        changePassword:bulder.mutation({
            query:Credentials =>({
                url:'/user/changepassword',
                method:'put',
                body:{...Credentials}
            })
        }),
        updateProfile:bulder.mutation({
            query:Credentials =>({
                url:'/user/updateProfile',
                method:'put',
                body:{...Credentials}
            })
        }),
        myLearnings:bulder.mutation({
            query:Credentials =>({
                url:`/user/mylearnings?username=${Credentials}`,
                method:'get',
            })
        }),
        updateProimage: bulder.mutation({
            query: (formData) => ({
              url: '/user/updateProimage',
              method: 'PUT',
              formData:true,
              body:formData,
              credentials:'include'
              
            }),
            // invalidatesTags: ["Images"],
          }),
       
    })
})

export const {
   useProfileMutation,
   useVerifyPasswordMutation,
   useChangePasswordMutation,
   useUpdateProfileMutation,
   useUpdateProimageMutation,
   useMakePaymentMutation,
   useSuccessPaymentMutation,
   useMyLearningsMutation
} = userApiSlice