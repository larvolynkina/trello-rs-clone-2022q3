import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

import { getToken } from './token';
import { AppStore } from '../store/rootReducer';
import { requireAuthorization } from '../store/reducers/userState';
import { AuthorizationStatus } from '../const/const';

const SERVER_URL = 'http://localhost:3001/';
const REQUEST_TIMEOUT = 5000;

enum HttpCode {
  Unauthorized = 401,
}

let store: AppStore;

export const injectStore = (_store: AppStore) => {
  store = _store;
};

const onUnauthorized = () => store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));

const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: SERVER_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.response.use(
    (response: AxiosResponse) => response,

    (err: AxiosError) => {
      const { response } = err;

      if (response?.status === HttpCode.Unauthorized) onUnauthorized();

      return Promise.reject(err);
    },
  );

  api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = getToken();

    if (token) {
      const { headers } = config;
      headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  return api;
};

export default createAPI;
