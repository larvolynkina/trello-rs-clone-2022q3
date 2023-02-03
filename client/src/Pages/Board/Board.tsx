import './board.scss';
import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { RootState } from '../../store/rootReducer';
import { updateColumn } from '../../store/reducers/boardState';

import Column from '../../Components/Column';
import AddCardOrColumnForm from '../../Components/AddCardOrColumnForm';
import { IColumnCard, IColumn } from '../../types/board';
import { AddButtonsOnBoardText } from '../../const/const';
import { addColumn, getColumns } from '../../API/board';

function Board() {
  const { columns } = useAppSelector((state: RootState) => state.BOARD);
  const dispatch = useAppDispatch();
  const [dragCard, setDragCard] = useState<IColumnCard | null>(null);
  const [dropCard, setDropCard] = useState<IColumnCard | null>(null);
  const [dragColumnFromCard, setDragColumnFromCard] = useState<IColumn | null>(null);
  const [dropColumnFromCard, setDropColumnFromCard] = useState<IColumn | null>(null);
  const [isOpenAddForm, setIsOpenAddForm] = useState(false);

  // временные константы
  const boardId = '63dc9efe0257d54a15c2c628';
  const userId = '63db5b2b87ef7c0d31ccccea';

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
    getColumns(boardId).then((res) => {
      if (!(res instanceof Error)) {
        dispatch(updateColumn(res));
      }
    });
  }, []);

  const saveColumn = (title: string) => {
    setIsOpenAddForm(false);
    if (title) {
      addColumn(userId, boardId, title).then((res) => {
        if (!(res instanceof Error)) {
          dispatch(updateColumn([...columns, res]));
        }
      });
    }
  };
  return (
    <main className="board">
      <aside className="board__aside">Рабочее пространство</aside>
      <div className="board__body">
        <div className="board__header">
          <h1 className="board__title">Название доски</h1>
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
              column={column}
              cards={column.cards}
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
