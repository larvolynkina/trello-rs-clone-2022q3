import './column.scss';
import { DragEvent, useState } from 'react';

import ColumnCard from '../ColumnCard';
import { IColumnCard, IColumn } from '../../types/columns';

type ColumnProps = {
  column: IColumn;
  cards: IColumnCard[];
  dragCard: IColumnCard | null;
  setDragCard: (card: IColumnCard) => void;
  setDropCard: (card: IColumnCard) => void;
  setDragColumnFromCard: (column: IColumn) => void;
  setDropColumn: (column: IColumn) => void;
};
function Column({
  column,
  cards,
  dragCard,
  setDragCard,
  setDropCard,
  setDragColumnFromCard,
  setDropColumn,
}: ColumnProps) {
  const [cardWithStyle, setCardWithStyle] = useState<string>('');

  const handleDragStartCard = (card: IColumnCard) => {
    setDragCard(card);
    setDragColumnFromCard(column);
  };

  const handleDragOverCard = (e: DragEvent<HTMLLIElement>, card: IColumnCard) => {
    e.preventDefault();
    if (card.id !== dragCard?.id) {
      setCardWithStyle(card.id);
    } else {
      setCardWithStyle('');
    }
  };

  const handleDragLeaveCard = () => {
    setCardWithStyle('');
  };
  const handleDropCard = (e: DragEvent<HTMLLIElement>, card: IColumnCard) => {
    e.preventDefault();
    setCardWithStyle('');
    setDropCard(card);
  };
  const handleDragOverColumn = () => {
    // console.log('over', column.id)
    // setDropColumn(column);
  };
  const handleDropColumn = (e: DragEvent<HTMLLIElement>) => {
    e.preventDefault();
    setDropColumn(column);
  };

  // useEffect(() => {
  //   if (dragCard) {
  //     console.log('current drop column: ', dropColumn);
  //     if (dropColumn) {
  //       console.log('update from effect');
  //       updateCards(dragCard, dropColumn);
  //     }
  //   }
  // }, [dropColumn]);

  return (
    <li className="column" onDragOver={handleDragOverColumn} onDrop={handleDropColumn}>
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
            onDragStart={handleDragStartCard}
            onDragOver={handleDragOverCard}
            onDrop={handleDropCard}
            onDragLeave={handleDragLeaveCard}
            cardWithStyle={cardWithStyle}
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
