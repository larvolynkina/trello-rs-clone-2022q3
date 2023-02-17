import './columnCard.scss';
import { DragEvent, MouseEvent } from 'react';
import { useSearchParams  } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { updateOpenMenuCardArgs } from '../../../store/reducers/board/boardState';
import { ICard } from '../../../types/board';

type ColumnCardProps = {
  card: ICard;
  onDragStart: (e: DragEvent<HTMLLIElement>, card: ICard) => void;
  onDragOver: (e: DragEvent<HTMLLIElement>, card: ICard) => void;
  onDrop: (e: DragEvent<HTMLLIElement>, card: ICard) => void;
  onDragLeave: () => void;
  cardWithStyleID: string;
  openCardMenu: (e: MouseEvent<HTMLElement>) => void;
};

function ColumnCard({
  card,
  onDragStart,
  onDragOver,
  onDrop,
  cardWithStyleID,
  onDragLeave,
  openCardMenu,
}: ColumnCardProps) {
  const dispatch = useAppDispatch();
  const { openMenuCardArgs } = useAppSelector((state) => state.BOARD);
  const [, setSearchParams] = useSearchParams();

  const handleContextMenu = (e: MouseEvent<HTMLElement>) => {
    openCardMenu(e);
    if (card._id) {
      const title = openMenuCardArgs.title || '';
      dispatch(updateOpenMenuCardArgs({...openMenuCardArgs, cardId: card._id, title}))
    }
  };

  const handleOpenCard = () => {
    setSearchParams({'card': card._id});
  };
  return (
    <li
      draggable
      className={`column-card ${cardWithStyleID === card._id ? 'column-card--insert' : ''}`}
      onDragStart={(e) => onDragStart(e, card)}
      onDragOver={(e) => onDragOver(e, card)}
      onDrop={(e) => onDrop(e, card)}
      onDragLeave={() => onDragLeave()}
      onContextMenu={(e) => handleContextMenu(e)}
      onClick={handleOpenCard}
      onKeyUp={handleOpenCard}
      aria-hidden="true"
    >
      {card.title}
      <button type="button" className="column-card__pensil" onClick={(e) => handleContextMenu(e)}>
        Открыть меню
      </button>
    </li>
  );
}

export default ColumnCard;
