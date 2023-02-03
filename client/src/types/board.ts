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

// export interface IColumn {
//   id: string;
//   title: string;
//   cards: IColumnCard[];
// }

export interface IColumnState {
  columns: IColumn[];
}

export interface IBoardParams {
  userId: string;
  workspaceId: string;
  title: string;
  description: string;
}

export interface IBoard extends IBoardParams {
  _id: string;
}

export interface ICard {
  _id: string;
  title: string;
}