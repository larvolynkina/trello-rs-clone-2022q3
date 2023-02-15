import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../../const/const';
import { ICard } from '../../../types/card';

type TInitialState = {
  card: ICard | null;
  boardParticipantsModalActive: boolean;
  checkListModalActive: boolean;
  attachModalActive: boolean;
};

const initialState: TInitialState = {
  card: null,
  boardParticipantsModalActive: false,
  checkListModalActive: false,
  attachModalActive: false,
};

const cardSlice = createSlice({
  name: NameSpace.card,
  initialState,
  reducers: {
    setCard(state, action) {
      state.card = action.payload;
    },
    addParticipant(state, action) {
      if (state.card) {
        state.card.participants.push(action.payload);
      }
    },
    deleteParticipant(state, action) {
      if (state.card) {
        state.card.participants = state.card.participants.filter(
          (user) => user._id !== action.payload,
        );
      }
    },
    setBoardParticipantsModalOpen(state) {
      state.boardParticipantsModalActive = true;
    },
    setBoardParticipantsModalClose(state) {
      state.boardParticipantsModalActive = false;
    },
    setCheckListModalOpen(state) {
      state.checkListModalActive = true;
    },
    setCheckListModalClose(state) {
      state.checkListModalActive = false;
    },
    setAttachModalOpen(state) {
      state.attachModalActive = true;
    },
    setAttachModalClose(state) {
      state.attachModalActive = false;
    },
  },
});

export const {
  setCard,
  setBoardParticipantsModalClose,
  setBoardParticipantsModalOpen,
  setCheckListModalClose,
  setCheckListModalOpen,
  setAttachModalClose,
  setAttachModalOpen,
  addParticipant,
  deleteParticipant,
} = cardSlice.actions;

export default cardSlice.reducer;
