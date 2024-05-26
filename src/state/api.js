import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const api = createApi({ 
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5003'}),
    reducerPath: 'adminApi',
    tagTypes: ['User'],
    endpoints: (builder) => ({ 
        getUser: builder.query({
            query: (id) => `user/get`,
            providesTags: ['User']
        }),
        postUser: builder.mutation({
            query: (userData) => ({
                url: `user/post`,
                method: 'POST',
                body: userData
            }),
            invalidatesTags: ['User']
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `user/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['User']
        }),
    })
})
  
export const {
    useGetUserQuery,
    useDeleteUserMutation,
    usePostUserMutation
} = api;