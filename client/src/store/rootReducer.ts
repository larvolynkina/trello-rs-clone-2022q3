import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { cardsApi } from './reducers/cards/cards.api';
import { NameSpace } from '../const/const';
import { userState } from './reducers/userState';
import { boardState } from './reducers/boardState';

export const rootReducer = combineReducers({
  [NameSpace.user]: userState,
  [NameSpace.board]: boardState,
  [cardsApi.reducerPath]: cardsApi.reducer,
});

const setupStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(cardsApi.middleware),
  });

const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

export { store };
