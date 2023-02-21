import './board.scss';
import { MouseEvent, useEffect, useState, KeyboardEvent, useRef } from 'react';
import { useLocation, useSearchParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  updateColumnsInStore,
  updateBoardDetails,
  createColumnInStore,
  updateCardInColumn,
} from '../../store/reducers/board/boardState';

import { IColumn, ICard } from '../../types/board';
import { AddButtonsOnBoardText } from '../../const/const';
import { getNewColumnsOrder, getTranspositionColumnCards } from './utils';
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
  const [updateCardOrder, { isError: errorUpdateCardOrder }] = useUpdateCardOrderMutation();
  const [updateCardTitleOnServer] = useUpdateCardTitleOnServerMutation();
  const dispatch = useAppDispatch();
  const { boardData, columnsData, cardsData, openMenuCardArgs } = useAppSelector(
    (state) => state.BOARD,
  );
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
  const [paramsURL] = useSearchParams();
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
  }, [isError]);

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
    if ((boardData._id.length === 0 || boardId !== boardData._id) && boardDetailsFromServer) {
      dispatch(updateBoardDetails(boardDetailsFromServer));
    }
  }, [boardDetailsFromServer]);

  useEffect(() => {
    if (columnsData.length === 0 && columnsDataFromServer) {
      dispatch(updateColumnsInStore(columnsDataFromServer));
    }
  }, [columnsDataFromServer]);

  useEffect(() => {
    if (cardsData.length === 0 && cardsDataFromServer) {
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
        dispatch(updateColumnsInStore(newColumns));
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
    if (dropColumn?._id === dragColumn?._id) {
      return;
    }
    if (dropColumn && dragColumn && columnsData) {
      const newColumnsOrder = getNewColumnsOrder({ dragColumn, dropColumn, columnsData });
      dispatch(updateColumnsInStore(newColumnsOrder));
      const newColumnsOrderId = newColumnsOrder.map((column) => column._id);
      updateColumnOrder({ boardId, data: newColumnsOrderId }).unwrap();
    }

    setDragColum(null);
    setDropColum(null);
  }, [dropColumn]);

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

  // const closeCard = () => {
  //   setOpenCard((prev) => ({ ...prev, isOpen: false }));
  //   paramsURL.delete('card');
  //   setParamsURL(paramsURL);
  // };

  // const handleKeyDown = () => {
  //   if (paramsURL.get('somesthing')) {
  //     throw new Error('somesthing');
  //   }
  // };

  return (
    <main
      className="board"
      onClick={handleClickBoard}
      onKeyUp={handleKeyUpBoard}
      style={bgStyle}
      aria-hidden="true"
    >
      {(boardDetailsLoading || columnsDataLoading || cardsDataLoading) && <Loader />}

      {!(boardDetailsLoading || columnsDataLoading || cardsDataLoading) && (
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
              {!boardDetailsLoading && !columnsDataLoading && (
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
        <div
          className="board__card-modal"
          // onClick={closeCard}
          // onKeyDown={handleKeyDown}
          // aria-hidden="true"
        >
          <Card boardId={boardId} cardId={openCard.cardId} setOpenCard={setOpenCard} />
        </div>
      )}
    </main>
  );
}

export default Board;
