import './columnCard.scss';
import { DragEvent, useEffect } from 'react';

import { ICard } from '../../types/board';

type ColumnCardProps = {
  card: ICard;
  onDragStart: (card: ICard) => void;
  onDragOver: (e: DragEvent<HTMLLIElement>, card: ICard) => void;
  onDrop: (e: DragEvent<HTMLLIElement>, card: ICard) => void;
  onDragLeave: () => void;
  cardWithStyleID: string;
};

function ColumnCard({
  card,
  onDragStart,
  onDragOver,
  onDrop,
  cardWithStyleID,
  onDragLeave,
}: ColumnCardProps) {
  return (
    <li
      draggable
      className={`column-card ${cardWithStyleID === card._id ? 'column-card--insert' : ''}`}
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
