import './board.scss';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import Column from '../../Components/Column';
import IColumnCard from '../../types';

function Board() {
  const columns = ['1', '2', '3', '4', '5', '6', '7'];
  const cards: IColumnCard[] = [
    { title: 'card 1', position: 0 },
    { title: 'card 2', position: 1 },
    { title: 'card 3', position: 2 },
    { title: 'card 4', position: 3 },
    { title: 'card 5', position: 4 },
  ];
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
          <DndProvider backend={HTML5Backend}>
            {columns.map((column) => (
              <Column key={column} column={column} cards={cards} />
            ))}
          </DndProvider>
        </ul>
      </div>
    </main>
  );
}

export default Board;
