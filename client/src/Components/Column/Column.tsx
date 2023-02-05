import './column.scss';
import { ChangeEvent, DragEvent, KeyboardEvent, useState, useEffect } from 'react';
import { RootState } from '../../store/rootReducer';
const { cards } = useAppSelector((state: RootState) => state.BOARD);

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { changeTitleColumn, addCardInColumn } from '../../store/reducers/boardState';

import ColumnCard from '../ColumnCard';
import AddCardOrColumnForm from '../AddCardOrColumnForm';
import { IColumn, ICard } from '../../types/board';
import { AddButtonsOnBoardText, userId } from '../../const/const';
import { createCard, updateTitleColumn } from '../../API/board';

type ColumnProps = {
  boardId: string;
  column: IColumn;
  cards: string[];
  dragCard: ICard | null;
  setDragCard: (card: ICard) => void;
  setDropCard: (card: ICard) => void;
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

  useEffect(() => {}, [cards]);
  const handleDragStartCard = (card: ICard) => {
    setDragCard(card);
    setDragColumnFromCard(column);
  };

  const handleDragOverCard = (e: DragEvent<HTMLLIElement>, card: ICard) => {
    e.preventDefault();
    if (card._id !== dragCard?._id) {
      setCardWithStyleID(card._id);
    } else {
      setCardWithStyleID('');
    }
  };

  const handleDragLeaveCard = () => {
    setCardWithStyleID('');
  };
  const handleDropCard = (e: DragEvent<HTMLLIElement>, card: ICard) => {
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
      createCard(userId, boardId, column._id, cardTitle).then((res) => {
        if (!(res instanceof Error)) {
          dispatch(addCardInColumn({ card: res, id: column._id }));
        }
      });
    }
    setIsOpenAddForm(false);
  };
  const updateTitleOnServerAndStore = () => {
    if (userId && boardId && title)
      updateTitleColumn(userId, boardId, column._id, title).then((res) => {
        if (!(res instanceof Error)) {
          console.log('res', res);
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
        {cards.map((card) => (
          <ColumnCard
            key={card._id}
            card={card}
            onDragStart={handleDragStartCard}
            onDragOver={handleDragOverCard}
            onDrop={handleDropCard}
            onDragLeave={handleDragLeaveCard}
            cardWithStyleID={cardWithStyleID}
          />
        ))}
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
