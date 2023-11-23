import { apiSlice } from "./apiSlice"

export const chefApiSlice = apiSlice.injectEndpoints({
    endpoints:bulder =>({
        addcourse:bulder.mutation({
            query:formData =>({
                url:'/chef/addcourse',
                method:'post',
                formData:true,
                body:formData,
                credentials:'include'

            })
        }),
        addchapter:bulder.mutation({
            query:formData =>({
                url:'/chef/addchapter',
                method:'post',
                formData:true,
                body:formData,
                credentials:'include'

            })
        }),
        chefsCours:bulder.mutation({
            query:Credentials =>({
                url:`/chef/addcourse?user=${Credentials}`,
                method:'get',
            })
        }),
        getCours:bulder.mutation({
            query:Credentials =>({
                url:`/chef/getcourse?id=${Credentials}`,
                method:'get',
            })
        }),
        deleteCours:bulder.mutation({
            query:Credentials =>({
                url:`/chef/deletecourse/${Credentials}`,
                method:'delete',
            })
        }),
        handleShowCourse:bulder.mutation({
            query:Credentials =>({
                url:'/chef/handleshowcourse',
                method:'put',
                body:{...Credentials}
            })
        }),
       
       
    })
})

export const {
   useAddcourseMutation,
   useChefsCoursMutation,
   useGetCoursMutation,
   useHandleShowCourseMutation,
   useDeleteCoursMutation,
   useAddchapterMutation
} = chefApiSlice