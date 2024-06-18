import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {API_URL} from '@env';

export const salahChecklistSlice = createApi({
  reducerPath: 'salah-checklist-slice',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers, {getState}) => {
      const authToken = getState().authToken.value;

      //* EXPECTED FORMAT
      //* {"authorization": `Bearer ${authToken}`}
      headers.set('authorization', `Bearer ${authToken}`);

      // console.log('SALAH SLICE: headers: ', authToken);

      return headers;
    },
  }),
  endpoints: builder => {
    return {
      setSalahCheckList: builder.mutation({
        query: ({field, value, year, month, day}) => ({
          url: `/api/checklists/salah/${field}/${value}`,
          method: 'PATCH',
          params: {
            year: year,
            month: month,
            day: day,
          },
        }),
      }),
      getSalahCheckList: builder.query({
        //* hijri
        query: ({year, month, day}) => {
          return {
            url: '/api/checklists/salah',
            params: {
              year: year,
              month: month,
              day: day,
            },
          };
        },
      }),
    };
  },
});

export const {useGetSalahCheckListQuery, useSetSalahCheckListMutation} =
  salahChecklistSlice;
