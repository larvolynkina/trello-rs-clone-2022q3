import './board.scss';
import { useEffect, useState, MouseEvent } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { RootState } from '../../store/rootReducer';
import { updateCardInColumn, updateColumns } from '../../store/reducers/boardState';

import Column from '../../Components/Column';
import AddCardOrColumnForm from '../../Components/AddCardOrColumnForm';
import { IColumn, ICard } from '../../types/board';
import { AddButtonsOnBoardText, userId } from '../../const/const';
import { createColumn, getCardsOnBoard, getColumns } from '../../API/board';
import { getCardsOfColumn } from './utils';

function Board() {
  const { board, columns, cards } = useAppSelector((state: RootState) => state.BOARD);
  const { userData } = useAppSelector((state: RootState) => state.USER);
  const dispatch = useAppDispatch();
  const [dragCard, setDragCard] = useState<ICard | null>(null);
  const [dropCard, setDropCard] = useState<ICard | null>(null);
  const [dragColumnFromCard, setDragColumnFromCard] = useState<IColumn | null>(null);
  const [dropColumnFromCard, setDropColumnFromCard] = useState<IColumn | null>(null);
  const [isOpenAddForm, setIsOpenAddForm] = useState(false);

  // useEffect(() => {

  //   if (dragColumnFromCard && dropColumnFromCard && dragCard && dropCard) {
  //     const newColumns: IColumn[] = columns.map((column) => {
  //       if (
  //         dragColumnFromCard._id === dropColumnFromCard._id &&
  //         column._id === dragColumnFromCard._id
  //       ) {
  //         const dragIndex = column.cards.indexOf(dragCard.id);
  //         const tempDropIndex = column.cards.indexOf(dropCard.id);
  //         const dropIndex = tempDropIndex > dragIndex ? tempDropIndex : tempDropIndex + 1;
  //         const newCards = [...column.cards.slice()];
  //         newCards.splice(dragIndex, 1);
  //         newCards.splice(dropIndex, 0, dragCard.id);
  //         return { ...column, cards: newCards };
  //       }
  //       if (column._id === dragColumnFromCard._id) {
  //         const dragIndex = column.cards.indexOf(dragCard.id);
  //         const newCards = [
  //           ...column.cards.slice(0, dragIndex),
  //           ...column.cards.slice(dragIndex + 1),
  //         ];
  //         return { ...column, cards: newCards };
  //       }
  //       if (column._id === dropColumnFromCard._id) {
  //         const dropIndex = column.cards.indexOf(dropCard.id) + 1;
  //         const newCards = [
  //           ...column.cards.slice(0, dropIndex),
  //           dragCard,
  //           ...column.cards.slice(dropIndex),
  //         ];
  //         return { ...column, cards: newCards };
  //       }
  //       return column;
  //     });
  //     dispatch(updateColumn(newColumns));
  //     setDragColumnFromCard(null);
  //     setDropColumnFromCard(null);
  //     setDragCard(null);
  //     // setDropCard(null);
  //   }
  // }, [dropColumnFromCard, dropCard]);

  useEffect(() => {
    if (board._id) {
      getColumns(board._id).then((res) => {
        if (!(res instanceof Error)) {
          dispatch(updateColumns(res));
        }
      });
      getCardsOnBoard(board._id).then((res) => {
        if (!(res instanceof Error)) {
          dispatch(updateCardInColumn(res));
        }
      });
    } else {
      // TODO:
      console.log('need board details');
    }
  }, []);
  useEffect(() => {
    if (cards.length > 0) {
      console.log('cards from effect:', cards)
      console.log('cards of columns 0:', getCardsOfColumn(columns[0].cards, cards))
    }
  }, [cards]);
  const saveColumn = (title: string) => {
    setIsOpenAddForm(false);
    if (userId && board._id && title) {
      createColumn(userId, board._id, title).then((res) => {
        if (!(res instanceof Error)) {
          dispatch(updateColumns([...columns, res]));
        }
      });
    }
  };
  useEffect(() => {
    console.log('columns change')
  }, [columns])
  return (
    <main className="board">
      <aside className="board__aside">Рабочее пространство</aside>

      <div className="board__body">
        <div className="board__header">
          <h1 className="board__title">{board.title}</h1>
          <div className="board__participants">Участники</div>
          <button type="button" className="board__share">
            Поделиться
          </button>
          <button type="button" className="board__menu">
            ...
          </button>
        </div>

        <ul className="board__columns">
          {columns.map((column) => (
            <Column
              key={column._id}
              boardId={board._id}
              column={column}
              cards={cards.length > 0 ? getCardsOfColumn(column.cards, cards) : []}
              setDragCard={setDragCard}
              setDropCard={setDropCard}
              setDragColumnFromCard={setDragColumnFromCard}
              dragCard={dragCard}
              setDropColumn={setDropColumnFromCard}
            />
          ))}
          <div className="board__last-column">
            {!isOpenAddForm && (
              <button
                type="button"
                className="board__add-column"
                onClick={() => setIsOpenAddForm(true)}
              >
                {columns.length === 0
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
      </div>
    </main>
  );
}

export default Board;
