import { ICard } from '../../types/board';

export function getCardsOfColumn(ids: string[], cards: ICard[]): ICard[] | [] {
  if (ids.length > 0 && cards.length > 0) {
    // eslint-disable-next-line
    return ids.map((id) => cards.find((card) => card._id === id)!);
  }
  return [];
}

export function doSomething() {
  throw new Error('error');
}
