import './column.scss';
import { ChangeEvent, DragEvent, KeyboardEvent, useState } from 'react';
import { RootState } from '../../store/rootReducer';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { changeTitleColumn, addCardInColumn } from '../../store/reducers/boardState';

import ColumnCard from '../ColumnCard';
import AddCardOrColumnForm from '../AddCardOrColumnForm';
import { IColumnCard, IColumn } from '../../types/board';
import { AddButtonsOnBoardText, userId } from '../../const/const';
import { updateTitleColumn } from '../../API/board';

type ColumnProps = {
  boardId: string;
  column: IColumn;
  cards: string[];
  dragCard: IColumnCard | null;
  setDragCard: (card: IColumnCard) => void;
  setDropCard: (card: IColumnCard) => void;
  setDragColumnFromCard: (column: IColumn) => void;
  setDropColumn: (column: IColumn) => void;
};
function Column({
  boardId,
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
  const [isOpenAddForm, setIsOpenAddForm] = useState(false);

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
  const handleTitleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.currentTarget.blur();
    }
  };
  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== '') {
      setTitle(e.target.value);
    }
  };

  const saveCard = (cardTitle: string) => {
    if (cardTitle) {
      dispatch(addCardInColumn({ id: column._id, title: cardTitle }));
    }
    setIsOpenAddForm(false);
  };
  const updateTitleOnServerAndStore = () => {
    if (userId && boardId && title)
      updateTitleColumn(userId, boardId, column._id, title).then((res) => {
        if (!(res instanceof Error)) {
          console.log('res', res)
          dispatch(changeTitleColumn({ id: column._id, title }));
        }
      });
  };
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
          onFocus={(e) => {
            e.target.select();
          }}
          onKeyUp={(e) => handleTitleKeyUp(e)}
          onBlur={updateTitleOnServerAndStore}
        />
        <button className="column__actions" type="button">
          ...
        </button>
      </div>
      <ul className="column__cards">
        {/* {cards.map((card) => (
          <ColumnCard
            key={card}
            card={card}
            onDragStart={handleDragStartCard}
            onDragOver={handleDragOverCard}
            onDrop={handleDropCard}
            onDragLeave={handleDragLeaveCard}
            cardWithStyleID={cardWithStyleID}
          />
        ))} */}
      </ul>
      {isOpenAddForm && (
        <AddCardOrColumnForm
          placeholderTextarea="Ввести заголовок для этой карточки"
          textButton="Добавить карточку"
          saveObject={saveCard}
          setIsOpenAddForm={setIsOpenAddForm}
        />
      )}
      {!isOpenAddForm && (
        <div className="column__footer">
          <button className="column__add-card" type="button" onClick={() => setIsOpenAddForm(true)}>
            {AddButtonsOnBoardText.addCard}
          </button>
        </div>
      )}
    </li>
  );
}

export default Column;
