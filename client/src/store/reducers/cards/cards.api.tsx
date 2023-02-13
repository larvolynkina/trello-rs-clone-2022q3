import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ICard, IUser, IChecklist, ICheckItem } from '../../../types/card';

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

type TAddCardParticipantQueryArgs = {
  boardId: string;
  cardId: string;
  participantId: string;
};

type TAddCheckListQueryArgs = {
  boardId: string;
  cardId: string;
  title: string;
};

type TDeleteCheckListQueryArgs = {
  boardId: string;
  cardId: string;
  title: string;
  id: string;
};

type TAddCheckListItemQueryArgs = TDeleteCheckListQueryArgs;

type TDeleteCheckListItemQueryArgs = {
  boardId: string;
  cardId: string;
  id: string;
  checkListIndex: number;
}

type TUpdateCheckListTitleQueryArgs = {
  boardId: string;
  cardId: string;
  title: string;
  checkListIndex: number;
}

export const cardsApi = createApi({
  reducerPath: 'cardsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://trello-rs-clone-2022q3-production.up.railway.app/cards',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('trello-rs-clone-token') || '';
      headers.set('authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ['Card', 'CardParticipants'],
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
        url: `/${boardId}/${cardId}/participants`,
      }),
      providesTags: ['CardParticipants'],
    }),
    addCardParticipant: builder.mutation<void, TAddCardParticipantQueryArgs>({
      query: ({ boardId, cardId, participantId }) => ({
        url: `/${boardId}/${cardId}/add-participant`,
        method: 'POST',
        body: { participantId },
      }),
      invalidatesTags: ['Card', 'CardParticipants'],
    }),
    deleteCardParticipant: builder.mutation<void, TAddCardParticipantQueryArgs>({
      query: ({ boardId, cardId, participantId }) => ({
        url: `/${boardId}/${cardId}/delete-participant`,
        method: 'POST',
        body: { participantId },
      }),
      invalidatesTags: ['Card', 'CardParticipants'],
    }),
    addCheckList: builder.mutation<IChecklist, TAddCheckListQueryArgs>({
      query: ({ boardId, cardId, title }) => ({
        url: `/${boardId}/${cardId}/add-checklist`,
        method: 'POST',
        body: { title },
      }),
      invalidatesTags: ['Card'],
    }),
    deleteCheckList: builder.mutation<void, TDeleteCheckListQueryArgs>({
      query: ({ boardId, cardId, title, id }) => ({
        url: `/${boardId}/${cardId}/delete-checklist`,
        method: 'POST',
        body: { title, id },
      }),
      invalidatesTags: ['Card'],
    }),
    addCheckListItem: builder.mutation<ICheckItem, TAddCheckListItemQueryArgs>({
      query: ({ boardId, cardId, title, id }) => ({
        url: `/${boardId}/${cardId}/add-checklist-item`,
        method: 'POST',
        body: { title, id },
      }),
      invalidatesTags: ['Card'],
    }),
    deleteCheckListItem: builder.mutation<void, TDeleteCheckListItemQueryArgs>({
      query: ({ boardId, cardId, id, checkListIndex }) => ({
        url: `/${boardId}/${cardId}/delete-checklist-item`,
        method: 'POST',
        body: { id , checkListIndex },
      }),
      invalidatesTags: ['Card'],
    }),
    toggleCheckListItemChecked: builder.mutation<void, TDeleteCheckListItemQueryArgs>({
      query: ({ boardId, cardId, id, checkListIndex }) => ({
        url: `/${boardId}/${cardId}/toggle-checklist-item`,
        method: 'POST',
        body: { id , checkListIndex },
      }),
      invalidatesTags: ['Card'],
    }),
    updateCheckListTitle: builder.mutation<void, TUpdateCheckListTitleQueryArgs>({
      query: ({ boardId, cardId, title, checkListIndex }) => ({
        url: `/${boardId}/${cardId}/update-checklist-title`,
        method: 'POST',
        body: { title , checkListIndex },
      }),
      invalidatesTags: ['Card'],
    }),
  }),
});

export const {
  useGetCardByIdQuery,
  useUpdateCardTitleOrDescrMutation,
  useGetCardParticipantsQuery,
  useAddCardParticipantMutation,
  useDeleteCardParticipantMutation,
  useAddCheckListMutation,
  useDeleteCheckListMutation,
  useAddCheckListItemMutation,
  useDeleteCheckListItemMutation,
  useToggleCheckListItemCheckedMutation,
  useUpdateCheckListTitleMutation,
} = cardsApi;
