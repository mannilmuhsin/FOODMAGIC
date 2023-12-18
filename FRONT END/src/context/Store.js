import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { apiSlice } from '../api/apiSlice';
import authReducer from './authReducer';
import { persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';
import { combineReducers } from '@reduxjs/toolkit';

const tabId = window.location.href;

const persistConfig = {
    key: `auth-${tabId}`,
    storage: storageSession, // Use sessionStorage instead of localStorage
    whitelist: ['auth'], // Only persist the 'auth' slice of the state
};

const reducer = combineReducers({
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
});

const persistedReducerAuth = persistReducer(persistConfig, reducer);

 const store = configureStore({
    reducer: persistedReducerAuth,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST'],
            },
        }).concat(apiSlice.middleware),
    devTools: true,
});

export default store;
