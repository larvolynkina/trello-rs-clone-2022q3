import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IColumn, IBoardState, IBoard } from '../../../types/board';
import { ICard, IChecklist, IUser } from '../../../types/card';

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
    title: '',
  },
};

export const boardStateSlice = createSlice({
  name: 'dataColumns',
  initialState,
  reducers: {
    updateBoardDetails(state, action: PayloadAction<IBoard>) {
      state.boardData = action.payload;
    },
    updateBoardBgInStore(
      state,
      action: PayloadAction<{ backgroundImage: string; backgroundColor: string }>,
    ) {
      state.boardData.backgroundImage = action.payload.backgroundImage;
      state.boardData.backgroundColor = action.payload.backgroundColor;
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
      state.boardData.columns = action.payload.map((column) => column._id);
    },
    createColumnInStore(state, action: PayloadAction<{ column: IColumn; boardId: string }>) {
      state.columnsData.push(action.payload.column);
      state.boardData.columns?.push(action.payload.boardId);
    },
    updateCardInColumn(state, action: PayloadAction<ICard[]>) {
      state.cardsData = action.payload;
    },
    deleteCardFromColumnInStore(state, action: PayloadAction<{ cardId: string }>) {
      const parentColumn = state.columnsData.find((column) =>
        column.cards.includes(action.payload.cardId),
      );
      if (parentColumn) {
        parentColumn.cards = parentColumn.cards.filter(
          (cardId) => cardId !== action.payload.cardId,
        );
      }
      state.cardsData = state.cardsData.filter((card) => card._id !== action.payload.cardId);
    },
    addFewCardsInColumn(state, action: PayloadAction<ICard[]>) {
      state.cardsData.push(...action.payload);
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
    updateCardInStore(state, action: PayloadAction<{ card: ICard }>) {
      state.cardsData = state.cardsData.map((card) => {
        if (card._id === action.payload.card._id) {
          return action.payload.card;
        }
        return card;
      });
    },
    updateCardChecklistsInStore(
      state,
      action: PayloadAction<{ cardId: string; checklists: IChecklist[] }>,
    ) {
      const foundCard = state.cardsData.find((card) => card._id === action.payload.cardId);
      if (foundCard) {
        foundCard.checklists = action.payload.checklists;
      }
    },
    updateOpenMenuCardArgs(
      state,
      action: PayloadAction<{ boardId: string; cardId: string; title: string }>,
    ) {
      state.openMenuCardArgs = action.payload;
    },
    addMarkToState(state, action) {
      if (state.boardData.marks) {
        state.boardData.marks.push(action.payload);
      }
    },
    deleteMarkFromState(state, action) {
      if (state.boardData.marks) {
        state.boardData.marks = [
          ...state.boardData.marks.filter((value) => value._id !== action.payload),
        ];
      }
    },
    updateMarkInState(state, action) {
      const { color, text, index } = action.payload;
      if (state.boardData.marks) {
        state.boardData.marks[index].color = color;
        state.boardData.marks[index].text = text;
      }
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
  updateBoardBgInStore,
  addMarkToState,
  deleteMarkFromState,
  updateMarkInState,
  addFewCardsInColumn,
  updateCardInStore,
  deleteCardFromColumnInStore,
  updateCardChecklistsInStore,
} = boardStateSlice.actions;

export const boardState = boardStateSlice.reducer;
