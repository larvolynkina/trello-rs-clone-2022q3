import './board.scss';
import { MouseEvent, useEffect, useState, KeyboardEvent, useRef } from 'react';
import { useLocation, useSearchParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  updateColumnsInStore,
  updateBoardDetails,
  createColumnInStore,
  updateCardInColumn,
} from '../../store/reducers/board/boardState';

import { AddButtonsOnBoardText, APPRoute } from '../../const/const';
import { getNewColumnsOrder, getColumnsWithOrderedCards, getCardsOfColumn } from './utils';
import AddCardOrColumnForm from '../../Components/Column/AddCardOrColumnForm';
import Column from '../../Components/Column';
import {
  useGetColumnsQuery,
  useCreateColumnMutation,
  useUpdateColumnOrderMutation,
  useUpdateCardOrderMutation,
  useGetBoardByIDQuery,
  useGetCardsOnBoardQuery,
  useUpdateCardTitleOnServerMutation,
} from '../../store/reducers/board/board.api';
import CardMenu from './CardMenu';
import ColumnMenu from '../../Components/Column/ColumnMenu/ColumnMenu';
import HeaderBoard from './HeaderBoard';
import SearchParticipantsForm from './SearchParticipantsForm';
import BoardMenu from './BoardMenu';
import Loader from '../../Components/Loader';
import Card from '../../Components/Card';
import { isFetchBaseQueryError } from '../../utils/error';
import BoardAside from './BoardAside';

function Board() {
  const location = useLocation();
  const boardId = location.pathname.split('/')[2];
  const {
    data: boardDetailsFromServer,
    isLoading: boardDetailsLoading,
    isError,
    error,
  } = useGetBoardByIDQuery(boardId);
  const { data: columnsDataFromServer, isLoading: columnsDataLoading } =
    useGetColumnsQuery(boardId);
  const { data: cardsDataFromServer, isLoading: cardsDataLoading } =
    useGetCardsOnBoardQuery(boardId);
  const [createColumn, { isError: errorCreateColumn }] = useCreateColumnMutation();
  const [updateColumnOrder] = useUpdateColumnOrderMutation();
  const [updateCardOrder] = useUpdateCardOrderMutation();
  const [updateCardTitleOnServer] = useUpdateCardTitleOnServerMutation();
  const dispatch = useAppDispatch();
  const { boardData, columnsData, cardsData, openMenuCardArgs } = useAppSelector(
    (state) => state.BOARD,
  );

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
  const [paramsURL, setParamsURL] = useSearchParams();
  const [openCard, setOpenCard] = useState({
    isOpen: false,
    canOpen: false,
    cardId: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (isError && error && isFetchBaseQueryError(error) && error.status === 403) {
      navigate('/forbidden');
    } 
    if (isError && error && isFetchBaseQueryError(error) && error.status === 500) {
      navigate(APPRoute.notFound);
    }
  }, [isError]);

  useEffect(() => {
    const findCardId = paramsURL.get('card');
    if (cardsData && findCardId) {
      const foundCard = cardsData.find((card) => card._id === findCardId);
      if (foundCard) {
        setOpenCard((prev) => ({ ...prev, isOpen: true, cardId: foundCard._id }));
      } else {
        toast.error('Карточки с таким адресом не найдено');
        paramsURL.delete('card');
        setParamsURL(paramsURL);
      }
    }
  }, [paramsURL, cardsData]);

  useEffect(() => {
    if ((boardData._id.length === 0 || boardId !== boardData._id) && boardDetailsFromServer) {
      dispatch(updateBoardDetails(boardDetailsFromServer));
    }
  }, [boardDetailsFromServer]);

  useEffect(() => {
    if (columnsDataFromServer) {
      dispatch(updateColumnsInStore(columnsDataFromServer));
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
      } else {
        setBgStyle({ backgroundImage: 'none', backgroundColor: '#97a0af' });
      }
    }
  }, [boardData.backgroundImage, boardData.backgroundColor]);

  const saveColumn = (title: string) => {
    setIsOpenAddForm(false);
    toast.loading('Добавляем колонку...');
    if (boardData._id && title) {
      createColumn({ boardId: boardData._id, title: title.trim() })
        .unwrap()
        .then((res) => {
          dispatch(createColumnInStore({ column: res, boardId }));
          toast.dismiss();
        });
      if (errorCreateColumn) {
        throw new Error('Ошибка создания колонки');
      }
    }
  };

  const handleOpenCardMenu = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    let x = 0;
    let y = 0;
    if (e.currentTarget.localName === 'li') {
      x = e.currentTarget.offsetLeft;
      if (boardBody.current?.scrollLeft) {
        x -= boardBody.current.scrollLeft;
      }
      y = e.currentTarget.offsetTop;
      if (e.currentTarget.childNodes[1]?.textContent) {
        setTextFromCard(e.currentTarget.childNodes[1].textContent);
      }
    } else if (e.currentTarget.parentElement) {
      x = e.currentTarget.parentElement.offsetLeft;
      if (boardBody.current?.scrollLeft) {
        x -= boardBody.current.scrollLeft;
      }
      y = e.currentTarget.parentElement.offsetTop;
      if (e.currentTarget.parentElement?.childNodes[1]?.textContent) {
        setTextFromCard(e.currentTarget.parentElement.childNodes[1].textContent);
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

  const saveCardTitle = (title: string) => {
    dispatch(
      updateCardInColumn(
        cardsData.map((card) => {
          if (card._id === openMenuCardArgs.cardId) {
            return { ...card, title };
          }
          return card;
        }),
      ),
    );
    updateCardTitleOnServer({ ...openMenuCardArgs, boardId, title });
  };

  const handleDragEndColumn = (dragResult: DropResult) => {
    const { destination, source, type } = dragResult;

    if (type === 'card') {
      if (
        destination &&
        !(destination.droppableId === source.droppableId && destination.index === source.index)
      ) {
        const { newColumnsWithForStore, newColumnsForServer } = getColumnsWithOrderedCards({
          columns: columnsData,
          dragResult,
        });

        if (newColumnsWithForStore) {
          dispatch(updateColumnsInStore(newColumnsWithForStore));
          updateCardOrder({ boardId, data: newColumnsForServer });
        }
      }
    } else if (destination && destination.index !== source.index) {
      const newColumnsOrder = getNewColumnsOrder({ dragResult, columnsData });
      dispatch(updateColumnsInStore(newColumnsOrder));
      const newColumnsOrderId = newColumnsOrder.map((column) => column._id);
      updateColumnOrder({ boardId, data: newColumnsOrderId }).unwrap();
    }
  };
  const closeCard = () => {
    setOpenCard((prev) => ({ ...prev, isOpen: false }));
    paramsURL.delete('card');
    setParamsURL(paramsURL);
  };
  const handleKeyDown = () => {
    setOpenCard((prev) => ({ ...prev, isOpen: false }));
    paramsURL.delete('card');
    setParamsURL(paramsURL);
  };
  return (
    <main
      className="board"
      onClick={handleClickBoard}
      onKeyUp={handleKeyUpBoard}
      style={boardDetailsLoading ? { backgroundImage: 'none', backgroundColor: 'none' } : bgStyle}
      aria-hidden="true"
    >
      {(boardDetailsLoading || columnsDataLoading || cardsDataLoading) && <Loader />}

      {!(boardDetailsLoading || columnsDataLoading || cardsDataLoading) && (
        <>
          <aside className="board__aside">
            {boardData.workspace && <BoardAside workspace={boardData.workspace} />}
          </aside>

          <div className="board__body" ref={boardBody}>
            {boardData && boardData._id.length > 0 && (
              <HeaderBoard
                boardDetails={boardData}
                setIsShowSearchForm={setIsShowSearchForm}
                setIsShowBoardMenu={setIsShowBoardMenu}
              />
            )}

            <DragDropContext onDragEnd={handleDragEndColumn}>
              <Droppable droppableId="all-columns" direction="horizontal" type="column">
                {(provided) => (
                  <ul
                    className="board__columns"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {columnsData &&
                      columnsData.map((column, index) => (
                        <Column
                          key={column._id}
                          index={index}
                          boardId={boardId}
                          column={column}
                          cards={getCardsOfColumn(column.cards, cardsData)}
                          openColumnMenu={handleOpenColumnMenu}
                          openCardMenu={handleOpenCardMenu}
                          setIdOpenedColumn={setIdOpenedColumn}
                          idOpenedColumn={idOpenedColumn}
                          addCardFromMenu={addCardFromMenu}
                          setAddCardFromMenu={setAddCardFromMenu}
                        />
                      ))}
                    {!boardDetailsLoading && !columnsDataLoading && (
                      <li className="board__last-column">
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
                      </li>
                    )}
                    {provided.placeholder}
                  </ul>
                )}
              </Droppable>
            </DragDropContext>

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
              saveCardTitle={saveCardTitle}
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
          <div
            className="board__card-modal-for-click"
            onClick={closeCard}
            onKeyDown={handleKeyDown}
            aria-hidden="true"
          />
          <Card boardId={boardId} cardId={openCard.cardId} setOpenCard={setOpenCard} />
        </div>
      )}
    </main>
  );
}

export default Board;
