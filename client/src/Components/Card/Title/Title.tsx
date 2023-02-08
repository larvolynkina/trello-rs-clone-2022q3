import React, { useState, useRef } from 'react';
import { useUpdateCardTitleOrDescrMutation } from '../../../store/reducers/cards/cards.api';

interface TitleProps {
  title: string;
  boardId: string;
  cardId: string;
}

function Title({ title, boardId, cardId }: TitleProps) {
  const [text, setText] = useState(title);
  const inputRef = useRef<HTMLInputElement>(null);
  const [updateCardTitle] = useUpdateCardTitleOrDescrMutation();

  function onBlurHandler() {
    if (text !== title) {
      updateCardTitle({ boardId, cardId, title: text });
    }
  }

  function onKeyDownHandler(event: React.KeyboardEvent<HTMLInputElement>) {
    if (inputRef.current && event.key === 'Enter') {
      inputRef.current.blur();
    }
  }

  return (
    <div className="card__title">
      <input
        ref={inputRef}
        className="card__title-input"
        type="text"
        value={text}
        onChange={(event) => setText(event.target.value)}
        onBlur={onBlurHandler}
        onKeyDown={(event) => onKeyDownHandler(event)}
      />
    </div>
  );
}

export default Title;
