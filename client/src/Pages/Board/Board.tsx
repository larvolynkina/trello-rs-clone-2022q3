import './board.scss';
import { MouseEvent, useEffect, useState, KeyboardEvent } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { RootState } from '../../store/rootReducer';
import { updateCardInColumn, updateColumns } from '../../store/reducers/boardState';

import { IColumn, ICard } from '../../types/board';
import { AddButtonsOnBoardText, boardId, userId } from '../../const/const';
import { createColumn, getCardsOnBoard, getColumns, updateCardOrder } from '../../API/board';
import { getTranspositionColumns } from './utils';
import AddCardOrColumnForm from '../../Components/AddCardOrColumnForm';
import Column from '../../Components/Column';
import ColumnMenu from '../../Components/ColumnMenu/ColumnMenu';

function Board() {
  const { boardData, columnsData } = useAppSelector((state: RootState) => state.BOARD);
  const dispatch = useAppDispatch();
  const [dragCard, setDragCard] = useState<ICard | null>(null);
  const [dropCard, setDropCard] = useState<ICard | null>(null);
  const [dragColumnFromCard, setDragColumnFromCard] = useState<IColumn | null>(null);
  const [dropColumnFromCard, setDropColumnFromCard] = useState<IColumn | null>(null);
  const [isOpenAddForm, setIsOpenAddForm] = useState(false);
  const [isOpenColumnMenu, setIsOpenColumnMenu] = useState(false);
  const [columnMenuPosition, setColumnMenuPosition] = useState(0);

  useEffect(() => {
    if (dragColumnFromCard && dropColumnFromCard && dragCard && dropCard) {
      const { newColumns, resultColumn } = getTranspositionColumns({
        dragColumnFromCard,
        dropColumnFromCard,
        dragCard,
        dropCard,
        columnsData,
      });
      if (resultColumn) {
        updateCardOrder(userId, boardId, resultColumn).then((res) => {
          if (!(res instanceof Error)) {
            dispatch(updateColumns(newColumns));
          }
        });
      }
      setDragColumnFromCard(null);
      setDropColumnFromCard(null);
      setDragCard(null);
      // setDropCard(null);
    }
  }, [dropColumnFromCard, dropCard]);

  useEffect(() => {
    if (boardData._id) {
      getColumns(boardData._id).then((res) => {
        if (!(res instanceof Error)) {
          dispatch(updateColumns(res));
        }
      });
      getCardsOnBoard(boardData._id).then((res) => {
        if (!(res instanceof Error)) {
          dispatch(updateCardInColumn(res));
        }
      });
    }
  }, []);

  const saveColumn = (title: string) => {
    setIsOpenAddForm(false);
    if (userId && boardData._id && title) {
      createColumn(userId, boardData._id, title).then((res) => {
        if (!(res instanceof Error)) {
          dispatch(updateColumns([...columnsData, res]));
        }
      });
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
          {columnsData.map((column) => (
            <Column
              key={column._id}
              boardId={boardData._id}
              column={column}
              cardIds={column.cards}
              setDragCard={setDragCard}
              setDropCard={setDropCard}
              setDragColumnFromCard={setDragColumnFromCard}
              dragCard={dragCard}
              setDropColumn={setDropColumnFromCard}
              openColumnMenu={handleOpenColumnMenu}
            />
          ))}
          <div className="board__last-column">
            {!isOpenAddForm && (
              <button
                type="button"
                className="board__add-column"
                onClick={() => setIsOpenAddForm(true)}
              >
                {columnsData.length === 0
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
