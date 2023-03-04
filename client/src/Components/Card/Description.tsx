import React, { useState, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useUpdateCardTitleOrDescrMutation } from '../../store/reducers/cards/cards.api';
import { updateCardInStore } from '../../store/reducers/board/boardState';

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
  const dispatch = useAppDispatch();
  const { cardsData } = useAppSelector((state) => state.BOARD);

  function onClickHandler() {
    setIsEditing(true);
    setTimeout(() => {
      if (textAreaRef.current) {
        textAreaRef.current.focus();
        textAreaRef.current.setSelectionRange(
          textAreaRef.current.value.length,
          textAreaRef.current.value.length,
        );
      }
    }, 100);
  }

  function onSaveHandler() {
    if (updateDescription !== description) {
      const foundCard = cardsData.find((card) => card._id === cardId);
      if (foundCard) {
        dispatch(updateCardInStore({card: {...foundCard, description: updateDescription}}));
      }
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
      <span className="card__icon card__icon--descr" />
      <div className="card__description-header">
        <h3>Описание</h3>
        {buttonText !== 'Добавить более подробное описание...' && buttonText && (
          <button
            type="button"
            className="card__description-btn card__description-btn--edit"
            onClick={onClickHandler}
          >
            Изменить
          </button>
        )}
      </div>

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
          <div className="card__description-btn-wrapper">
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
