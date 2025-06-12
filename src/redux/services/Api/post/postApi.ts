import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseApi } from "../../base/baseAPI";
import { url } from "inspector";

export const postApi = createApi({
    reducerPath: 'postapi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://pauline.onrender.com/api/v1'
    }),
    endpoints: (build) => ({

        getAllPost: build.query<unknown,void>({
            query: () => '/posts'
        }),
        getPendingPost: build.query<unknown,void>({
            query: () => '/posts/pending'
        }),
            
        postNews: build.mutation({
            query: () => ({
                url: '/posts',
                method: 'POST',
            }),
        })
    }),
});

export const { useGetAllPostQuery,useGetPendingPostQuery, usePostNewsMutation } = postApi;

