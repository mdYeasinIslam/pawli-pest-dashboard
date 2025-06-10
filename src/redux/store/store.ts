import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "../services/base/baseAPI";

export const store = configureStore({
    reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            baseApi.middleware,

        ),
})