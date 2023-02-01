import './column.scss';
import { DragEvent, useCallback, useEffect, useState } from 'react';

import ColumnCard from '../ColumnCard';
import { IColumnCard, IColumn } from '../../types/columns';

type ColumnProps = {
  column: IColumn;
  cards: IColumnCard[];
  updateCards: (cards: IColumnCard[]) => void;
};
function Column({ column, cards, updateCards }: ColumnProps) {
  const [currentDragCard, setCurrentDragCard] = useState<IColumnCard | null>(null);
  const [lastTargetCard, setLastTargetCard] = useState<IColumnCard | null>(null);

  const handleDragStart = useCallback((e: DragEvent<HTMLLIElement>, card: IColumnCard) => {
    console.log(card);
    setCurrentDragCard(card);
  }, []);

  const handleDragEnd = useCallback((e: DragEvent<HTMLLIElement>, card: IColumnCard) => {
    // console.log(card.title, card.position);
  }, []);

  const handleDragOver = useCallback((e: DragEvent<HTMLLIElement>, card: IColumnCard) => {
    e.preventDefault();
    setLastTargetCard(card);
  }, []);
  function sortCardList(items: IColumnCard[]) {
    const newArr = [...items];
    console.log(
      'newArr:',
      newArr.sort((a, b) => a.position - b.position),
    );
    return newArr;
  }
  const handleDrop = useCallback(
    (e: DragEvent<HTMLLIElement>, card: IColumnCard) => {
      e.preventDefault();
      updateCards(
        sortCardList(
          cards.map((el) => {
            if (el.id === card.id && currentDragCard) {
              return { ...el, position: currentDragCard.position };
            }
            if (currentDragCard && el.id === currentDragCard.id) {
              return { ...el, position: card.position };
            }
            return el;
          }),
        ),
      );
    },
    [currentDragCard],
  );
  
  useEffect(() => {
    console.log('cardList:', cards);
  }, [cards]);

  return (
    <li className="column" draggable>
      <div className="column__header">
        <h2 className="column__title">{column.title}</h2>
        <button className="column__actions" type="button">
          ...
        </button>
      </div>
      <ul className="column__cards">
        {cards.map((card) => (
          <ColumnCard
            key={card.title}
            card={card}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          />
        ))}
      </ul>
      <div className="column__footer">
        <button className="column__add" type="button">
          + Добавить карточку
        </button>
        <button className="column__create" type="button">
          *
        </button>
      </div>
    </li>
  );
}

export default Column;
