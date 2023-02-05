import { ICard, IColumn } from '../../types/board';

export function getCardsOfColumn(ids: string[], cards: ICard[]): ICard[] {
  return cards.filter(card => ids.includes(card._id));
}

export function doSomething() {
  throw new Error('error');
}
