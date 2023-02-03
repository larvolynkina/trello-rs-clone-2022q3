import './board.scss';
import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { RootState } from '../../store/rootReducer';
import { updateColumn } from '../../store/reducers/columnsState';

import Column from '../../Components/Column';
import { IColumnCard, IColumn } from '../../types/columns';
import { AddButtonsOnBoardText } from '../../const/const';

function Board() {
  const { columns } = useAppSelector((state: RootState) => state.columnsState);
  const dispatch = useAppDispatch();
  const [dragCard, setDragCard] = useState<IColumnCard | null>(null);
  const [dropCard, setDropCard] = useState<IColumnCard | null>(null);
  const [dragColumnFromCard, setDragColumnFromCard] = useState<IColumn | null>(null);
  const [dropColumnFromCard, setDropColumnFromCard] = useState<IColumn | null>(null);

  useEffect(() => {
    
    if (dragColumnFromCard && dropColumnFromCard && dragCard && dropCard) {
      const newColumns = columns.map((column) => {
        if (
          dragColumnFromCard.id === dropColumnFromCard.id &&
          column.id === dragColumnFromCard.id
        ) {
          const dragIndex = column.cards.indexOf(dragCard);
          const tempDropIndex = column.cards.indexOf(dropCard);
          const dropIndex = tempDropIndex > dragIndex ? tempDropIndex : tempDropIndex + 1;
          const newCards = [...column.cards.slice()];
          newCards.splice(dragIndex, 1);
          newCards.splice(dropIndex, 0, dragCard);
          return { ...column, cards: newCards };
        }
        if (column.id === dragColumnFromCard.id) {
          const dragIndex = column.cards.indexOf(dragCard);
          const newCards = [
            ...column.cards.slice(0, dragIndex),
            ...column.cards.slice(dragIndex + 1),
          ];
          return { ...column, cards: newCards };
        }
        if (column.id === dropColumnFromCard.id) {
          const dropIndex = column.cards.indexOf(dropCard) + 1;
          const newCards = [
            ...column.cards.slice(0, dropIndex),
            dragCard,
            ...column.cards.slice(dropIndex),
          ];
          return { ...column, cards: newCards };
        }
        return column;
      });
      dispatch(updateColumn(newColumns));
      setDragColumnFromCard(null);
      setDropColumnFromCard(null);
      setDragCard(null);
      // setDropCard(null);
    }
  }, [dropColumnFromCard, dropCard]);

  return (
    <main className="board">
      <aside className="board__aside">Рабочее пространство</aside>
      <div className="board__body">
        <div className="board__header">
          <h1 className="board__title">Название доски</h1>
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
          <button type="button" className="board__add-column">
            {columns.length === 0
              ? AddButtonsOnBoardText.addColumn
              : AddButtonsOnBoardText.addOneMoreColumn}
          </button>
        </ul>
      </div>
    </main>
  );
}

export default Board;
