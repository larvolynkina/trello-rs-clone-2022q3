import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { SERVER_URL } from '../../../const/const';
import { ICard, IColumn } from '../../../types/board';
import { IUser } from '../../../types/card';

type TGetBoardParticipantsQueryArgs = {
  boardId: string;
};

export const boardApi = createApi({
  reducerPath: 'board',
  tagTypes: ['Columns', 'ColumnsOrder', 'Cards', 'BoardParticipants'],
  baseQuery: fetchBaseQuery({
    baseUrl: SERVER_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('trello-rs-clone-token');
      headers.set('authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (build) => ({
    getUserByEmail: build.mutation<IUser, { email: string; boardId: string }>({
      query: (body) => ({
        url: '/users/email',
        method: 'POST',
        body,
      }),
    }),
    getBoardByID: build.query({
      query: (id: string) => ({
        url: `/boards/${id}`,
      }),
      providesTags: [{ type: 'ColumnsOrder', id: 'LIST' }],
    }),
    updateBoardTitle: build.mutation({
      query: (body: { boardId: string; title: string }) => ({
        url: '/boards',
        method: 'PATCH',
        body,
      }),
    }),
    addMembersOnBoard: build.mutation({
      query: (body: { boardId: string; membersId: string[] }) => ({
        url: '/boards/add-members',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'BoardParticipants' }],
    }),
    getBoardParticipants: build.query<IUser[], TGetBoardParticipantsQueryArgs>({
      query: ({ boardId }) => ({
        url: `boards/${boardId}/participants`,
      }),
      providesTags: ['BoardParticipants'],
    }),
    updateBoardBackground: build.mutation({
      query: (body: {boardId: string; backgroundColor: string; backgroundImage: string}) => ({
        url: '/boards/background',
        method: 'PATCH',
        body,
      }),
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
      // invalidatesTags: [{ type: 'Columns', id: 'LIST' }],
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
    deleteColumn: build.mutation({
      query: (ids: { boardId: string; columnId: string }) => ({
        url: `/columns/${ids.boardId}/${ids.columnId}`,
        method: 'DELETE',
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
      query: (body: { boardId: string; data: { columnId: string; columnCards: string[] }[] }) => ({
        url: '/columns/update-card-order',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Columns', id: 'LIST' }],
    }),
    addNewMarkOnBoard: build.mutation({
      query: (body: {boardId: string, text: string, color: string}) => ({
        url: '/boards/add-mark',
        method: 'POST',
        body,
      }),
    }),
    updateMarkOnBoard: build.mutation({
      query: (body: {boardId: string, color: string, text: string, index: number}) => ({
        url: '/boards/update-mark',
        method: 'POST',
        body,
      }),
    }),
    deleteMarkFromBoard: build.mutation({
      query: (body: {boardId: string, markId: string}) => ({
        url: '/boards/delete-mark',
        method: 'POST',
        body,
      }),
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
  useDeleteColumnMutation,
  useUpdateBoardTitleMutation,
  useGetBoardParticipantsQuery,
  useGetUserByEmailMutation,
  useAddMembersOnBoardMutation,
  useUpdateBoardBackgroundMutation,
  useAddNewMarkOnBoardMutation,
  useUpdateMarkOnBoardMutation,
  useDeleteMarkFromBoardMutation,
} = boardApi;
