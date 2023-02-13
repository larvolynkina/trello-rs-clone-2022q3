import './cardMenu.scss';
import { KeyboardEvent, MouseEvent, useEffect, useRef, useState } from 'react';

type CardMenuProps = {
  text: string;
  position: { x: number; y: number };
  closeMenu: (b: boolean) => void;
};

export default function CardMenu({ text, position, closeMenu }: CardMenuProps) {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [valueArea, setValueArea] = useState(text);
  const inputText = useRef<HTMLTextAreaElement | null>(null);
  const x = position.x + 260;
  const y = position.y + 40;

  useEffect(() => {
    inputText.current?.select();
  }, []);
  const handleClickMenuBody = () => {
    if (isMouseDown) {
      closeMenu(false);
      setIsMouseDown(false);
    }
  };
  const handleKeyUpMenuBody = (e: KeyboardEvent) => {
    e.stopPropagation();
    if (e.key === 'Escape') {
      closeMenu(false);
      setIsMouseDown(false);
    }
  };

  const handleClickSave = (e: MouseEvent) => {
    e.stopPropagation();
  };

  const handleMouseDownMenuBody = () => {
    setIsMouseDown(true);
  };

  return (
    <div
      className="card-context-menu"
      onClick={handleClickMenuBody}
      onMouseDown={handleMouseDownMenuBody}
      onKeyUp={handleKeyUpMenuBody}
      aria-hidden="true"
    >
      <div className="card-context-menu__form" style={{ top: y, left: x }}>
        <textarea
          className="card-context-menu__input"
          ref={inputText}
          value={valueArea}
          onChange={(e) => {
            setValueArea(e.target.value);
          }}
          onClick={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
        />
        <button type="button" className="card-context-menu__save-btn" onClick={handleClickSave}>
          Сохранить
        </button>
        <div className="card-context-menu__functions">
          <button
            type="button"
            className="card-context-menu__func-btn"
            onClick={(e) => e.stopPropagation()}
          >
            Открыть карточку
          </button>
          <button
            type="button"
            className="card-context-menu__func-btn"
            onClick={(e) => e.stopPropagation()}
          >
            Изменить метки
          </button>
          <button
            type="button"
            className="card-context-menu__func-btn"
            onClick={(e) => e.stopPropagation()}
          >
            Изменить участников
          </button>
          <button
            type="button"
            className="card-context-menu__func-btn"
            onClick={(e) => e.stopPropagation()}
          >
            Сменить обложку
          </button>
          <button
            type="button"
            className="card-context-menu__func-btn"
            onClick={(e) => e.stopPropagation()}
          >
            Переместить
          </button>
          <button
            type="button"
            className="card-context-menu__func-btn"
            onClick={(e) => e.stopPropagation()}
          >
            Копировать
          </button>
          <button
            type="button"
            className="card-context-menu__func-btn"
            onClick={(e) => e.stopPropagation()}
          >
            Изменить даты
          </button>
          <button
            type="button"
            className="card-context-menu__func-btn"
            onClick={(e) => e.stopPropagation()}
          >
            Архивировать
          </button>
        </div>
      </div>

      <button type="button" className="card-context-menu__close-btn">
        Закрыть меню
        <span className="card-context-menu__cross-btn" />
      </button>
    </div>
  );
}
