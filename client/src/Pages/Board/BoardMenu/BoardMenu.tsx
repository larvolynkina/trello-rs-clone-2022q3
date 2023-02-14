import { useEffect, useState } from 'react';
import { IBoard } from '../../../types/board';
import './boardMenu.scss';

import { BG_COLORS } from '../../../const/const';

type BoardMenuProps = {
  setIsShowBoardMenu: (b: boolean) => void;
  boardDetails: IBoard;
  setBgImageOrColor: (color: string) => void;
};

type TStateComponentView = {
  state: 'base' | 'changeBg' | 'bgImage' | 'bgColor' | 'marks';
};

function BoardMenu({ setIsShowBoardMenu, boardDetails, setBgImageOrColor }: BoardMenuProps) {
  // const [currentBg, setCurrentBg] = useState(
  //   boardDetails.backgroundImage || boardDetails.backgroundImage || '',
  // );

  const [stateComponentView, setStateComponentView] = useState<TStateComponentView>({
    state: 'base',
  });
  const [titleHeader, setTitleHeader] = useState('Меню');

  useEffect(() => {
    console.log(stateComponentView);
    switch (stateComponentView.state) {
      case 'base':
        setTitleHeader('Меню');
        break;
      case 'changeBg':
        setTitleHeader('Смена фона');
        break;
      case 'bgImage':
        setTitleHeader('Фотографии');
        break;
      case 'bgColor':
        setTitleHeader('Цвета');
        break;
      case 'marks':
        setTitleHeader('Метки');
        break;
      default:
        setTitleHeader('Меню');
        break;
    }
  }, [stateComponentView]);

  const handleClickBtnChangeBg = () => {
    setStateComponentView({ state: 'changeBg' });
  };

  const handleClickBtnMarks = () => {
    setStateComponentView({ state: 'marks' });
  };

  const handleClickBack = () => {
    switch (stateComponentView.state) {
      case 'changeBg':
        setStateComponentView({ state: 'base' });
        break;
      case 'bgImage':
        setStateComponentView({ state: 'changeBg' });
        break;
      case 'bgColor':
        setStateComponentView({ state: 'changeBg' });
        break;
      case 'marks':
        setStateComponentView({ state: 'base' });
        break;
      default:
        setStateComponentView({ state: 'base' });
        break;
    }
  };

  const handleClickBtnBgImage = () => {
    setStateComponentView({ state: 'bgImage' });
  };
  const handleClickBtnBgColor = () => {
    setStateComponentView({ state: 'bgColor' });
  };

  const handleClickColor = (index: number) => {
    setBgImageOrColor(BG_COLORS[index]);
  };

  return (
    <aside className="board-menu">
      <div className="board-menu__header">
        <p className="board-menu__title">{titleHeader}</p>
        {stateComponentView.state !== 'base' && (
          <button className="board-menu__back" type="button" onClick={handleClickBack}>
            <span className="board-menu__back-btn" />
          </button>
        )}
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
      {stateComponentView.state === 'base' && (
        <>
          <ul className="board-menu__list">
            <li className="board-menu__item">
              <button type="button" className="board-menu__btn" onClick={handleClickBtnChangeBg}>
                <div className="board-menu__icon-bg" />
                Сменить фон
              </button>
            </li>
            <li className="board-menu__item">
              <button type="button" className="board-menu__btn" onClick={handleClickBtnMarks}>
                <div className="board-menu__icon-mark" />
                Метки
              </button>
            </li>
          </ul>
          <div className="board-menu__actions">Действия...</div>
        </>
      )}
      {stateComponentView.state === 'changeBg' && (
        <ul className="change-bg">
          <li className="change-bg__list-item">
            <button type="button" className="change-bg__btn" onClick={handleClickBtnBgImage}>
              <div className="change-bg__foto" />
              <p className="change-bg__text">Фотографии</p>
            </button>
          </li>
          <li className="change-bg__list-item">
            <button type="button" className="change-bg__btn" onClick={handleClickBtnBgColor}>
              <div className="change-bg__color" />
              <p className="change-bg__text">Цвета</p>
            </button>
          </li>
        </ul>
      )}
      {stateComponentView.state === 'bgColor' && (
        <ul className="change-bg__colors">
          {BG_COLORS.map((color, index) => (
            <button
              type="button"
              className="change-bg__btn"
              onClick={() => handleClickColor(index)}
            >
              <li className="change-bg__item" style={{ backgroundColor: color }} />
            </button>
          ))}
        </ul>
      )}
    </aside>
  );
}

export default BoardMenu;
