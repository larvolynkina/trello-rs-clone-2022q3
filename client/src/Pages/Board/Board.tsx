import './board.scss';
import { MouseEvent, useEffect, useState, KeyboardEvent } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/redux';
import { updateColumns } from '../../store/reducers/board/boardState';

import { IColumn, ICard } from '../../types/board';
import { AddButtonsOnBoardText } from '../../const/const';
import { getTranspositionColumnCards, getTranspositionColumns } from './utils';
import AddCardOrColumnForm from '../../Components/Column/AddCardOrColumnForm';
import Column from '../../Components/Column';
import {
  useGetColumnsQuery,
  useCreateColumnMutation,
  useUpdateColumnOrderMutation,
  useUpdateCardOrderMutation,
  useGetBoardByIDQuery,
} from '../../store/reducers/board/board.api';
import CardMenu from './CardMenu';
import ColumnMenu from '../../Components/Column/ColumnMenu/ColumnMenu';
// import { RootState } from '../../store/rootReducer';

function Board() {
  const location = useLocation();
  const boardId = location.pathname.split('/')[2];
  const { data: boardDetails } = useGetBoardByIDQuery(boardId);
  const { data: columnsData } = useGetColumnsQuery(boardId);
  // const { userData } = useAppSelector((state: RootState) => state.USER)
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
  const [isOpenCardMenu, setIsOpenCardMenu] = useState(false);
  const [columnMenuPosition, setColumnMenuPosition] = useState<number>(0);
  const [cardMenuPosition, setCardMenuPosition] = useState({ x: 0, y: 0 });
  const [textFromCard, setTextFromCard] = useState('');
  const [idOpenedColumn, setIdOpenedColumn] = useState({boardId, columnId: ''});

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
        updateCardOrder({ boardId, data: resultColumn });
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

  useEffect(() => {
    async function updateOrderColumn(newOrderColumn: string[]) {
      await updateColumnOrder({ boardId, data: newOrderColumn }).unwrap();
      if (errorUpdateColumnOrder) {
        throw new Error('Ошибка изменения порядка списков');
      }
    }
    if (dragColumn && dropColumn && columnsData) {
      const { newOrderColumn } = getTranspositionColumns({ dragColumn, dropColumn, columnsData });
      updateOrderColumn(newOrderColumn);
    }

    setDragColum(null);
    setDropColum(null);
  }, [dropColumn]);

  const saveColumn = (title: string) => {
    setIsOpenAddForm(false);
    if (boardDetails._id && title) {
      createColumn({ boardId: boardDetails._id, title: title.trim() }).unwrap();
      if (errorCreateColumn) {
        throw new Error('Ошибка создания колонки');
      }
    }
  };

  const handleOpenCardMenu = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    let x = 0;
    let y = 0;
    if (e.currentTarget.localName === 'li') {
      x = e.currentTarget.offsetLeft;
      y = e.currentTarget.offsetTop;
      if (e.currentTarget.firstChild?.textContent) {
        setTextFromCard(e.currentTarget.firstChild.textContent);
      }
    } else if (e.currentTarget.parentElement) {
      x = e.currentTarget.parentElement.offsetLeft;
      y = e.currentTarget.parentElement.offsetTop;
      if (e.currentTarget.parentElement?.firstChild?.textContent) {
        setTextFromCard(e.currentTarget.parentElement.firstChild.textContent);
      }
    }
    document.body.style.overflow = 'hidden';
    setCardMenuPosition({ x, y });
    setIsOpenCardMenu(true);
    setIsOpenColumnMenu(false);
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
    setIsOpenAddForm(false);
    setTextFromCard('');
    document.body.style.overflow = '';
  };
  const handleKeyUpBoard = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setIsOpenColumnMenu(false);
    }
  };
  const handleAddColumn = (e: MouseEvent) => {
    e.stopPropagation();
    setIsOpenAddForm(true);
  }
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
          <h1 className="board__title">{boardDetails?.title}</h1>
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
                boardId={boardId}
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
                openCardMenu={handleOpenCardMenu}
                setIdOpenedColumn={setIdOpenedColumn}
              />
            ))}
          <div className="board__last-column">
            {!isOpenAddForm && (
              <button
                type="button"
                className="board__add-column"
                onClick={handleAddColumn}
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
            <ColumnMenu onClose={handleCloseColumnMenu} idOpenedColumn={idOpenedColumn} />
          </div>
        )}
      </div>
      {isOpenCardMenu && (
        <CardMenu text={textFromCard} position={cardMenuPosition} closeMenu={setIsOpenCardMenu} />
      )}
    </main>
  );
}

export default Board;
