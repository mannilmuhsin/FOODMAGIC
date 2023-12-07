import { apiSlice } from "./apiSlice"

export const publicApiSlice = apiSlice.injectEndpoints({
    endpoints:bulder =>({
        getFullCourses:bulder.mutation({
            query:Credentials =>({
                url:'/courses',
                method:'get',
            })
        }),
        getCourseById:bulder.mutation({
            query:Credentials =>({
                url:`/getcourseById?id=${Credentials}`,
                method:'get',
            })
        }),
    
    
    })
})

export const {
   useGetFullCoursesMutation,
   useGetCourseByIdMutation
} = publicApiSlice