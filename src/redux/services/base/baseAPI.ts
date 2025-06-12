import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl:'https://paulinefst.onrender.com/api/v1'
    }),
    // tagTypes: ['User', 'Post'],
    endpoints:()=>({}),
})