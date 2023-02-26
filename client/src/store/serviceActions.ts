import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosInstance } from 'axios';
import { toast } from 'react-toastify';

import { APIRoute, AuthorizationStatus, NameSpace, SERVER_URL } from '../const/const';
import { dropToken, saveToken } from '../services/token';
import { ErrorMessage } from '../types/Error';
import {
  User,
  LoginData,
  SignUpData,
  NewUserName,
  ChangePasswordData,
  UserAvatarData,
} from '../types/userData';
import {
  loadUserData,
  removeUserData,
  requireAuthorization,
  requireLogout,
  setIsLoadingUserData,
} from './reducers/userState';
import { AppDispatch, RootState } from './rootReducer';

const SERVER_CONNECTION_ERROR = 'Please, check server connection!';

export const UNKNOWN_ERROR = 'Oops, something went wrong!';

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
        const message = err.response?.data.message || UNKNOWN_ERROR;
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
        const message = err.response?.data.message || UNKNOWN_ERROR;
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

export const changeUserNameAction = createAppAsyncThunk(
  `${NameSpace.user}/changeUserNameAction`,
  async (newName: NewUserName, { dispatch, extra: api }) => {
    try {
      dispatch(setIsLoadingUserData(true));
      const { data } = await api.patch<User>(APIRoute.users, newName);

      dispatch(loadUserData(data));
      dispatch(setIsLoadingUserData(false));
      toast.success('Имя пользователя изменено.');
    } catch (err) {
      if (axios.isAxiosError<ErrorMessage>(err)) {
        const message = err.response?.data.message || UNKNOWN_ERROR;
        toast.error(message);
      }
      dispatch(setIsLoadingUserData(false));
    }
  },
);

export const changeUserPasswordAction = createAppAsyncThunk(
  `${NameSpace.user}/changeUserPasswordAction`,
  async (passwordData: ChangePasswordData, { dispatch, getState, extra: api }) => {
    try {
      dispatch(setIsLoadingUserData(true));
      const { userData } = getState().USER;
      await api.patch<User>(`${APIRoute.users}/${userData?._id}`, passwordData);
      dispatch(setIsLoadingUserData(false));
      toast.success('Пароль успешно изменен!');
    } catch (err) {
      if (axios.isAxiosError<ErrorMessage>(err)) {
        const message = err.response?.data.message || UNKNOWN_ERROR;
        toast.error(message);
      }
      dispatch(setIsLoadingUserData(false));
    }
  },
);

export const changeAvatarColorAction = createAppAsyncThunk(
  `${NameSpace.user}/changeAvatarColorAction`,
  async (color: string, { dispatch, extra: api }) => {
    try {
      const avatarData: UserAvatarData = {
        avatarColor: color,
        avatarImage: '',
      };

      dispatch(setIsLoadingUserData(true));
      const { data } = await api.patch<User>(`${APIRoute.users}/avatar`, avatarData);
      dispatch(loadUserData(data));
      dispatch(setIsLoadingUserData(false));
      toast.success('Аватар пользователя успешно обновлен.');
    } catch (err) {
      if (axios.isAxiosError<ErrorMessage>(err)) {
        const message = err.response?.data.message || UNKNOWN_ERROR;
        toast.error(message);
      }
      dispatch(setIsLoadingUserData(false));
    }
  },
);

type UploadResponse = {
  url: string;
  name: string;
};

export const changeAvatarImageAction = createAppAsyncThunk(
  `${NameSpace.user}/changeAvatarImageAction`,
  async (file: File, { dispatch, extra: api }) => {
    try {
      dispatch(setIsLoadingUserData(true));

      const formData: FormData = new FormData();
      formData.append('file', file);

      const { data: uploadData } = await api.post<UploadResponse>(APIRoute.upload, formData);
      const avatarData: UserAvatarData = {
        avatarColor: '',
        avatarImage: `${SERVER_URL}${uploadData.url}`,
      };
      const { data } = await api.patch<User>(`${APIRoute.users}/avatar`, avatarData);
      dispatch(loadUserData(data));
      dispatch(setIsLoadingUserData(false));
      toast.success('Аватар пользователя успешно обновлен.');
    } catch (err) {
      if (axios.isAxiosError<ErrorMessage>(err)) {
        const message = err.response?.data.message || UNKNOWN_ERROR;
        toast.error(message);
      }
      dispatch(setIsLoadingUserData(false));
    }
  },
);
