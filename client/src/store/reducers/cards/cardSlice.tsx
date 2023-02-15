import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../../const/const';

const cardSlice = createSlice({
  name: NameSpace.card,
  initialState: {
    boardParticipantsModalActive: false,
    checkListModalActive: false,
    attachModalActive: false,
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
    setAttachModalOpen(state) {
      state.attachModalActive = true;
    },
    setAttachModalClose(state) {
      state.attachModalActive = false;
    },
  },
});

export const {
  setBoardParticipantsModalClose,
  setBoardParticipantsModalOpen,
  setCheckListModalClose,
  setCheckListModalOpen,
  setAttachModalClose,
  setAttachModalOpen,
} = cardSlice.actions;

export default cardSlice.reducer;
