export interface IDate {
  startDate?: Date;
  endDate?: Date;
  completed: boolean;
}

export interface IActivity {
  userId: string;
  action: string;
  _id: string;
  date: Date;
}

export interface ICheckItem {
  title: string;
  checked: boolean;
  _id: string;
}

export interface IChecklist {
  title: string;
  checkItems: ICheckItem[];
  _id: string;
}

export interface IAttachment {
  type: 'link' | 'file';
  url: string;
  date: Date;
  name: string;
  _id: string;
}
export interface IUser {
  _id: string;
  userName: string;
  email: string;
  avatarColor?: string;
  avatarImage?: string;
  workspaces: string[];
  createdAt: Date;
  updatedAt: Date;
  __v: string;
}
export interface ICard {
  date: IDate;
  _id: string;
  title: string;
  description: string;
  archived: boolean;
  participants: IUser[];
  marks: string[];
  coverColor: string;
  coverImg: string;
  coverSize: string;
  activities: IActivity[];
  attachments: IAttachment[];
  checklists: IChecklist[];
  column: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
