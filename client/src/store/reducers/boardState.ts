import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IColumn, IBoardState, IBoard, ICard } from '../../types/board';
import { getColumns } from '../../API/board';
import { boardId } from '../../const/const';

const initialState: IBoardState = {
  board: {
    _id: boardId,
    title: 'My board',
  },
  columns: [],
  cards: [],
};

export const boardStateSlice = createSlice({
  name: 'dataColumns',
  initialState,
  reducers: {
    changeTitleColumn(state, action: PayloadAction<{ id: string; title: string }>) {
      const columnForChange = state.columns.find((column) => column._id === action.payload.id);
      if (columnForChange) {
        columnForChange.title = action.payload.title;
      } else {
        throw new Error(`Column № ${action.payload.id} not found`);
      }
    },
    updateColumns(state, action: PayloadAction<IColumn[]>) {
      state.columns = action.payload;
    },
    addCardInColumn(state, action: PayloadAction<{card: ICard, id: string}>) {
      const columnForChange = state.columns.find((column) => column._id === action.payload.id);
      if (columnForChange) {
        console.log('lets change', action.payload.card._id)
        columnForChange.cards.push(action.payload.card._id);
      } else {
        throw new Error(`Column № ${action.payload.id} not found`);
      }
    },
    updateCardInColumn(state, action: PayloadAction<ICard[]>) {
      state.cards = action.payload;
    },
  },
});

export const { changeTitleColumn, updateColumns, addCardInColumn, updateCardInColumn } =
  boardStateSlice.actions;

export const boardState = boardStateSlice.reducer;
