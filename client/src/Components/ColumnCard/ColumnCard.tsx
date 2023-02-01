import './columnCard.scss';
import { DragEvent } from 'react';

import { IColumnCard } from '../../types/columns';

type ColumnCardProps = {
  card: IColumnCard;
  onDragStart: (card: IColumnCard) => void;
  onDragOver: (e: DragEvent<HTMLLIElement>, card: IColumnCard) => void;
  onDrop: (e: DragEvent<HTMLLIElement>, card: IColumnCard) => void;
  onDragLeave: () => void;
  cardWithStyle: string;
};

function ColumnCard({ card, onDragStart, onDragOver, onDrop, cardWithStyle, onDragLeave }: ColumnCardProps) {
  return (
    <li
      draggable
      className={`column-card ${cardWithStyle === card.id ? 'column-card--insert' : ''}`}
      onDragStart={() => onDragStart(card)}
      onDragOver={(e) => onDragOver(e, card)}
      onDrop={(e) => onDrop(e, card)}
      onDragLeave={() => onDragLeave()}
    >
      {card.title}
    </li>
  );
}

export default ColumnCard;
