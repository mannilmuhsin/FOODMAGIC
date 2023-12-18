import { apiSlice } from "./apiSlice"

export const publicApiSlice = apiSlice.injectEndpoints({
    endpoints:bulder =>({
        getFullCourses:bulder.mutation({
            query:Credentials =>({
                url:'/courses',
                method:'get',
            })
        }),
        getFullCommunitys:bulder.mutation({
            query:Credentials =>({
                url:'/communitys',
                method:'get',
            })
        }),
        getCourseById:bulder.mutation({
            query:Credentials =>({
                url:`/getcourseById?id=${Credentials}`,
                method:'get',
            })
        }),
        getCommunityById:bulder.mutation({
            query:Credentials =>({
                url:`/getcommunityById/${Credentials}`,
                method:'get',
            })
        }),
    
    
    })
})

export const {
   useGetFullCoursesMutation,
   useGetCourseByIdMutation,
   useGetFullCommunitysMutation,
   useGetCommunityByIdMutation
} = publicApiSlice