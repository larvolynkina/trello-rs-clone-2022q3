import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthorizationStatus, NameSpace } from '../../const/const';

import { User, UserState } from '../../types/userData';

const initialState: UserState = {
  userData: null,
  authorizationStatus: AuthorizationStatus.Unknown,
  isLoading: false,
};

export const userStateSlice = createSlice({
  name: NameSpace.user,
  initialState,
  reducers: {
    requireAuthorization(state, action: PayloadAction<AuthorizationStatus>) {
      state.authorizationStatus = action.payload;
    },
    requireLogout(state) {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
    },
    loadUserData(state, action: PayloadAction<User>) {
      state.userData = action.payload;
    },
    removeUserData(state) {
      state.userData = null;
    },
    setIsLoadingUserData(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
});

export const {
  requireAuthorization,
  requireLogout,
  loadUserData,
  removeUserData,
  setIsLoadingUserData,
} = userStateSlice.actions;

export const userState = userStateSlice.reducer;
