import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {API_URL} from '@env';

export const dailyTodolistSlice = createApi({
  reducerPath: 'daily-todolist-slice',
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
      getTodos: builder.query({
        query: ({year, month, day}) => ({
          url: '/api/checklists/activities',
          params: {
            year: year,
            month: month,
            day: day,
          },
        }),
      }),
      addTodo: builder.mutation({
        query: ({value, year, month, day}) => ({
          url: '/api/checklists/activities',
          params: {
            year: year,
            month: month,
            day: day,
          },
          method: 'POST',
          body: {custom_name: value},
        }),
      }),
      updateTodo: builder.mutation({
        query: ({id, value, year, month, day}) => ({
          url: `/api/checklists/activities/${id}/${value}`,
          params: {
            year: year,
            month: month,
            day: day,
          },
          method: 'PATCH',
        }),
      }),
    };
  },
});

export const {useGetTodosQuery, useAddTodoMutation, useUpdateTodoMutation} =
  dailyTodolistSlice;
