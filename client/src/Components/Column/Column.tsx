import './column.scss';
import { useState } from 'react';

import ColumnCard from '../ColumnCard';
import { IColumnCard, IColumn } from '../../types/columns';

type ColumnProps = {
  column: IColumn;
  cards: IColumnCard[];
};
function Column({ column, cards }: ColumnProps) {
  const [cardList] = useState(cards);

  return (
    <li className="column">
      <div className="column__header">
        <h2 className="column__title">{column.title}</h2>
        <button className="column__actions" type="button">
          ...
        </button>
      </div>
      <ul className="column__cards">
        {cardList.map((card) => (
          <ColumnCard key={card.title} card={card} />
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
