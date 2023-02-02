import './column.scss';
import { ChangeEvent, DragEvent, KeyboardEvent, useState } from 'react';
import { useAppDispatch } from '../../hooks/redux'; 
import { changeTitleColumn } from '../../store/reducers/columnsState';

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
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState(column.title);
  const [cardWithStyleID, setCardWithStyleID] = useState<string>('');

  const handleDragStartCard = (card: IColumnCard) => {
    setDragCard(card);
    setDragColumnFromCard(column);
  };

  const handleDragOverCard = (e: DragEvent<HTMLLIElement>, card: IColumnCard) => {
    e.preventDefault();
    if (card.id !== dragCard?.id) {
      setCardWithStyleID(card.id);
    } else {
      setCardWithStyleID('');
    }
  };

  const handleDragLeaveCard = () => {
    setCardWithStyleID('');
  };
  const handleDropCard = (e: DragEvent<HTMLLIElement>, card: IColumnCard) => {
    e.preventDefault();
    setCardWithStyleID('');
    setDropCard(card);
  };

  const handleDropColumn = (e: DragEvent<HTMLLIElement>) => {
    e.preventDefault();
    setDropColumn(column);
  };

  const stopPrevent = (e: DragEvent<HTMLLIElement>) => {
    e.preventDefault();
  };
  const handleTitleKeyUp = (e: KeyboardEvent<HTMLInputElement> ) => {
    if (e.key === 'Enter') {
      e.currentTarget.blur();
    }
  };
  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== '') {
      setTitle(e.target.value)
    }
  }
  return (
    <li
      className="column"
      onDrop={handleDropColumn}
      onDragEnter={(e) => {
        stopPrevent(e);
      }}
      onDragOver={(e) => {
        stopPrevent(e);
      }}
    >
      <div className="column__header">
        <input
          type="text"
          className="column__title"
          value={title}
          onChange={(e) => handleChangeTitle(e)}
          onFocus={(e) => {e.target.select()}}
          onKeyUp={(e) => handleTitleKeyUp(e)}
          onBlur={() => dispatch(changeTitleColumn({id: column.id, title}))}
        />
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
            cardWithStyleID={cardWithStyleID}
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
