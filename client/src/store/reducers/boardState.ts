import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IColumn, IBoardState, IBoard, ICard } from '../../types/board';
import { boardId } from '../../const/const';

const initialState: IBoardState = {
  boardData: {
    _id: boardId,
    title: 'My board',
  },
  columnsData: [],
  cardsData: [],
};

export const boardStateSlice = createSlice({
  name: 'dataColumns',
  initialState,
  reducers: {
    changeTitleColumn(state, action: PayloadAction<{ id: string; title: string }>) {
      const columnForChange = state.columnsData.find((column) => column._id === action.payload.id);
      if (columnForChange) {
        columnForChange.title = action.payload.title;
      } else {
        throw new Error(`Column № ${action.payload.id} not found`);
      }
    },
    updateColumns(state, action: PayloadAction<IColumn[]>) {
      console.log('update column: ', action.payload)
      state.columnsData = action.payload;
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
      state.cardsData = [...state.cardsData, action.payload.card]
    },
  },
});

export const { changeTitleColumn, updateColumns, addCardInColumn, updateCardInColumn } =
  boardStateSlice.actions;

export const boardState = boardStateSlice.reducer;
