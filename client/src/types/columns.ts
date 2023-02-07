export interface IColumnCard {
  id: string;
  title: string;
}

export interface IColumn {
  id: string;
  title: string;
  cards: IColumnCard[];
}

export interface IColumnState {
  columns: IColumn[];
}