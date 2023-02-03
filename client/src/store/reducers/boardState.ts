import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IColumn, IColumnState } from '../../types/board';
import { getColumns } from '../../API/board';

const initialState: IColumnState = {
  columns: [],
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
    updateColumn(state, action: PayloadAction<IColumn[]>) {
      state.columns = action.payload;
    },
    addCardInColumn(state, action: PayloadAction<{ id: string; title: string }>) {
      const columnForChange = state.columns.find((column) => column._id === action.payload.id);
      if (columnForChange) {
        const newId = String(Date.now());
        columnForChange.cards.push(newId);
      } else {
        throw new Error(`Column № ${action.payload.id} not found`);
      }
    },
  },
});

export const { changeTitleColumn, updateColumn, addCardInColumn } = boardStateSlice.actions;

export const boardState = boardStateSlice.reducer;
