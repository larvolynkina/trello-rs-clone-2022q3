import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { SERVER_URL } from '../../../const/const';
import { getToken } from '../../../services/token';
import { IWorkspace } from '../../../types/workspace';

export const workspaceApi = createApi({
  reducerPath: 'workspacesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${SERVER_URL}/workspaces`,
    prepareHeaders: (headers) => {
      const token = getToken();
      headers.set('authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllWorkspaces: builder.query<IWorkspace[], void>({
      query: () => '',
    }),
  }),
});

export const { useGetAllWorkspacesQuery } = workspaceApi;
