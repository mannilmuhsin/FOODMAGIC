import {configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { apiSlice } from '../api/apiSlice'
import authReducer from './authReducer'
import storage from 'redux-persist/lib/storage'
import {persistReducer, persistStore} from 'redux-persist'
import {combineReducers} from '@reduxjs/toolkit'

const persistconfig={
    key:'auth',
    storage
}

const reducer=combineReducers({
    [apiSlice.reducerPath]:apiSlice.reducer,
    auth:authReducer
})

const persistedreducerauth=persistReducer(persistconfig,reducer)

export const Store = configureStore({
    reducer:persistedreducerauth
    // {
        // [apiSlice.reducerPath]:apiSlice.reducer,
        // auth:authReducer
        // auth:persistedreducerauth
    // }
    ,
    middleware:getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware),
    devTools:true
})

// export const persistor = persistStore(Store)