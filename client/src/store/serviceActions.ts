import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { APIRoute, AuthorizationStatus, NameSpace } from '../const/const';
import { saveToken } from '../services/token';
import { User, LoginData } from '../types/userData';
import { loadUserData, requireAuthorization } from './reducers/userState';
import { AppDispatch, RootState } from './rootReducer';

const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState;
  dispatch: AppDispatch;
  extra: AxiosInstance;
}>();

export const checkAuthAction = createAppAsyncThunk(
  `${NameSpace.user}/checkAuthAction`,
  async (_, { dispatch, extra: api }) => {
    const { data } = await api.get<User>(APIRoute.me);
    if (data) {
      dispatch(loadUserData(data));
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } else {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAppAsyncThunk(
  `${NameSpace.user}/loginAction`,
  async (loginData: LoginData, { dispatch, extra: api }) => {
    const { data } = await api.post<User>(APIRoute.login, loginData);

    saveToken(data.token);
    dispatch(loadUserData(data));
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
  },
);
