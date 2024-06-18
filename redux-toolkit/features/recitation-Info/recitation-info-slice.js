import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {API_URL} from '@env';

export const recitationInfoSlice = createApi({
  reducerPath: 'recitation-info-slice',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers, {getState}) => {
      const authToken = getState().authToken.value;

      //* EXPECTED FORMAT
      //* {"authorization": `Bearer ${authToken}`}
      headers.set('authorization', `Bearer ${authToken}`);

      // console.log('RECITATION INFO SLICE: headers: ', headers);

      return headers;
    },
  }),
  endpoints: builder => {
    return {
      setRecitationInfo: builder.mutation({
        query: ({data, year, month, day}) => ({
          url: '/api/checklists/quran',
          params: {
            year: year,
            month: month,
            day: day,
          },
          method: 'PATCH',
          body: data,
        }),
      }),
      getRecitationInfo: builder.query({
        query: ({year, month, day}) => ({
          url: '/api/checklists/quran',
          params: {
            year: year,
            month: month,
            day: day,
          },
        }),
      }),
    };
  },
});

export const {useSetRecitationInfoMutation, useGetRecitationInfoQuery} =
  recitationInfoSlice;
