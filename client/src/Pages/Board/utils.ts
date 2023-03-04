import { DropResult } from 'react-beautiful-dnd';
import { IColumn } from '../../types/board';
import { ICard } from '../../types/card';

type getNewColumnsOrderProps = {
  dragResult: DropResult;
  columnsData: IColumn[];
};

export function getNewColumnsOrder({
  dragResult,
  columnsData,
}: getNewColumnsOrderProps): IColumn[] {
  if (dragResult.destination) {
    const dragIndex = dragResult.source.index;
    const dropIndex = dragResult.destination.index;
    if (dragIndex < dropIndex) {
      const newColumnOrder = [
        ...columnsData.slice(0, dragIndex),
        ...columnsData.slice(dragIndex + 1, dropIndex + 1),
        columnsData[dragIndex],
        ...columnsData.slice(dropIndex + 1),
      ];
      return newColumnOrder;
    }
    if (dragIndex > dropIndex) {
      const newColumnOrder = [
        ...columnsData.slice(0, dropIndex),
        columnsData[dragIndex],
        ...columnsData.slice(dropIndex, dragIndex),
        ...columnsData.slice(dragIndex + 1),
      ];
      return newColumnOrder;
    }
  }
  return [];
}

type getOrderedCardsAndColumnsProps = {
  columns: IColumn[];
  dragResult: DropResult;
};

type updateCardsOrderProps = {
  columnId: string;
  columnCards: string[];
};

type returnColumnsWithOrderedCardsObjects = {
  newColumnsWithForStore: IColumn[];
  newColumnsForServer: updateCardsOrderProps[];
};

export function getColumnsWithOrderedCards({
  columns,
  dragResult,
}: getOrderedCardsAndColumnsProps): returnColumnsWithOrderedCardsObjects {
  const newColumnsWithForStore: IColumn[] = [];
  const newColumnsForServer: updateCardsOrderProps[] = [];
  const { destination, source, draggableId } = dragResult;
  const columnsCopy = Array.from(columns);

  if (destination && destination.droppableId === source.droppableId) {
    columnsCopy.forEach((column) => {
      if (column._id === source.droppableId) {
        const newCards = Array.from(column.cards);
        newCards.splice(source.index, 1);
        newCards.splice(destination.index, 0, draggableId);
        newColumnsWithForStore.push({ ...column, cards: newCards });
        newColumnsForServer.push({ columnId: column._id, columnCards: newCards });
      } else {
        newColumnsWithForStore.push(column);
      }
    });
  } else if (destination && destination.droppableId !== source.droppableId) {
    columnsCopy.forEach((column) => {
      if (column._id === source.droppableId) {
        const newCards = Array.from(column.cards);
        newCards.splice(source.index, 1);
        newColumnsWithForStore.push({ ...column, cards: newCards });
        newColumnsForServer.push({ columnId: column._id, columnCards: newCards });
      } else if (column._id === destination.droppableId) {
        const newCards = Array.from(column.cards);
        newCards.splice(destination.index, 0, draggableId);
        newColumnsWithForStore.push({ ...column, cards: newCards });
        newColumnsForServer.push({ columnId: column._id, columnCards: newCards });
      } else {
        newColumnsWithForStore.push(column);
      }
    });
  }

  return { newColumnsWithForStore, newColumnsForServer };
}

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

