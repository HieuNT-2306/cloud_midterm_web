import {createApi } from '@reduxjs/toolkit/query/react'
import baseQueryWithLogging from '../helper/apiClient';

export const api = createApi({ 
    baseQuery: baseQueryWithLogging,
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
        loginUser: builder.mutation({
            query: (credential) => ({
                url: `auth/login`,
                method: 'POST',
                body: credential
            })
        }),
    })
})
  
export const {
    useGetUserQuery,
    useDeleteUserMutation,
    usePostUserMutation,
    useLoginUserMutation
} = api;