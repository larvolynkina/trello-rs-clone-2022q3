import './column.scss';
import { ChangeEvent, KeyboardEvent, useState, useEffect, MouseEvent, useRef } from 'react';
import { toast } from 'react-toastify';
import { Draggable, Droppable } from 'react-beautiful-dnd';

import {
  useCreateCardMutation,
  useUpdateTitleColumnMutation,
} from '../../store/reducers/board/board.api';

import { useAppDispatch } from '../../hooks/redux';
import { addCardInColumn, changeTitleColumnInStore } from '../../store/reducers/board/boardState';

import ColumnCard from './ColumnCard';
import AddCardOrColumnForm from './AddCardOrColumnForm';
import { IColumn } from '../../types/board';
import { ICard } from '../../types/card';
import { AddButtonsOnBoardText } from '../../const/const';
import { getCardsOfColumn } from './utils';

type ColumnProps = {
  boardId: string;
  column: IColumn;
  index: number;
  cardsData: ICard[];
  openColumnMenu: (e: MouseEvent<HTMLButtonElement>) => void;
  openCardMenu: (e: MouseEvent<HTMLElement>) => void;
  setIdOpenedColumn: ({ boardId, columnId }: { boardId: string; columnId: string }) => void;
  idOpenedColumn: { boardId: string; columnId: string };
  addCardFromMenu: boolean;
  setAddCardFromMenu: (b: boolean) => void;
};
function Column({
  boardId,
  column,
  index,
  cardsData,
  openColumnMenu,
  openCardMenu,
  setIdOpenedColumn,
  addCardFromMenu,
  idOpenedColumn,
  setAddCardFromMenu,
}: ColumnProps) {
  const [createCard, { isError: errorCreateCard, isLoading: loadingCreateCard }] =
    useCreateCardMutation();
  const [updateTitleColumn, { isError: errorUpdateTitleColumn }] = useUpdateTitleColumnMutation();
  const [title, setTitle] = useState(column.title);
  const [isOpenAddForm, setIsOpenAddForm] = useState(false);
  const [cards, setCards] = useState<ICard[]>([]);
  const [isEditTitle, setIsEditTitle] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (addCardFromMenu && idOpenedColumn.columnId === column._id) {
      setIsOpenAddForm(true);
    }
    setAddCardFromMenu(false);
  }, [addCardFromMenu]);
  useEffect(() => {
    if (cardsData) {
      setCards(getCardsOfColumn(column.cards, cardsData));
    }
  }, [cardsData, column]);

  useEffect(() => {
    if (loadingCreateCard) {
      toast.loading('Добавляем карточку...');
    } else {
      toast.dismiss();
    }
  }, [loadingCreateCard]);

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
      await createCard({ boardId, columnId: column._id, title: cardTitle.trim() })
        .unwrap()
        .then((res) => {
          dispatch(addCardInColumn({ card: res, id: column._id }));
        });
      if (errorCreateCard) {
        throw new Error('Ошибка создания карточки');
      }
    }
  };
  const updateTitleOnServerAndStore = async () => {
    dispatch(changeTitleColumnInStore({ id: column._id, title: title.trim() }));
    setIsEditTitle(false);
    if (boardId && title)
      await updateTitleColumn({ boardId, columnId: column._id, title: title.trim() }).unwrap();
    if (errorUpdateTitleColumn) {
      throw new Error('Ошибка изменения заголовка');
    }
  };

  const handleOpenMenu = (e: MouseEvent<HTMLButtonElement>) => {
    openColumnMenu(e);
    setIdOpenedColumn({ boardId, columnId: column._id });
  };

  useEffect(() => {
    if (isEditTitle && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isEditTitle]);

  return (
    <Draggable draggableId={column._id} index={index}>
      {(providedColumn) => (
        <li className="column" {...providedColumn.draggableProps} ref={providedColumn.innerRef}>
          <div className="column__header" {...providedColumn.dragHandleProps}>
            {!isEditTitle && (
              <h3
                className="column__text-title"
                {...providedColumn.dragHandleProps}
                onClick={() => setIsEditTitle(true)}
                onKeyDown={() => setIsEditTitle(true)}
                aria-hidden="true"
              >
                {title}
              </h3>
            )}
            
              <input
                type="text"
                className={`column__input-title ${! isEditTitle ? 'column__input-title--hidden' : ''}`}
                ref={inputRef}
                value={title}
                onChange={(e) => handleChangeTitle(e)}
                onFocus={(e) => {
                  e.target.select();
                }}
                onKeyUp={(e) => handleTitleKeyUp(e)}
                onBlur={updateTitleOnServerAndStore}
              />
            
            <button className="column__actions" type="button" onClick={handleOpenMenu}>
              ...
            </button>
          </div>
          <Droppable droppableId={column._id} type="card">
            {(provided) => (
              <ul className="column__cards" ref={provided.innerRef}>
                {cards &&
                  cards.map((card, indexCard) => (
                    <ColumnCard
                      key={card._id}
                      card={card}
                      index={indexCard}
                      openCardMenu={openCardMenu}
                    />
                  ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>

          {isOpenAddForm && (
            <AddCardOrColumnForm
              placeholderTextarea="Ввести заголовок для этой карточки"
              textButton="Добавить карточку"
              saveObject={saveCard}
              setIsOpenAddForm={setIsOpenAddForm}
            />
          )}
          {!isOpenAddForm && !loadingCreateCard && (
            <div className="column__footer">
              <button
                className="column__add-card"
                type="button"
                onClick={() => setIsOpenAddForm(true)}
              >
                {AddButtonsOnBoardText.addCard}
              </button>
            </div>
          )}
        </li>
      )}
    </Draggable>
  );
}

export default Column;
