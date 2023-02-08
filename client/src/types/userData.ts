import { AuthorizationStatus } from '../const/const';

export type User = {
  _id: string;
  userName: string;
  avatarImage: string;
  avatarColor: string;
  email: string;
  token: string;
};

export type UserData = User | null;

export type UserState = {
  userData: UserData;
  authorizationStatus: AuthorizationStatus;
  isLoading: boolean;
};

export type LoginData = {
  email: string;
  password: string;
};

export type SignUpData = {
  userName: string;
} & LoginData;
