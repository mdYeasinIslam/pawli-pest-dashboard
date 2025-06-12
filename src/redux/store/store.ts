import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "../services/base/baseAPI";
import { authApi } from "../services/Api/auth/authApi";
import authSlice from "../services/Api/auth/authSlice";
import { postApi } from "../services/Api/post/postApi";

export const store = configureStore({
    reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [postApi.reducerPath]:postApi.reducer,

        auth:authSlice.reducer,
        
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            baseApi.middleware,
            authApi.middleware,
            postApi.middleware

        ),
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;