import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { NameSpace } from '../const/const';
import { userState } from './reducers/userState';
import { dataColumns } from './reducers/dataColumns';

export const rootReducer = combineReducers({
  [NameSpace.user]: userState,
  dataColumns,
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
