import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IColumn, IBoardState, ICard, IBoard } from '../../../types/board';

const initialState: IBoardState = {
  boardData: {
    _id: '',
    title: '',
  },
  columnsData: [],
  cardsData: [],
};

export const boardStateSlice = createSlice({
  name: 'dataColumns',
  initialState,
  reducers: {
    updateBoardDetails(state, action: PayloadAction<IBoard>) {
      state.boardData = action.payload;
    },
    changeTitleColumn(state, action: PayloadAction<{ id: string; title: string }>) {
      const columnForChange = state.columnsData.find((column) => column._id === action.payload.id);
      if (columnForChange) {
        columnForChange.title = action.payload.title;
      } else {
        throw new Error(`Column № ${action.payload.id} not found`);
      }
    },
    updateColumns(state, action: PayloadAction<IColumn[]>) {
      state.columnsData = action.payload;
    },
    createColumnInStore(state, action: PayloadAction<string>) {
      // state.columnsData.push(action.payload);
      state.boardData.columns?.push(action.payload);
      console.log(state.boardData.columns);
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
  },
});

export const {
  changeTitleColumn,
  createColumnInStore,
  updateColumns,
  addCardInColumn,
  updateCardInColumn,
  updateBoardDetails,
} = boardStateSlice.actions;

export const boardState = boardStateSlice.reducer;
