import React, { useState, useRef } from 'react';
import { toast } from 'react-toastify';
import { useUpdateCardTitleOrDescrMutation } from '../../store/reducers/cards/cards.api';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { updateCardInColumn } from '../../store/reducers/board/boardState';

interface TitleProps {
  title: string;
  boardId: string;
  cardId: string;
  column: string;
}

function Title({ title, boardId, cardId, column }: TitleProps) {
  const [text, setText] = useState(title);
  const inputRef = useRef<HTMLInputElement>(null);
  const [updateCardTitle] = useUpdateCardTitleOrDescrMutation();
  const dispatch = useAppDispatch();
  const { cardsData } = useAppSelector((state) => state.BOARD);

  function onBlurHandler() {
    if (!text) {
      toast.error('Имя карточки не должно быть пустой строкой');
      setText(title);
      return;
    }
    if (text !== title) {
      updateCardTitle({ boardId, cardId, title: text });
      dispatch(
        updateCardInColumn(
          cardsData.map((card) => {
            if (card._id === cardId) {
              return { ...card, title: text };
            }
            return card;
          }),
        ),
      );
    }
  }

  function onKeyDownHandler(event: React.KeyboardEvent<HTMLInputElement>) {
    if (inputRef.current && event.key === 'Enter') {
      inputRef.current.blur();
    }
  }

  return (
    <div className="card__title">
      <span className="card__icon card__icon--title" />
      <input
        ref={inputRef}
        className="card__title-input"
        type="text"
        value={text}
        onChange={(event) => setText(event.target.value)}
        onBlur={onBlurHandler}
        onKeyDown={(event) => onKeyDownHandler(event)}
      />
      <p className="card__title-column">
        в колонке <span>{column}</span>{' '}
      </p>
    </div>
  );
}

export default Title;
