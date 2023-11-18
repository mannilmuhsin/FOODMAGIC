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
        getstudents:bulder.mutation({
            query:Credentials =>({
                url:'/admin/getstudents',
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
       
    })
})

export const {
   useAdminprofileMutation,
   useGetstudentsMutation,
   useHandleaccessMutation
} = userApiSlice