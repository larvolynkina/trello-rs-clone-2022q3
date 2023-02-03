import './columnCard.scss';
import { DragEvent } from 'react';

import { IColumnCard } from '../../types/board';

type ColumnCardProps = {
  card: IColumnCard;
  onDragStart: (card: IColumnCard) => void;
  onDragOver: (e: DragEvent<HTMLLIElement>, card: IColumnCard) => void;
  onDrop: (e: DragEvent<HTMLLIElement>, card: IColumnCard) => void;
  onDragLeave: () => void;
  cardWithStyleID: string;
};

function ColumnCard({ card, onDragStart, onDragOver, onDrop, cardWithStyleID, onDragLeave }: ColumnCardProps) {
  return (
    <li
      draggable
      className={`column-card ${cardWithStyleID === card.id ? 'column-card--insert' : ''}`}
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
