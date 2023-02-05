import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { APIRoute, AuthorizationStatus, NameSpace } from '../const/const';
import { dropToken, saveToken } from '../services/token';
import { User, LoginData, SignUpData } from '../types/userData';
import {
  loadUserData,
  removeUserData,
  requireAuthorization,
  requireLogout,
} from './reducers/userState';
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

export const signUpAction = createAppAsyncThunk(
  `${NameSpace.user}/signUpAction`,
  async (signUpData: SignUpData, { dispatch, extra: api }) => {
    const { data } = await api.post<User>(APIRoute.signup, signUpData);

    saveToken(data.token);
    dispatch(loadUserData(data));
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
  },
);

export const logoutAction = createAppAsyncThunk(
  `${NameSpace.user}/logoutAction`,
  (_, { dispatch }) => {
    dropToken();
    dispatch(requireLogout());
    dispatch(removeUserData());
  },
);
