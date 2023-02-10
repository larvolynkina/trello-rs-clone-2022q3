import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../../const/const';

const cardSlice = createSlice({
  name: NameSpace.card,
  initialState: {
    boardParticipantsModalActive: false,
    checkListModalActive: false,
  },
  reducers: {
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
  },
});

export const {
  setBoardParticipantsModalClose,
  setBoardParticipantsModalOpen,
  setCheckListModalClose,
  setCheckListModalOpen,
} = cardSlice.actions;

export default cardSlice.reducer;
