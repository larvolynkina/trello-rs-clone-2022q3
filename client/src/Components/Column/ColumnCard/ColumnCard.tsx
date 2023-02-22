import './columnCard.scss';
import { MouseEvent, KeyboardEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Draggable } from 'react-beautiful-dnd';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { updateOpenMenuCardArgs } from '../../../store/reducers/board/boardState';
import { ICard } from '../../../types/card';

type ColumnCardProps = {
  card: ICard;
  index: number;
  openCardMenu: (e: MouseEvent<HTMLElement>) => void;
};

function ColumnCard({
  card,
  index,
  openCardMenu,
}: ColumnCardProps) {
  const dispatch = useAppDispatch();
  const { openMenuCardArgs } = useAppSelector((state) => state.BOARD);
  const [, setSearchParams] = useSearchParams();

  const handleContextMenu = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    openCardMenu(e);
    if (card._id) {
      dispatch(updateOpenMenuCardArgs({ ...openMenuCardArgs, cardId: card._id }));
    }
  };

  const handleOpenCard = () => {
    setSearchParams({ card: card._id });
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLLIElement>) => {
    if (e.key === 'enter') {
      setSearchParams({ card: card._id });
    }
  };

  return (
    <Draggable draggableId={card._id} index={index}>
      {(provided, snapshot) => (
        <li
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={`column-card ${snapshot.isDragging ? 'column-card--is-dragging' : '' }` }
          onContextMenu={(e) => handleContextMenu(e)}
          onClick={handleOpenCard}
          onKeyUp={(e) => handleKeyDown(e)}
          aria-hidden="true"
        >
          {card.title}
          <button
            type="button"
            className="column-card__pensil"
            onClick={(e) => handleContextMenu(e)}
          >
            Открыть меню
          </button>
        </li>
      )}
    </Draggable>
  );
}

export default ColumnCard;
