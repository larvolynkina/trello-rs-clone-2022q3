import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { NameSpace } from '../const/const';
import { userState } from './reducers/userState';
import { columnsState } from './reducers/columnsState';

export const rootReducer = combineReducers({
  [NameSpace.user]: userState,
  columnsState,
});

const setupStore = () =>
  configureStore({
    reducer: rootReducer,
  });

const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

export { store };
