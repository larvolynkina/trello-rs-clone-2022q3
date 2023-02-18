import { IUser } from "./card";
import { IWorkspace } from "./workspace";

export interface IMarks {
  _id: string;
  color: string;
  text: string;
  checked: boolean;
}
export interface IActivities {
  _id: string;
  userId: string;
  action: string;
  date: string;
}

export interface IColumnCard {
  id: string;
  title: string;
}

export interface IColumnParams {
  title: string;
  archived: boolean;
  cards: string[],
  createdAt: string;
  updatedAt: string;
}

export interface IColumn extends IColumnParams {
  _id: string;
}

export interface IBoardQueryParams {
  userId: string;
  workspaceId: string;
  title: string;
  description: string;
}


export interface IBoard {
  _id: string;
  title: string;
  backgroundColor?: string;
  backgroundImage?: string;
  archived?: boolean;
  participants?: string[];
  columns?: string[];
  marks?: IMarks[];
  activities?: IActivities[];
  createdAt?: string;
  updatedAt?: string;
  workspace?: IWorkspace;
}


export interface ICard {
  _id: string;
  title: string;
}

export interface IBoardState {
  boardData: IBoard;
  participantsData: IUser[];
  columnsData: IColumn[];
  cardsData: ICard[];
  openMenuCardArgs: {
    boardId: string;
    cardId: string;
    title: string;
  };
}