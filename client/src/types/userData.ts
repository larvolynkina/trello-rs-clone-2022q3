import { AuthorizationStatus } from '../const/const';

export type User = {
  _id: string;
  userName: string;
  email: string;
  avatarColor?: string;
  avatarImage?: string;
  workspaces: string[];
  createdAt: Date;
  updatedAt: Date;
  token: string;
  __v: string;
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

export type NewUserName = {
  newUserName: string;
};

export type ChangePasswordData = {
  currentPassword: string;
  newPassword: string;
};

export type UserAvatarData = {
  avatarColor: string;
  avatarImage: string;
};
