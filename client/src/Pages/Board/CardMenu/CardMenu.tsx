import './cardMenu.scss';
import { useState } from 'react';

type CardMenuProps = {
  text: string;
  position: { x: number; y: number };
};

export default function CardMenu({ text, position }: CardMenuProps) {
  const [valueArea, setValueArea] = useState(text);
  const x = position.x + 260;
  const y = position.y + 40;
  return (
    <div className="card-context-menu">
      <div className="card-context-menu__form" style={{ top: y, left: x }}>
        <textarea
          className="card-context-menu__input"
          value={valueArea}
          onChange={(e) => {
            setValueArea(e.target.value);
          }}
          onClick={(e) => e.stopPropagation()}
        />
        <button type="button" className="card-context-menu__save-btn">
          Сохранить
        </button>
        <div className="card-context-menu__functions">
          <button type="button" className="card-context-menu__func-btn">
            Открыть карточку
          </button>
          <button type="button" className="card-context-menu__func-btn">
            Изменить метки
          </button>
          <button type="button" className="card-context-menu__func-btn">
            Изменить участников
          </button>
          <button type="button" className="card-context-menu__func-btn">
            Сменить обложку
          </button>
          <button type="button" className="card-context-menu__func-btn">
            Переместить
          </button>
          <button type="button" className="card-context-menu__func-btn">
            Копировать
          </button>
          <button type="button" className="card-context-menu__func-btn">
            Изменить даты
          </button>
          <button type="button" className="card-context-menu__func-btn">
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
