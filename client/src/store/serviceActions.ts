import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { APIRoute, AuthorizationStatus, NameSpace } from '../const/const';
import { saveToken } from '../services/token';
import { User, LoginData } from '../types/userData';
import { loadUserData, requireAuthorization } from './reducers/userState';
import { AppDispatch } from './rootReducer';

type AppThunkApi = { dispatch: AppDispatch; extra: AxiosInstance };

export const checkAuthAction = createAsyncThunk<void, undefined, AppThunkApi>(
  `${NameSpace.user}/checkAuthAction`,
  async (_, { dispatch, extra: api }) => {
    const { data } = await api.get<User>(APIRoute.me);
    if (data) {
      dispatch(loadUserData(data));
    } else {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk<void, LoginData, AppThunkApi>(
  `${NameSpace.user}/loginAction`,
  async (loginData, { dispatch, extra: api }) => {
    const { data } = await api.post<User>(APIRoute.login, loginData);

    saveToken(data.token);
    dispatch(loadUserData(data));
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
  },
);
