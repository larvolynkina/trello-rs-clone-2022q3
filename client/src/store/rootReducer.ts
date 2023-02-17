import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { cardsApi } from './reducers/cards/cards.api';
import { NameSpace } from '../const/const';
import createAPI from '../services/api';
import { userState } from './reducers/userState';
import { boardState } from './reducers/board/boardState';
import { boardApi } from './reducers/board/board.api';
import { workspaceApi } from './reducers/workspace/workspace.api';
import cardsSlice from './reducers/cards/cardSlice';

export const rootReducer = combineReducers({
  [NameSpace.card]: cardsSlice,
  [NameSpace.user]: userState,
  [NameSpace.board]: boardState,
  [boardApi.reducerPath]: boardApi.reducer,
  [cardsApi.reducerPath]: cardsApi.reducer,
  [workspaceApi.reducerPath]: workspaceApi.reducer,
});

const setupStore = () =>
  configureStore({
    reducer: rootReducer,
    // middleware: getDefaultMiddleware => getDefaultMiddleware().concat(boardApi.middleware),
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: createAPI(),
        },
      }).concat(cardsApi.middleware, boardApi.middleware, workspaceApi.middleware),
  });

const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

export { store };
