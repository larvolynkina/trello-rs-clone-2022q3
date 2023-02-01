import { AuthorizationStatus } from '../const/const';

export type User = {
  id: string;
  userName: string;
  avatarImage?: string;
  avatarColor?: string;
  email: string;
};

export type UserData = User | null;

export type UserState = {
  userData: UserData;
  authorizationStatus: AuthorizationStatus;
};
