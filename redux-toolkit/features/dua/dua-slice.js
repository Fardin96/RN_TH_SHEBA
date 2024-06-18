import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
const API_URL = 'https://www.hisnmuslim.com/api/en';

export const duaSlice = createApi({
  reducerPath: 'dua-slice',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
  }),
  endpoints: builder => {
    return {
      getDua: builder.query({
        query: duaNumber => ({
          url: `/${duaNumber}.json`,
          responseHandler: 'text',
        }),
      }),
    };
  },
});

export const {useGetDuaQuery} = duaSlice;
