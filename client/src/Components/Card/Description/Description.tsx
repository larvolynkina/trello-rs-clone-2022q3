import React, { useState, useRef } from 'react';
import { useUpdateCardTitleOrDescrMutation } from '../../../store/reducers/cards/cards.api';

interface DescriptionProps {
  description: string;
  boardId: string;
  cardId: string;
}

function Description({ description, boardId, cardId }: DescriptionProps) {
  const [buttonText, setButtonText] = useState(
    description || 'Добавить более подробное описание...',
  );
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [updateCardTitle] = useUpdateCardTitleOrDescrMutation();
  const [updateDescription, setUpdateDescription] = useState(description);
  const [isEditing, setIsEditing] = useState(false);

  function onClickHandler() {
    setIsEditing(true);
    setTimeout(() => {
      if (textAreaRef.current) {
        textAreaRef.current.focus();
      }
    }, 100);
  }

  function onSaveHandler() {
    if (updateDescription !== description) {
      updateCardTitle({ boardId, cardId, description: updateDescription });
    }
    if (updateDescription) {
      setButtonText(updateDescription);
    } else {
      setButtonText('Добавить более подробное описание...');
    }
    setIsEditing(false);
  }

  function onCancelHandler() {
    setUpdateDescription(description);
    setButtonText(description || 'Добавить более подробное описание...');
    setIsEditing(false);
  }

  return (
    <div className="card__description">
      <h3>Описание</h3>

      {!isEditing ? (
        <button onClick={onClickHandler} className="card__description-button" type="button">
          {buttonText}
        </button>
      ) : (
        <div>
          <div>
            <textarea
              value={updateDescription}
              ref={textAreaRef}
              className="card__description-textarea"
              onChange={(event) => setUpdateDescription(event.target.value)}
              placeholder="Введите описание..."
              cols={30}
              rows={5}
            />
          </div>
          <div>
            <button
              className="card__description-btn card__description-btn--save"
              type="button"
              onClick={onSaveHandler}
            >
              Сохранить
            </button>
            <button
              className="card__description-btn card__description-btn--cancel"
              type="button"
              onClick={onCancelHandler}
            >
              Отмена
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Description;
