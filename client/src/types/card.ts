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

export interface IMark {
  color: string;
  text?: string;
  checked: boolean;
}

export interface ICheckItem {
  title: string;
  checked: boolean;
}

export interface IChecklist {
  title: string;
  checkItems: ICheckItem[];
}

export interface IAttachment {
    type: 'link' | 'file',
    url: string,
    date: Date,
}

export interface ICard {
  date: IDate;
  _id: string;
  title: string;
  description: string;
  archived: boolean;
  participants: string[];
  marks: IMark[];
  coverColor: string;
  coverImg: string;
  coverSize: string;
  activities: IActivity[];
  attachments: IAttachment[];
  checklists: IChecklist[];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}