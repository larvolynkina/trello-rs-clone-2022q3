import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ICard, IUser } from '../../../types/card';

type TGetCardByIdQueryArgs = {
  boardId: string;
  cardId: string;
};

type TGetCardByIdQueryResponse = {
  card: ICard;
  column: string;
};

type TUpdateCardTitleOrDescrQueryArgs = {
  boardId: string;
  cardId: string;
  title?: string;
  description?: string;
};

type TGetCardParticipantsQueryArgs = {
  boardId: string;
  cardId: string;
};

export const cardsApi = createApi({
  reducerPath: 'cardsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001/cards',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('trello-rs-clone-token') || '';
      headers.set('authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ['Card', 'Participants'],
  endpoints: (builder) => ({
    getCardById: builder.query<TGetCardByIdQueryResponse, TGetCardByIdQueryArgs>({
      query: ({ boardId, cardId }) => ({
        url: `/${boardId}/${cardId}`,
      }),
      providesTags: ['Card'],
    }),
    updateCardTitleOrDescr: builder.mutation<ICard, TUpdateCardTitleOrDescrQueryArgs>({
      query: (body) => ({
        url: '',
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Card'],
    }),
    getCardParticipants: builder.query<IUser[], TGetCardParticipantsQueryArgs>({
      query: ({ boardId, cardId }) => ({
        url: `/${boardId}/${cardId}/participants`
      }), 
      providesTags: ['Participants'],
    }),
  }),
});

export const { useGetCardByIdQuery, useUpdateCardTitleOrDescrMutation, useGetCardParticipantsQuery } = cardsApi;
