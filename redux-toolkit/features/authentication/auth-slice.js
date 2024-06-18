import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {API_URL} from '@env';

export const authSlice = createApi({
  reducerPath: 'auth-slice',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
  }),
  endpoints: builder => {
    return {
      registration: builder.mutation({
        query: data => ({
          url: '/api/auth/register',
          method: 'POST',
          body: data,
        }),
      }),
      login: builder.mutation({
        query: data => ({
          url: '/api/auth/login',
          method: 'POST',
          body: data,
        }),
      }),
      resetPassReq: builder.mutation({
        query: data => ({
          url: '/api/auth/password-reset-request',
          method: 'POST',
          body: data,
        }),
      }),
      resetPass: builder.mutation({
        query: data => ({
          url: '/api/auth/password-reset',
          method: 'POST',
          body: data,
        }),
      }),
    };
  },
});

export const {
  useRegistrationMutation,
  useLoginMutation,
  useResetPassReqMutation,
  useResetPassMutation,
} = authSlice;
