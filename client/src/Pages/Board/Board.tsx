import './board.scss';
import { useState } from 'react';

import Column from '../../Components/Column';
import { IColumnCard, IColumn } from '../../types/columns';

function Board() {
  const columns: IColumn[] = [
    { id: '1', title: 'Column 1', position: 0 },
    { id: '2', title: 'Column 2', position: 1 },
    { id: '3', title: 'Column 3', position: 2 },
    { id: '4', title: 'Column 4', position: 3 },
    { id: '5', title: 'Column 5', position: 4 },
    { id: '6', title: 'Column 6', position: 5 },
  ];
  const [cards, setCards] = useState<IColumnCard[]>([
    { id: '1', title: 'card 1', position: 0 },
    { id: '2', title: 'card 2', position: 1 },
    { id: '3', title: 'card 3', position: 2 },
    { id: '4', title: 'card 4', position: 3 },
    { id: '5', title: 'card 5', position: 4 },
  ]);

  return (
    <main className="board">
      <aside className="board__aside">board aside</aside>
      <div className="board__body">
        <div className="board__header">
          <h1 className="board__title">Board name</h1>
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
            <Column key={column.position} column={column} cards={cards} updateCards={setCards}/>
          ))}
        </ul>
      </div>
    </main>
  );
}

export default Board;
