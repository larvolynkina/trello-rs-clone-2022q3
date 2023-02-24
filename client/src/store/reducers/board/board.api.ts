import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { SERVER_URL } from '../../../const/const';
import { IColumn } from '../../../types/board';
import { ICard, IUser } from '../../../types/card';

type TGetBoardParticipantsQueryArgs = {
  boardId: string;
};

export const boardApi = createApi({
  reducerPath: 'board',
  tagTypes: ['Columns', 'ColumnsOrder', 'Cards', 'BoardParticipants', 'board'],
  baseQuery: fetchBaseQuery({
    baseUrl: SERVER_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('trello-rs-clone-token');
      headers.set('authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  keepUnusedDataFor: 1,
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
      providesTags: [{ type: 'ColumnsOrder', id: 'LIST' }, 'board'],
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
      query: (body: { boardId: string; backgroundColor: string; backgroundImage: string }) => ({
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
    }),
    updateTitleColumn: build.mutation({
      query: (body: { boardId: string; columnId: string; title: string }) => ({
        url: '/columns',
        method: 'PATCH',
        body,
      }),
    }),
    updateColumnOrder: build.mutation({
      query: (body: { boardId: string; data: string[] }) => ({
        url: '/columns/update-column-order',
        method: 'POST',
        body,
      }),
    }),
    copyColumn: build.mutation({
      query: (body: { boardId: string; columnId: string; newTitle: string }) => ({
        url: '/columns/copy',
        method: 'POST',
        body,
      }),
    }),
    deleteColumn: build.mutation({
      query: (ids: { boardId: string; columnId: string }) => ({
        url: `/columns/${ids.boardId}/${ids.columnId}`,
        method: 'DELETE',
      }),
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
    }),
    updateCardOrder: build.mutation({
      query: (body: { boardId: string; data: { columnId: string; columnCards: string[] }[] }) => ({
        url: '/columns/update-card-order',
        method: 'POST',
        body,
      }),
    }),
    updateCardTitleOnServer: build.mutation({
      query: (body: { boardId: string; cardId: string; title: string }) => ({
        url: '/cards',
        method: 'PATCH',
        body,
      }),
    }),
    addNewMarkOnBoard: build.mutation({
      query: (body: { boardId: string; text: string; color: string }) => ({
        url: '/boards/add-mark',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['board'],
    }),
    updateMarkOnBoard: build.mutation({
      query: (body: { boardId: string; color: string; text: string; index: number }) => ({
        url: '/boards/update-mark',
        method: 'POST',
        body,
      }),
    }),
    deleteMarkFromBoard: build.mutation({
      query: (body: { boardId: string; markId: string }) => ({
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
  useUpdateCardTitleOnServerMutation,
  useCopyColumnMutation,
} = boardApi;
