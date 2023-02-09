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

import {
  useCreateCardMutation,
  useGetCardsOnBoardQuery,
  useUpdateTitleColumnMutation,
} from '../../store/reducers/board/board.api';

import ColumnCard from '../ColumnCard';
import AddCardOrColumnForm from '../AddCardOrColumnForm';
import { IColumn, ICard } from '../../types/board';
import { AddButtonsOnBoardText, userId } from '../../const/const';
import { getCardsOfColumn } from './utils';

type ColumnProps = {
  boardId: string;
  column: IColumn;
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
  const { data: cardsData } = useGetCardsOnBoardQuery(boardId);
  const [createCard, { isError: errorCreateCard }] = useCreateCardMutation();
  const [updateTitleColumn, { isError: errorUpdateTitleColumn }] = useUpdateTitleColumnMutation();
  const [title, setTitle] = useState(column.title);
  const [cardWithStyleID, setCardWithStyleID] = useState<string>('');
  const [isOpenAddForm, setIsOpenAddForm] = useState(false);
  const [cards, setCards] = useState<ICard[]>([]);
  const [isEditTitle, setIsEditTitle] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [columnWithStyleID, setColumnWithStyleID] = useState<string>('');

  useEffect(() => {
    if (cardsData) {
      setCards(getCardsOfColumn(column.cards, cardsData));
    }
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

  const saveCard = async (cardTitle: string) => {
    setIsOpenAddForm(false);
    if (cardTitle) {
      await createCard({ boardId, columnId: column._id, title: cardTitle }).unwrap();
      if (errorCreateCard) {
        throw new Error('Ошибка создания карточки');
      }
    }
  };
  const updateTitleOnServerAndStore = async () => {
    setIsEditTitle(false);
    if (userId && boardId && title)
      await updateTitleColumn({ boardId, columnId: column._id, title }).unwrap();
    if (errorUpdateTitleColumn) {
      throw new Error('Ошибка изменения заголовка списка');
    }
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
        {cards &&
          cards.map((card) => (
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
