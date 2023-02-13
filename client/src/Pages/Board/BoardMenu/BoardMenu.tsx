import { useEffect, useState } from 'react';
import { IBoard } from '../../../types/board';
import './boardMenu.scss';

type BoardMenuProps = {
  setIsShowBoardMenu: (b: boolean) => void;
  boardDetails: IBoard;
};

function BoardMenu({ setIsShowBoardMenu, boardDetails }: BoardMenuProps) {
  const [currentBg, setCurrentBg] = useState(
    boardDetails.backgroundImage || boardDetails.backgroundImage || '',
  );

  useEffect(() => {
    console.log(currentBg);
  }, []);
  return (
    <aside className="board-menu">
      <div className="board-menu__header">
        <p className="board-menu__title">Меню</p>
        <button
          type="button"
          className="board-menu__close-btn"
          onClick={() => {
            setIsShowBoardMenu(false);
          }}
        >
          <span className="board-menu__cross-btn" />
        </button>
      </div>
      <ul className="board-menu__list">
        <li className="board-menu__item">
          <button type="button" className="board-menu__btn">
            <div className="board-menu__icon-bg" />
            Сменить фон
          </button>
        </li>
        <li className="board-menu__item">
          <button type="button" className="board-menu__btn">
            <div className="board-menu__icon-mark" />
            Метки
          </button>
        </li>
      </ul>
    </aside>
  );
}

export default BoardMenu;
