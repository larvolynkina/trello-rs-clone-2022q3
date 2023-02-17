import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IColumn, IBoardState, ICard, IBoard } from '../../../types/board';
import { IUser } from '../../../types/card';

const initialState: IBoardState = {
  boardData: {
    _id: '',
    title: '',
  },
  participantsData: [],
  columnsData: [],
  cardsData: [],
  openMenuCardArgs: {
    boardId: '',
    cardId: '',
  },
};

export const boardStateSlice = createSlice({
  name: 'dataColumns',
  initialState,
  reducers: {
    updateBoardDetails(state, action: PayloadAction<IBoard>) {
      state.boardData = action.payload;
    },
    updateParticipantsInStore(state, action: PayloadAction<IUser[]>) {
      state.participantsData = action.payload;
    },
    addParticipantsInStore(state, action: PayloadAction<IUser[]>) {
      state.participantsData.push(...action.payload);
    },
    changeTitleColumnInStore(state, action: PayloadAction<{ id: string; title: string }>) {
      const columnForChange = state.columnsData.find((column) => column._id === action.payload.id);
      if (columnForChange) {
        columnForChange.title = action.payload.title;
      } else {
        throw new Error(`Column № ${action.payload.id} not found`);
      }
    },
    deleteColumnFromStore(state, action: PayloadAction<{ columnId: string }>) {
      state.columnsData = state.columnsData.filter(
        (column) => column._id !== action.payload.columnId,
      );
      state.boardData.columns = state.boardData.columns?.filter(
        (columnId) => columnId !== action.payload.columnId,
      );
    },
    updateColumnsInStore(state, action: PayloadAction<IColumn[]>) {
      state.columnsData = action.payload;
    },
    createColumnInStore(state, action: PayloadAction<{ column: IColumn; boardId: string }>) {
      state.columnsData.push(action.payload.column);
      state.boardData.columns?.push(action.payload.boardId);
    },
    updateCardInColumn(state, action: PayloadAction<ICard[]>) {
      state.cardsData = action.payload;
    },
    addCardInColumn(state, action: PayloadAction<{ card: ICard; id: string }>) {
      const columnForChange = state.columnsData.find((column) => column._id === action.payload.id);
      if (columnForChange) {
        columnForChange.cards.push(action.payload.card._id);
      } else {
        throw new Error(`Column № ${action.payload.id} not found`);
      }
      state.cardsData = [...state.cardsData, action.payload.card];
    },
    // updateCardTitleInStore(state, action: PayloadAction) {},
    updateOpenMenuCardArgs(
      state,
      action: PayloadAction<{ boardId: string; cardId: string; title: string }>,
    ) {
      state.openMenuCardArgs = action.payload;
    },
  },
});

export const {
  changeTitleColumnInStore,
  createColumnInStore,
  updateColumnsInStore,
  addCardInColumn,
  updateCardInColumn,
  updateBoardDetails,
  deleteColumnFromStore,
  updateParticipantsInStore,
  addParticipantsInStore,
  updateOpenMenuCardArgs,
} = boardStateSlice.actions;

export const boardState = boardStateSlice.reducer;
