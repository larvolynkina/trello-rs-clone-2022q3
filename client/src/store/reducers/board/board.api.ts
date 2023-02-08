import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ServerDetails } from '../../../const/const';

export const boardApi = createApi({
  reducerPath: 'board',
  tagTypes: ['Columns'],
  baseQuery: fetchBaseQuery({
    baseUrl: `${ServerDetails.url}:${ServerDetails.port}`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('trello-rs-clone-token') || '';
      headers.set('authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (build) => ({
    getBoard: build.query({
      query: (id: string) => ({
        url: id,
      }),
    }),
    getColumns: build.query({
      query: (boardId: string) => ({
        url: `/columns/${boardId}`,
      }),
    }),
  }),
});

export const { useGetBoardQuery, useGetColumnsQuery } = boardApi;
