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
       
       
    })
})

export const {
   useAddcourseMutation
} = chefApiSlice