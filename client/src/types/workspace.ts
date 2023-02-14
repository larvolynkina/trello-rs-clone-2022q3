import { IBoard } from './board';

export interface IWorkspace {
  _id: string;
  title: string;
  shortTitle: string;
  description: string;
  websiteAddress: string;
  avatarColor: string;
  avatarImage: string;
  private: boolean;
  participants: string[];
  boards: IBoard[];
  createdAt: string;
  updatedAt: string;
}
