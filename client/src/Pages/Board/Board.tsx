import './board.scss';
import { useEffect, useState } from 'react';

import Column from '../../Components/Column';
import { IColumnCard, IColumn } from '../../types/columns';
import dataColumns from './data';

function Board() {
  const [columns, setColumns] = useState<IColumn[]>(dataColumns);
  const [dragCard, setDragCard] = useState<IColumnCard | null>(null);
  const [dropCard, setDropCard] = useState<IColumnCard | null>(null);
  const [dragColumnFromCard, setDragColumnFromCard] = useState<IColumn | null>(null);
  const [dropColumnFromCard, setDropColumnFromCard] = useState<IColumn | null>(null);

  useEffect(() => {
    if (dragColumnFromCard && dragCard && dropCard) {
      const newColumns = [...columns];

      setColumns(
        newColumns.map((column) => {
          if (
            dragColumnFromCard.id === dropColumnFromCard?.id &&
            column.id === dragColumnFromCard.id
          ) {
            const newCards = column.cards;
            const dragIndex = newCards.indexOf(dragCard);
            const tempDropIndex = newCards.indexOf(dropCard);
            const dropIndex = tempDropIndex > dragIndex ? tempDropIndex : tempDropIndex + 1;
            newCards.splice(dragIndex, 1);
            newCards.splice(dropIndex, 0, dragCard);
            return { ...column, cards: newCards };
          }
          if (column.id === dragColumnFromCard.id) {
            const newCards = column.cards;
            const dragIndex = newCards.indexOf(dragCard);
            newCards.splice(dragIndex, 1);
            return { ...column, cards: newCards };
          }
          if (column.id === dropColumnFromCard?.id) {
            const newCards = column.cards;
            const dropIndex = newCards.indexOf(dropCard);
            newCards.splice(dropIndex + 1, 0, dragCard);
            return { ...column, cards: newCards };
          }
          return column;
        }),
      );
    }
  }, [dropColumnFromCard, dropCard]);

  return (
    <main className="board">
      <aside className="board__aside">board aside</aside>
      <div className="board__body">
        <div className="board__header">
          <h1 className="board__title">Board name</h1>
          <div className="board__participants">Участники</div>
          <button type="button" className="board__share">
            Поделиться
          </button>
          <button type="button" className="board__menu">
            ...
          </button>
        </div>

        <ul className="board__columns">
          {columns.map((column) => (
            <Column
              key={column.id}
              column={column}
              cards={column.cards}
              setDragCard={setDragCard}
              setDropCard={setDropCard}
              setDragColumnFromCard={setDragColumnFromCard}
              dragCard={dragCard}
              setDropColumn={setDropColumnFromCard}
            />
          ))}
        </ul>
      </div>
    </main>
  );
}

export default Board;
