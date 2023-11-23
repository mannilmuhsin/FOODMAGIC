import { apiSlice } from "./apiSlice"

export const publicApiSlice = apiSlice.injectEndpoints({
    endpoints:bulder =>({
        getFullCourses:bulder.mutation({
            query:Credentials =>({
                url:'/courses',
                method:'get',
            })
        }),
    
    
    })
})

export const {
   useGetFullCoursesMutation
} = publicApiSlice