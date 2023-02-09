import './board.scss';
import { MouseEvent, useEffect, useState, KeyboardEvent } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { RootState } from '../../store/rootReducer';
import { updateColumns } from '../../store/reducers/board/boardState';

import { IColumn, ICard } from '../../types/board';
import { AddButtonsOnBoardText, boardId, userId } from '../../const/const';
import { getTranspositionColumnCards, getTranspositionColumns } from './utils';
import AddCardOrColumnForm from '../../Components/AddCardOrColumnForm';
import Column from '../../Components/Column';
import ColumnMenu from '../../Components/ColumnMenu/ColumnMenu';
import {
  useGetColumnsQuery,
  useCreateColumnMutation,
  useUpdateColumnOrderMutation,
  useUpdateCardOrderMutation,
} from '../../store/reducers/board/board.api';

function Board() {
  const { boardData } = useAppSelector((state: RootState) => state.BOARD);
  const { data: columnsData } = useGetColumnsQuery(boardData._id);
  const [createColumn, { isError: errorCreateColumn }] = useCreateColumnMutation();
  const [updateColumnOrder, { isError: errorUpdateColumnOrder }] = useUpdateColumnOrderMutation();
  const [updateCardOrder, { isError: errorUpdateCardOrder }] = useUpdateCardOrderMutation();
  const dispatch = useAppDispatch();
  const [dragCard, setDragCard] = useState<ICard | null>(null);
  const [dropCard, setDropCard] = useState<ICard | null>(null);
  const [dragColumnFromCard, setDragColumnFromCard] = useState<IColumn | null>(null);
  const [dropColumnFromCard, setDropColumnFromCard] = useState<IColumn | null>(null);
  const [dragColumn, setDragColum] = useState<IColumn | null>(null);
  const [dropColumn, setDropColum] = useState<IColumn | null>(null);
  const [isOpenAddForm, setIsOpenAddForm] = useState(false);
  const [isOpenColumnMenu, setIsOpenColumnMenu] = useState(false);
  const [columnMenuPosition, setColumnMenuPosition] = useState<number>(0);

  useEffect(() => {
    if (dragColumnFromCard && dropColumnFromCard && dragCard && dropCard && columnsData) {
      const { newColumns, resultColumn } = getTranspositionColumnCards({
        dragColumnFromCard,
        dropColumnFromCard,
        dragCard,
        dropCard,
        columnsData,
      });
      if (resultColumn) {
        dispatch(updateColumns(newColumns));
        updateCardOrder({userId, boardId, data: resultColumn})
        if (errorUpdateCardOrder) {
          throw new Error('Ошибка изменения порядка карточек');
        }
      }
      setDragColumnFromCard(null);
      setDropColumnFromCard(null);
      setDragCard(null);
      // setDropCard(null);
    }
  }, [dropColumnFromCard, dropCard]);

  // useEffect(() => {
  //   if (boardData._id) {
  //     if (cardsData) {
  //       dispatch(updateCardInColumn(cardsData));
  //     }
  //   }
  // }, [ cardsData]);

  useEffect(() => {
    async function updateOrderColumn(newOrderColumn: string[]) {
      await updateColumnOrder({ userId, boardId, data: newOrderColumn }).unwrap();
      if (errorUpdateColumnOrder) {
        throw new Error('Ошибка изменения порядка списков');
      }
    }
    if (dragColumn && dropColumn && columnsData) {
      console.log(columnsData);
      const newOrderColumn = getTranspositionColumns({ dragColumn, dropColumn, columnsData });
      console.log(newOrderColumn);
      updateOrderColumn(newOrderColumn);
    }

    setDragColum(null);
    setDropColum(null);
  }, [dropColumn]);

  const saveColumn = (title: string) => {
    setIsOpenAddForm(false);
    if (userId && boardData._id && title) {
      createColumn({ userId, boardId: boardData._id, title }).unwrap();
      if (errorCreateColumn) {
        throw new Error('Ошибка создания колонки');
      }
    }
  };
  const handleOpenColumnMenu = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setColumnMenuPosition(e.clientX + 46);
    setIsOpenColumnMenu(true);
  };
  const handleCloseColumnMenu = () => {
    setIsOpenColumnMenu(false);
  };
  const handleClickBoard = () => {
    setIsOpenColumnMenu(false);
  };
  const handleKeyUpBoard = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setIsOpenColumnMenu(false);
    }
  };
  return (
    <main
      className="board"
      onClick={handleClickBoard}
      onKeyUp={handleKeyUpBoard}
      aria-hidden="true"
    >
      <aside className="board__aside">Рабочее пространство</aside>

      <div className="board__body">
        <div className="board__header">
          <h1 className="board__title">{boardData.title}</h1>
          <div className="board__participants">Участники</div>
          <button type="button" className="board__share">
            Поделиться
          </button>
          <button type="button" className="board__menu">
            ...
          </button>
        </div>

        <ul className="board__columns">
          {columnsData &&
            columnsData.map((column) => (
              <Column
                key={column._id}
                boardId={boardData._id}
                column={column}
                setDragCard={setDragCard}
                setDropCard={setDropCard}
                setDragColumnFromCard={setDragColumnFromCard}
                dragCard={dragCard}
                setDropColumnFromCard={setDropColumnFromCard}
                openColumnMenu={handleOpenColumnMenu}
                dragColumn={dragColumn}
                setDragColum={setDragColum}
                setDropColum={setDropColum}
              />
            ))}
          <div className="board__last-column">
            {!isOpenAddForm && (
              <button
                type="button"
                className="board__add-column"
                onClick={() => setIsOpenAddForm(true)}
              >
                {columnsData && columnsData.length === 0
                  ? AddButtonsOnBoardText.addColumn
                  : AddButtonsOnBoardText.addOneMoreColumn}
              </button>
            )}
            {isOpenAddForm && (
              <AddCardOrColumnForm
                placeholderTextarea="Ввести заголовок списка"
                textButton="Добавить список"
                saveObject={saveColumn}
                setIsOpenAddForm={setIsOpenAddForm}
              />
            )}
          </div>
        </ul>
        {isOpenColumnMenu && (
          <div className="board__column-menu" style={{ left: columnMenuPosition }}>
            <ColumnMenu onClose={handleCloseColumnMenu} />
          </div>
        )}
      </div>
    </main>
  );
}

export default Board;
