import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { NameSpace } from '../const/const';
import { userState } from './reducers/userState';
import { boardState } from './reducers/board/boardState';
import { boardApi } from './reducers/board/board.api';

export const rootReducer = combineReducers({
  [NameSpace.user]: userState,
  [NameSpace.board]: boardState,
  [boardApi.reducerPath]: boardApi.reducer,
});

const setupStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(boardApi.middleware),
  });

const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

export { store };
