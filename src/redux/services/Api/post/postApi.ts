import { baseApi } from "../../base/baseAPI";

export const postApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        postNews: build.mutation({
            query: (data) => ({
                url: '/posts',
                method: "POST",
                body:data
            })
        })
    })
})