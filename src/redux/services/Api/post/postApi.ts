import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseApi } from "../../base/baseAPI";
import { url } from "inspector";

export const postApi = createApi({
    reducerPath: 'postapi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://pauline.onrender.com/api/v1'
    }),
    tagTypes:['Post'],
    endpoints: (build) => ({
        //get all post
        getAllPost: build.query<unknown,void>({
            query: () => '/posts'
        }),

        //get pending post
        getPendingPost: build.query<unknown,void>({
            query: () => '/posts/pending'
        }),
        //create post
        postNews: build.mutation({
            query: () => ({
                url: '/posts',
                method: 'POST',
            }),
        }),
        //delete post
        deletePost:build.mutation({
            query:(id)=>({
                url:`/posts/${id}`,
                method:'DELETE'
            }),
            invalidatesTags:['Post']
        })
    }),
});

export const { useGetAllPostQuery,useGetPendingPostQuery, usePostNewsMutation ,useDeletePostMutation} = postApi;

