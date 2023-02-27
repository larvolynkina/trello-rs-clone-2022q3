import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { toast } from 'react-toastify';
import { ICard, IUser } from '../../../types/card';
import { SERVER_URL } from '../../../const/const';
import { RootState } from '../../rootReducer';

type TGetCardByIdQueryArgs = {
  boardId: string;
  cardId: string;
};

type TUpdateCardTitleOrDescrQueryArgs = {
  boardId: string;
  cardId: string;
  title?: string;
  description?: string;
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
};

type TSetCheckListItemCheckedQueryArgs = {
  boardId: string;
  cardId: string;
  id: string;
  checkListIndex: number;
  status: boolean;
};

type TUpdateCheckListTitleQueryArgs = {
  boardId: string;
  cardId: string;
  title: string;
  checkListIndex: number;
};

export type TUploadFileResponse = {
  data: Record<string, string>;
};

export type TAttachmentDraft = {
  name: string;
  url: string;
  type: 'link' | 'file';
};

type TAddAttachmentTitleQueryArgs = {
  boardId: string;
  cardId: string;
  data: TAttachmentDraft;
};

type TDeleteAttachmentQueryArgs = {
  boardId: string;
  cardId: string;
  id: string;
};

type TUpdateMarksIdArrayQueryArgs = {
  boardId: string;
  cardId: string;
  marks: string[];
};

export const cardsApi = createApi({
  reducerPath: 'cardsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${SERVER_URL}`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('trello-rs-clone-token') || '';
      headers.set('authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ['Card'],
  endpoints: (builder) => ({
    getCardById: builder.query<ICard, TGetCardByIdQueryArgs>({
      query: ({ boardId, cardId }) => ({
        url: `/cards/${boardId}/${cardId}`,
      }),
      providesTags: ['Card'],
    }),
    deleteCardById: builder.mutation<void, TGetCardByIdQueryArgs>({
      query: ({ boardId, cardId }) => ({
        url: `/cards/${boardId}/${cardId}`,
        method: 'DELETE',
      }),
    }),
    updateCardTitleOrDescr: builder.mutation<ICard, TUpdateCardTitleOrDescrQueryArgs>({
      query: (body) => ({
        url: '/cards',
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Card'],
    }),
    addCardParticipant: builder.mutation<void, TAddCardParticipantQueryArgs>({
      query: ({ boardId, cardId, participantId }) => ({
        url: `/cards/${boardId}/${cardId}/add-participant`,
        method: 'POST',
        body: { participantId },
      }),
    }),
    deleteCardParticipant: builder.mutation<void, TAddCardParticipantQueryArgs>({
      query: ({ boardId, cardId, participantId }) => ({
        url: `/cards/${boardId}/${cardId}/delete-participant`,
        method: 'POST',
        body: { participantId },
      }),
    }),
    addCheckList: builder.mutation<ICard, TAddCheckListQueryArgs>({
      query: ({ boardId, cardId, title }) => ({
        url: `/cards/${boardId}/${cardId}/add-checklist`,
        method: 'POST',
        body: { title },
      }),
      async onQueryStarted({ boardId, cardId }, { dispatch, queryFulfilled, getState }) {
        try {
          const { data: updatedCard } = await queryFulfilled;
          const state = getState() as RootState;
          const column = state.CARD.card?.column || '';
          const card = { ...updatedCard };
          card.participants = state.CARD.card?.participants || [];
          dispatch(
            cardsApi.util.updateQueryData('getCardById', { boardId, cardId }, (draft: ICard) => {
              Object.assign(draft, { ...card, column });
            }),
          );
        } catch {
          toast.error('Что-то пошло не так...');
        }
      },
    }),
    deleteCheckList: builder.mutation<void, TDeleteCheckListQueryArgs>({
      query: ({ boardId, cardId, title, id }) => ({
        url: `/cards/${boardId}/${cardId}/delete-checklist`,
        method: 'POST',
        body: { title, id },
      }),
      invalidatesTags: ['Card'],
    }),
    addCheckListItem: builder.mutation<ICard, TAddCheckListItemQueryArgs>({
      query: ({ boardId, cardId, title, id }) => ({
        url: `/cards/${boardId}/${cardId}/add-checklist-item`,
        method: 'POST',
        body: { title, id },
      }),
      async onQueryStarted({ boardId, cardId }, { dispatch, queryFulfilled, getState }) {
        try {
          const { data: updatedCard } = await queryFulfilled;
          const state = getState() as RootState;
          const column = state.CARD.card?.column || '';
          const card = { ...updatedCard };
          card.participants = state.CARD.card?.participants || [];
          dispatch(
            cardsApi.util.updateQueryData('getCardById', { boardId, cardId }, (draft: ICard) => {
              Object.assign(draft, { ...card, column });
            }),
          );
        } catch {
          toast.error('Что-то пошло не так...');
        }
      },
    }),
    deleteCheckListItem: builder.mutation<void, TDeleteCheckListItemQueryArgs>({
      query: ({ boardId, cardId, id, checkListIndex }) => ({
        url: `/cards/${boardId}/${cardId}/delete-checklist-item`,
        method: 'POST',
        body: { id, checkListIndex },
      }),
    }),
    setCheckListItemChecked: builder.mutation<void, TSetCheckListItemCheckedQueryArgs>({
      query: ({ boardId, cardId, id, checkListIndex, status }) => ({
        url: `/cards/${boardId}/${cardId}/set-checklist-item`,
        method: 'POST',
        body: { id, checkListIndex, status },
      }),
    }),
    updateCheckListTitle: builder.mutation<void, TUpdateCheckListTitleQueryArgs>({
      query: ({ boardId, cardId, title, checkListIndex }) => ({
        url: `/cards/${boardId}/${cardId}/update-checklist-title`,
        method: 'POST',
        body: { title, checkListIndex },
      }),
      invalidatesTags: ['Card'],
    }),
    uploadFile: builder.mutation<TUploadFileResponse, FormData>({
      query: (formData) => ({
        url: `/upload`,
        method: 'POST',
        body: formData,
      }),
    }),
    deleteFile: builder.mutation<void, string>({
      query: (path: string) => ({
        url: `/upload/delete`,
        method: 'POST',
        body: { path },
      }),
    }),
    addAttachment: builder.mutation<ICard, TAddAttachmentTitleQueryArgs>({
      query: ({ boardId, cardId, data }) => ({
        url: `/cards/${boardId}/${cardId}/add-attachment`,
        method: 'POST',
        body: { data },
      }),
      async onQueryStarted({ boardId, cardId }, { dispatch, queryFulfilled, getState }) {
        try {
          const { data: updatedCard } = await queryFulfilled;
          const state = getState() as RootState;
          const column = state.CARD.card?.column || '';
          const card = { ...updatedCard };
          card.participants = state.CARD.card?.participants || [];
          dispatch(
            cardsApi.util.updateQueryData('getCardById', { boardId, cardId }, (draft: ICard) => {
              Object.assign(draft, { ...card, column });
            }),
          );
        } catch {
          toast.error('Что-то пошло не так...');
        }
      },
    }),
    deleteAttachment: builder.mutation<void, TDeleteAttachmentQueryArgs>({
      query: ({ boardId, cardId, id }) => ({
        url: `/cards/${boardId}/${cardId}/delete-attachment`,
        method: 'POST',
        body: { id },
      }),
    }),
    updateMarksIdArray: builder.mutation<ICard, TUpdateMarksIdArrayQueryArgs>({
      query: ({ boardId, cardId, marks }) => ({
        url: `/cards/${boardId}/${cardId}/update-marks`,
        method: 'POST',
        body: { marks },
      }),
    }),
    getAllUsers: builder.query<IUser[], void>({
      query: () => ({
        url: `/users`,
      }),
    }),
  }),
});

export const {
  useGetCardByIdQuery,
  useDeleteCardByIdMutation,
  useUpdateCardTitleOrDescrMutation,
  useAddCardParticipantMutation,
  useDeleteCardParticipantMutation,
  useAddCheckListMutation,
  useDeleteCheckListMutation,
  useAddCheckListItemMutation,
  useDeleteCheckListItemMutation,
  useSetCheckListItemCheckedMutation,
  useUpdateCheckListTitleMutation,
  useUploadFileMutation,
  useDeleteFileMutation,
  useAddAttachmentMutation,
  useDeleteAttachmentMutation,
  useGetAllUsersQuery,
  useUpdateMarksIdArrayMutation,
} = cardsApi;
