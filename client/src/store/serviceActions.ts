import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosInstance } from 'axios';
import { toast } from 'react-toastify';

import { APIRoute, AuthorizationStatus, NameSpace } from '../const/const';
import { dropToken, saveToken } from '../services/token';
import { User, LoginData, SignUpData } from '../types/userData';
import {
  loadUserData,
  removeUserData,
  requireAuthorization,
  requireLogout,
  setIsLoadingUserData,
} from './reducers/userState';
import { AppDispatch, RootState } from './rootReducer';

const SERVER_CONNECTION_ERROR = 'Please, check server connection!';

type ErrorMessage = { message: string };

const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState;
  dispatch: AppDispatch;
  extra: AxiosInstance;
}>();

export const checkAuthAction = createAppAsyncThunk(
  `${NameSpace.user}/checkAuthAction`,
  async (_, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<User>(APIRoute.me);
      dispatch(loadUserData(data));
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch (err) {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
      if (axios.isAxiosError<ErrorMessage>(err) && err.code === 'ERR_NETWORK') {
        toast.error(SERVER_CONNECTION_ERROR);
      }
    }
  },
);

export const loginAction = createAppAsyncThunk(
  `${NameSpace.user}/loginAction`,
  async (loginData: LoginData, { dispatch, extra: api }) => {
    try {
      dispatch(setIsLoadingUserData(true));
      const { data } = await api.post<User>(APIRoute.login, loginData);

      saveToken(data.token);
      dispatch(loadUserData(data));
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(setIsLoadingUserData(false));
    } catch (err) {
      if (axios.isAxiosError<ErrorMessage>(err)) {
        const message = err.response?.data.message || SERVER_CONNECTION_ERROR;
        toast.error(message);
      }
      dispatch(setIsLoadingUserData(false));
    }
  },
);

export const signUpAction = createAppAsyncThunk(
  `${NameSpace.user}/signUpAction`,
  async (signUpData: SignUpData, { dispatch, extra: api }) => {
    try {
      dispatch(setIsLoadingUserData(true));
      const { data } = await api.post<User>(APIRoute.signup, signUpData);

      saveToken(data.token);
      dispatch(loadUserData(data));
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(setIsLoadingUserData(false));
    } catch (err) {
      if (axios.isAxiosError<ErrorMessage>(err)) {
        const message = err.response?.data.message || SERVER_CONNECTION_ERROR;
        toast.error(message);
      }
      dispatch(setIsLoadingUserData(false));
    }
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
