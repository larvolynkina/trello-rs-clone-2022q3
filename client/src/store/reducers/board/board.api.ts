import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ServerDetails } from '../../../const/const';
import { ICard, IColumn } from '../../../types/board';

export const boardApi = createApi({
  reducerPath: 'board',
  tagTypes: ['Columns', 'ColumnsOrder', 'Cards'],
  baseQuery: fetchBaseQuery({
    baseUrl: `${ServerDetails.url}:${ServerDetails.port}`,
    prepareHeaders: (headers) => {
      const token =
        localStorage.getItem('trello-rs-clone-token') ||
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2U0OTIzNTI1NDNkYjk5NDk4Y2JkZjAiLCJpYXQiOjE2NzU5MjQwMjEsImV4cCI6MTY3ODUxNjAyMX0.V_l2y6FysdMPaXuUxeGXSFVV2Vi4XNwnyrfV9ne2TsQ';
      headers.set('authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (build) => ({
    getBoardByID: build.query({
      query: (id: string) => ({
        url: `/boards/${id}`,
      }),
      providesTags: [{ type: 'ColumnsOrder', id: 'LIST' }],
    }),
    getColumns: build.query<IColumn[], string>({
      query: (boardId: string) => ({
        url: `/columns/${boardId}`,
      }),
      providesTags: [{ type: 'Columns', id: 'LIST' }],
    }),
    createColumn: build.mutation({
      query: (body: { boardId: string; title: string }) => ({
        url: '/columns',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Columns', id: 'LIST' }],
    }),
    updateTitleColumn: build.mutation({
      query: (body: { boardId: string; columnId: string; title: string }) => ({
        url: '/columns',
        method: 'PATCH',
        body,
      }),
      invalidatesTags: [{ type: 'Columns', id: 'LIST' }],
    }),
    updateColumnOrder: build.mutation({
      query: (body: { boardId: string; data: string[] }) => ({
        url: '/columns/update-column-order',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Columns', id: 'LIST' }],
    }),
    getCardsOnBoard: build.query<ICard[], string>({
      query: (boardId: string) => ({
        url: `/cards/${boardId}`,
      }),
      providesTags: [{ type: 'Cards', id: 'LIST' }],
    }),
    createCard: build.mutation({
      query: (body: { boardId: string; columnId: string; title: string }) => ({
        url: `/cards`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [
        { type: 'Columns', id: 'LIST' },
        { type: 'Cards', id: 'LIST' },
      ],
    }),
    updateCardOrder: build.mutation({
      query: (body: {
        userId: string;
        boardId: string;
        data: { columnId: string; columnCards: string[] }[];
      }) => ({
        url: '/columns/update-card-order',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Columns', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetBoardByIDQuery,
  useGetColumnsQuery,
  useGetCardsOnBoardQuery,
  useCreateCardMutation,
  useCreateColumnMutation,
  useUpdateTitleColumnMutation,
  useUpdateColumnOrderMutation,
  useUpdateCardOrderMutation,
} = boardApi;
