import {createSlice} from '@reduxjs/toolkit'

const authSlice = createSlice({
    name:'auth',
    initialState:{user:null,token:null,role:[]},
    reducers:{
        setCredentials:(state,action)=>{
            const {user,token,role} = action.payload
            state.user = user !== undefined ? user : state.user;
            state.token = token !== undefined ? token : state.token;
            state.role = role !== undefined ? [role] : state.role;
        },
        logOut:(state,action)=>{
            state.token=null
            state.user=null
            state.role=[]
        }
    }
})

export const {setCredentials,logOut}= authSlice.actions
export default authSlice.reducer

export const selectCurrentUser = (state)=> state.auth.user
export const selectCurrentToken = (state)=> state.auth.token
export const auth = (state)=> state.auth
