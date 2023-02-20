import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../../const/const';
import { ICard } from '../../../types/card';

type TInitialState = {
  card: ICard | null;
  boardParticipantsModalActive: boolean;
  checkListModalActive: boolean;
  attachModalActive: boolean;
  marksModalActive: boolean;
};

const initialState: TInitialState = {
  card: null,
  boardParticipantsModalActive: false,
  checkListModalActive: false,
  attachModalActive: false,
  marksModalActive: false,
};

const cardSlice = createSlice({
  name: NameSpace.card,
  initialState,
  reducers: {
    setCard(state, action) {
      state.card = action.payload;
    },
    resetCard(state) {
      state.card = null;
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
    deleteCheckListFromState(state, action) {
      if (state.card) {
        state.card.checklists = state.card.checklists.filter(
          (checklist) => checklist._id !== action.payload,
        );
      }
    },
    toggleCheckListItemCheckedInState(state, action) {
      if (state.card) {
        const { id, checkListIndex } = action.payload;
        const itemIndex = state.card.checklists[checkListIndex].checkItems.findIndex(
          (item) => item._id === id,
        );
        state.card.checklists[checkListIndex].checkItems[itemIndex].checked =
          !state.card.checklists[checkListIndex].checkItems[itemIndex].checked;
      }
    },
    deleteCheckListItemFromState(state, action) {
      if (state.card) {
        const { id, checkListIndex } = action.payload;
        state.card.checklists[checkListIndex].checkItems = [
          ...state.card.checklists[checkListIndex].checkItems,
        ].filter((item) => item._id !== id);
      }
    },
    deleteAttachmentFromState(state, action) {
      if (state.card) {
        const { id } = action.payload;
        state.card.attachments = [...state.card.attachments].filter((item) => item._id !== id);
      }
    },
    updateMarksIdArrayInState(state, action) {
      if (state.card) {
        state.card.marks = action.payload;
      }
    },
    toggleMarkCheckedInState(state, action) {
      if (state.card) {
        const { id, checked } = action.payload;
        if (checked) {
          state.card.marks.push(id);
        } else {
          state.card.marks = [...state.card.marks].filter((item) => item !== id);
        }
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
    setMarksModalOpen(state) {
      state.marksModalActive = true;
    },
    setMarksModalClose(state) {
      state.marksModalActive = false;
    },
  },
});

export const {
  setCard,
  resetCard,
  setBoardParticipantsModalClose,
  setBoardParticipantsModalOpen,
  setCheckListModalClose,
  setCheckListModalOpen,
  setAttachModalClose,
  setAttachModalOpen,
  addParticipant,
  deleteParticipant,
  deleteCheckListFromState,
  toggleCheckListItemCheckedInState,
  updateMarksIdArrayInState,
  toggleMarkCheckedInState,
  deleteCheckListItemFromState,
  deleteAttachmentFromState,
  setMarksModalClose,
  setMarksModalOpen,
} = cardSlice.actions;

export default cardSlice.reducer;
