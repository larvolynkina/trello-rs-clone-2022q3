import { IActivity } from './card';

export interface IWsBoard {
  _id: string;
  title: string;
  backgroundColor: string;
  backgroundImage: string;
  activities: IActivity[];
}

export interface IParticipant {
  _id: string;
  avatarColor: string;
  avatarImage: string;
  userName: string;
  email: string;
}

export interface IWorkspace {
  _id: string;
  title: string;
  shortTitle: string;
  description: string;
  websiteAddress: string;
  avatarColor: string;
  avatarImage: string;
  private: boolean;
  owner: string;
  participants: IParticipant[];
  boards: IWsBoard[];
  createdAt: string;
  updatedAt: string;
}
