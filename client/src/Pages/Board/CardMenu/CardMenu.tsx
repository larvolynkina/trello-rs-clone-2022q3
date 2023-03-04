import './cardMenu.scss';
import { KeyboardEvent, MouseEvent, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../../hooks/redux';
import { useDeleteCardByIdMutation } from '../../../store/reducers/cards/cards.api';
import { deleteCardFromColumnInStore } from '../../../store/reducers/board/boardState';

type CardMenuProps = {
  text: string;
  position: { x: number; y: number };
  closeMenu: (b: boolean) => void;
  saveCardTitle: (title: string) => void;
};

export default function CardMenu({ text, position, closeMenu, saveCardTitle }: CardMenuProps) {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [valueArea, setValueArea] = useState(text);
  const [, setSearchParams] = useSearchParams();
  const { openMenuCardArgs, boardData } = useAppSelector((state) => state.BOARD);
  const dispatch = useAppDispatch();
  const [deleteCardById] = useDeleteCardByIdMutation();
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
    if (valueArea.trim() === '') {
      setValueArea(text);
    } else if (valueArea && text !== valueArea.trim()) {
      saveCardTitle(valueArea.trim());
    } else {
      setValueArea(text);
    }
    closeMenu(false);
  };

  const handleMouseDownMenuBody = () => {
    setIsMouseDown(true);
  };

  const handleClickOpenCard = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setSearchParams({ card: openMenuCardArgs.cardId });
    closeMenu(false);
  };

  const handleDeleteClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    dispatch(deleteCardFromColumnInStore({ cardId: openMenuCardArgs.cardId }));
    deleteCardById({ boardId: boardData._id, cardId: openMenuCardArgs.cardId });
    closeMenu(false);
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
            onClick={handleClickOpenCard}
          >
            Открыть карточку
          </button>

          <button type="button" className="card-context-menu__func-btn" onClick={handleDeleteClick}>
            Удалить
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
