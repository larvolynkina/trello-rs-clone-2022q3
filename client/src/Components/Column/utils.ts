import { ICard } from '../../types/board';

export function getCardsOfColumn(ids: string[], cards: ICard[]): ICard[] | [] {
  if (ids.length > 0 && cards.length > 0) {
    // eslint-disable-next-line
    const result = ids.map((id) => cards.find((card) => card._id === id)!);
    for (let i = 0; i < result.length; i +=1 ) {
      if (result[i] === undefined) return [];
    };
    return result;
  }
  return [];
}

export function doSomething() {
  throw new Error('error');
}
