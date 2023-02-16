import './board.scss';
import { MouseEvent, useEffect, useState, KeyboardEvent, useRef } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  updateColumns,
  updateBoardDetails,
  createColumnInStore,
  updateCardInColumn,
} from '../../store/reducers/board/boardState';

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
  useGetCardsOnBoardQuery,
} from '../../store/reducers/board/board.api';
import CardMenu from './CardMenu';
import ColumnMenu from '../../Components/Column/ColumnMenu/ColumnMenu';
import HeaderBoard from './HeaderBoard';
import SearchParticipantsForm from './SearchParticipantsForm';
import BoardMenu from './BoardMenu';
import Loader from '../../Components/Loader';
import Card from '../../Components/Card';

function Board() {
  const location = useLocation();
  const boardId = location.pathname.split('/')[2];
  const { data: boardDetailsFromServer, isLoading: boardDetailsLoading } =
    useGetBoardByIDQuery(boardId);
  const { data: columnsDataFromServer, isLoading: columnsDataLoading } =
    useGetColumnsQuery(boardId);
  const { data: cardsDataFromServer, isLoading: cardsDataLoading } =
    useGetCardsOnBoardQuery(boardId);
  const [createColumn, { isError: errorCreateColumn }] = useCreateColumnMutation();
  const [updateColumnOrder, { isError: errorUpdateColumnOrder }] = useUpdateColumnOrderMutation();
  const [updateCardOrder, { isError: errorUpdateCardOrder }] = useUpdateCardOrderMutation();
  const dispatch = useAppDispatch();
  const { boardData, columnsData, cardsData } = useAppSelector((state) => state.BOARD);
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
  const [idOpenedColumn, setIdOpenedColumn] = useState({ boardId, columnId: '' });
  const boardBody = useRef<HTMLDivElement | null>(null);
  const [addCardFromMenu, setAddCardFromMenu] = useState(false);
  const [isShowSearchForm, setIsShowSearchForm] = useState(false);
  const [isShowBoardMenu, setIsShowBoardMenu] = useState(false);
  const [bgStyle, setBgStyle] = useState({});
  const [doLoad, setDoLoad] = useState(false);
  const [paramsURL] = useSearchParams();
  const [openCard, setOpenCard] = useState({
    isOpen: false,
    canOpen: false,
    cardId: '',
  });

  useEffect(() => {
    const findCardId = paramsURL.get('card');
    if (cardsData && findCardId) {
      const foundCard = cardsData.find((card) => card._id === findCardId);
      if (foundCard) {
        setOpenCard((prev) => ({ ...prev, isOpen: true, cardId: foundCard._id }));
      }
    }
  }, [paramsURL, cardsData]);

  useEffect(() => {
    if (boardDetailsFromServer) {
      dispatch(updateBoardDetails(boardDetailsFromServer));
    }
  }, [boardDetailsFromServer]);

  useEffect(() => {
    if (columnsDataFromServer) {
      dispatch(updateColumns(columnsDataFromServer));
    }
  }, [columnsDataFromServer]);

  useEffect(() => {
    if (cardsDataFromServer) {
      dispatch(updateCardInColumn(cardsDataFromServer));
    }
  }, [cardsDataFromServer]);

  useEffect(() => {
    if (boardData && boardData._id.length > 0) {
      if (boardData.backgroundImage && boardData.backgroundImage.length > 0) {
        setBgStyle({ backgroundImage: boardData.backgroundImage });
      } else if (boardData.backgroundColor && boardData.backgroundColor.length > 0) {
        setBgStyle({ backgroundImage: 'none', backgroundColor: boardData.backgroundColor });
      }
    }
  }, [boardData.backgroundImage, boardData.backgroundColor]);

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
    setDoLoad(true);
    setIsOpenAddForm(false);
    if (boardData._id && title) {
      createColumn({ boardId: boardData._id, title: title.trim() })
        .unwrap()
        .then(() => {
          setDoLoad(false);
          const fakeId = String(Math.random());
          const newColumn: IColumn = {
            _id: fakeId,
            archived: false,
            cards: [],
            createdAt: '',
            updatedAt: '',
            title,
          };
          dispatch(createColumnInStore({ column: newColumn, boardId }));
        });
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
      if (boardBody.current?.scrollLeft) {
        x -= boardBody.current.scrollLeft;
      }
      y = e.currentTarget.offsetTop;
      if (e.currentTarget.firstChild?.textContent) {
        setTextFromCard(e.currentTarget.firstChild.textContent);
      }
    } else if (e.currentTarget.parentElement) {
      x = e.currentTarget.parentElement.offsetLeft;
      if (boardBody.current?.scrollLeft) {
        x -= boardBody.current.scrollLeft;
      }
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
    setIsOpenAddForm(false);
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
  };

  return (
    <main
      className="board"
      onClick={handleClickBoard}
      onKeyUp={handleKeyUpBoard}
      style={bgStyle}
      aria-hidden="true"
    >
      {(boardDetailsLoading || columnsDataLoading || cardsDataLoading || doLoad) && <Loader />}

      {!(boardDetailsLoading || columnsDataLoading || cardsDataLoading || doLoad) && (
        <>
          <aside className="board__aside">Рабочее пространство</aside>

          <div className="board__body" ref={boardBody}>
            {boardData && boardData._id.length > 0 && (
              <HeaderBoard
                boardDetails={boardData}
                setIsShowSearchForm={setIsShowSearchForm}
                setIsShowBoardMenu={setIsShowBoardMenu}
              />
            )}

            <ul className="board__columns">
              {columnsData &&
                !doLoad &&
                columnsData.map((column) => (
                  <Column
                    key={column._id}
                    boardId={boardId}
                    column={column}
                    cardsData={cardsData}
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
                    idOpenedColumn={idOpenedColumn}
                    addCardFromMenu={addCardFromMenu}
                    setAddCardFromMenu={setAddCardFromMenu}
                  />
                ))}
              {!doLoad && (
                <div className="board__last-column">
                  {!isOpenAddForm && (
                    <button type="button" className="board__add-column" onClick={handleAddColumn}>
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
              )}
            </ul>
            {isOpenColumnMenu && (
              <div className="board__column-menu" style={{ left: columnMenuPosition }}>
                <ColumnMenu
                  onClose={handleCloseColumnMenu}
                  idOpenedColumn={idOpenedColumn}
                  setAddCardFromMenu={setAddCardFromMenu}
                />
              </div>
            )}
          </div>
          {isOpenCardMenu && (
            <CardMenu
              text={textFromCard}
              position={cardMenuPosition}
              closeMenu={setIsOpenCardMenu}
            />
          )}
          {isShowSearchForm && boardData && (
            <SearchParticipantsForm
              setIsShowSearchForm={setIsShowSearchForm}
              boardId={boardData._id}
            />
          )}
          {isShowBoardMenu && boardData && (
            <BoardMenu
              setIsShowBoardMenu={setIsShowBoardMenu}
              boardDetails={boardData}
              setBgStyle={setBgStyle}
            />
          )}
        </>
      )}
      {openCard.isOpen && (
        <div className="board__card-modal">
          <Card
            boardId={boardId}
            cardId={openCard.cardId}
            setOpenCard={setOpenCard}
          />
        </div>
      )}
    </main>
  );
}

export default Board;
