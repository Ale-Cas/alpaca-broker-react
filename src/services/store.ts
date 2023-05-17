import { configureStore } from "@reduxjs/toolkit";
import { api } from './api';
import AuthReducer from "./auth/authSlice";
export const createStore = () => configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        auth: AuthReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
            // https://stackoverflow.com/questions/61704805/getting-an-error-a-non-serializable-value-was-detected-in-the-state-when-using
        }).concat(api.middleware),
    devTools: true
});

export const store = createStore();

export type RootState = ReturnType<typeof store.getState>
