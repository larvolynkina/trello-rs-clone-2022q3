import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { NameSpace } from '../const/const';
import createAPI from '../services/api';
import { userState } from './reducers/userState';
import { boardState } from './reducers/boardState';

export const rootReducer = combineReducers({
  [NameSpace.user]: userState,
  [NameSpace.board]: boardState,
});

const setupStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: createAPI(),
        },
      }),
  });

const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

export { store };
