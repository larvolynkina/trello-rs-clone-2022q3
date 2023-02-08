import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ICard } from '../../../types/card';

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
  tagTypes: ['Card'],
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
  }),
});

export const { useGetCardByIdQuery, useUpdateCardTitleOrDescrMutation } = cardsApi;
