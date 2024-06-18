import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const arabicDateSlice = createApi({
  // todo: env <= url
  reducerPath: 'arabicDateApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.aladhan.com/v1/gToH',
  }),
  endpoints: builder => {
    return {
      getArabicDate: builder.query({
        query: date => `/${date}`,
      }),
    };
  },
});

export const {useGetArabicDateQuery} = arabicDateSlice;
