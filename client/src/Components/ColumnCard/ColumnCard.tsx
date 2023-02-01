import './columnCard.scss';
import { DragEvent } from 'react';

import { IColumnCard } from '../../types/columns';

type ColumnCardProps = {
  card: IColumnCard;
  onDragStart: (e: DragEvent<HTMLLIElement>, card: IColumnCard) => void;
  onDragEnd: (e: DragEvent<HTMLLIElement>, card: IColumnCard) => void;
  onDragOver: (e: DragEvent<HTMLLIElement>, card: IColumnCard) => void;
  onDrop: (e: DragEvent<HTMLLIElement>, card: IColumnCard) => void;
};

function ColumnCard({ card, onDragStart, onDragEnd, onDragOver, onDrop }: ColumnCardProps) {
  return (
    <li
      draggable
      className="column-card"
      onDragStart={(e) => onDragStart(e, card)}
      onDragEnd={(e) => onDragEnd(e, card)}
      onDragOver={(e) => onDragOver(e, card)}
      onDrop={(e) => onDrop(e, card)}
    >
      {card.title}
    </li>
  );
}

export default ColumnCard;
