import './column.scss';
import {
  ChangeEvent,
  DragEvent,
  KeyboardEvent,
  useState,
  useEffect,
  MouseEvent,
  useRef,
} from 'react';

import { RootState } from '../../store/rootReducer';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { changeTitleColumn, addCardInColumn } from '../../store/reducers/boardState';

import ColumnCard from '../ColumnCard';
import AddCardOrColumnForm from '../AddCardOrColumnForm';
import { IColumn, ICard } from '../../types/board';
import { AddButtonsOnBoardText, userId } from '../../const/const';
import { createCard, updateTitleColumn } from '../../API/board';
import { getCardsOfColumn } from './utils';

type ColumnProps = {
  boardId: string;
  column: IColumn;
  cardIds: string[];
  dragCard: ICard | null;
  setDragCard: (card: ICard) => void;
  setDropCard: (card: ICard) => void;
  setDragColumnFromCard: (column: IColumn) => void;
  setDropColumnFromCard: (column: IColumn) => void;
  openColumnMenu: (e: MouseEvent<HTMLButtonElement>, column: IColumn) => void;
  dragColumn: IColumn | null;
  setDragColum: (column: IColumn | null) => void;
  setDropColum: (column: IColumn | null) => void;
};
function Column({
  boardId,
  column,
  cardIds,
  dragCard,
  setDragCard,
  setDropCard,
  setDragColumnFromCard,
  setDropColumnFromCard,
  openColumnMenu,
  dragColumn,
  setDragColum,
  setDropColum,
}: ColumnProps) {
  const { cardsData } = useAppSelector((state: RootState) => state.BOARD);
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState(column.title);
  const [cardWithStyleID, setCardWithStyleID] = useState<string>('');
  const [isOpenAddForm, setIsOpenAddForm] = useState(false);
  const [cards, setCards] = useState<ICard[]>([]);
  const [isEditTitle, setIsEditTitle] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [columnWithStyleID, setColumnWithStyleID] = useState<string>('');

  useEffect(() => {
    setCards(getCardsOfColumn(cardIds, cardsData));
  }, [cardsData, column]);

  const handleDragStartCard = (e: DragEvent<HTMLLIElement>, card: ICard) => {
    e.stopPropagation();
    setDragCard(card);
    setDragColumnFromCard(column);
  };

  const handleDragOverCard = (e: DragEvent<HTMLLIElement>, card: ICard) => {
    e.preventDefault();
    if (dragCard) {
      if (card._id !== dragCard._id) {
        setCardWithStyleID(card._id);
      } else {
        setCardWithStyleID('');
      }
    }
  };

  const handleDragLeaveCard = () => {
    setCardWithStyleID('');
  };
  const handleDropCard = (e: DragEvent<HTMLLIElement>, card: ICard) => {
    e.preventDefault();
    if (dragCard) {
      setCardWithStyleID('');
    }

    setDropCard(card);
  };

  const handleDropColumn = (e: DragEvent<HTMLLIElement>) => {
    e.preventDefault();
    setDropColumnFromCard(column);
    setColumnWithStyleID('');
    if (dragColumn) {
      setDropColum(column);
    }
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
    setIsEditTitle(false);
    if (userId && boardId && title)
      updateTitleColumn(userId, boardId, column._id, title).then((res) => {
        if (!(res instanceof Error)) {
          dispatch(changeTitleColumn({ id: column._id, title }));
        }
      });
  };
  const handleClickTitleWrapper = () => {
    setIsEditTitle(true);
    inputRef.current?.focus();
  };
  const handleDragColumn = () => {
    setDragColum(column);
  };
  const handleDragOverColumn = (e: DragEvent<HTMLLIElement>) => {
    e.preventDefault();
    if (dragColumn) {
      if (dragColumn._id !== column._id) {
        setColumnWithStyleID(column._id);
      }
    }
  };
  const handleDragLeaveColumn = () => {
    setColumnWithStyleID('');
  };
  return (
    <li
      draggable
      className={`column ${columnWithStyleID === column._id ? 'column--insert' : ''}`}
      onDragStart={handleDragColumn}
      onDrop={handleDropColumn}
      onDragEnter={(e) => {
        stopPrevent(e);
      }}
      onDragOver={handleDragOverColumn}
      onDragLeave={handleDragLeaveColumn}
    >
      <div className="column__header">
        <button
          type="button"
          onClick={handleClickTitleWrapper}
          className={
            isEditTitle
              ? 'column__title-wrapper column__title-wrapper--hidden'
              : 'column__title-wrapper'
          }
        >
          Редактировать заголовок списка
        </button>
        <input
          type="text"
          className="column__title"
          ref={inputRef}
          value={title}
          onChange={(e) => handleChangeTitle(e)}
          onFocus={(e) => {
            e.target.select();
          }}
          onKeyUp={(e) => handleTitleKeyUp(e)}
          onBlur={updateTitleOnServerAndStore}
        />
        <button
          className="column__actions"
          type="button"
          onClick={(e) => openColumnMenu(e, column)}
        >
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
