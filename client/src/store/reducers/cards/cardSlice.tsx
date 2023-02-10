import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../../const/const';

const cardSlice = createSlice({
  name: NameSpace.card,
  initialState: {
    boardParticipantsModalActive: false,
  },
  reducers: {
    setBoardParticipantsModalOpen(state) {
      state.boardParticipantsModalActive = true;
    },
    setBoardParticipantsModalClose(state) {
      state.boardParticipantsModalActive = false;
    },
  },
});

export const {
  setBoardParticipantsModalClose,
  setBoardParticipantsModalOpen,
} = cardSlice.actions;

export default cardSlice.reducer;
