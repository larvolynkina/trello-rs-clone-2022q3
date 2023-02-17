export interface IWsBoard {
  _id: string;
  title: string;
  backgroundColor: string;
  backgroundImage: string;
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
  participants: string[];
  boards: IWsBoard[];
  createdAt: string;
  updatedAt: string;
}
