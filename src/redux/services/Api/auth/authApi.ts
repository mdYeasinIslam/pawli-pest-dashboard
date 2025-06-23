import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.paoline.code-commando.com/api/v1'
    }),
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (userData) => ({
                url: '/auth/register',
                method: 'POST',
                body: userData, 
            }),
        }),
        loginUser: builder.mutation({
            query: (loginData) => ({
                url: '/auth/login',
                method: 'POST',
                body: loginData,
            })
        }),
        forgetPassword: builder.mutation({
            query: (email) => ({
                url: '/auth/forgot-password',
                method: "POST",
                body: email,
            })
        }),
        varifyOTP: builder.mutation({
            query: (data) => ({
                url: '/auth//verify-otp',
                method: "POST",
                body: data
            })
        }),
        updatePassword: builder.mutation({
            query: (data) => ({
                url: '/auth/reset-password',
                method: "POST",
                body:data
            })
        })
    })
})

export const {useRegisterUserMutation, useLoginUserMutation,useForgetPasswordMutation,useVarifyOTPMutation,useUpdatePasswordMutation}= authApi;