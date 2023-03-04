import { IActivity, ICard, IUser } from "./card";
import { IWorkspace } from "./workspace";

export interface IMark {
  color: string;
  text: string;
  _id?: string;
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
  owner?: string;
  columns?: string[];
  marks?: IMark[];
  activities?: IActivity[];
  createdAt?: string;
  updatedAt?: string;
  workspace?: IWorkspace;
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