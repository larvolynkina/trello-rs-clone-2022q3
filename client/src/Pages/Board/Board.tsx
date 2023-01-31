import './board.scss';

import Column from '../../Components/Column';

function Board() {
  const columns = ['1', '2', '3', '4', '5', '6', '7'];
  const cards = ['card 1', 'card 2', 'card 3', 'card 4', 'card 5', 'card 6', 'card 7'];
  return (
    <main className="board">
      <aside className="board__aside">board page</aside>
      <div className="board__body">
        <div className="board__header">
          <h1 className="board__title">Border name</h1>
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
            <Column key={column} column={column} cards={cards} />
          ))}
        </ul>
      </div>
    </main>
  );
}

export default Board;
