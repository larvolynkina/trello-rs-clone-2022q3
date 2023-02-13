import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDetectClickOutside } from 'react-detect-click-outside';
import { useAppDispatch } from '../../hooks/redux';
import { useAddCheckListMutation } from '../../store/reducers/cards/cards.api';
import { setCheckListModalClose } from '../../store/reducers/cards/cardSlice';
import { ParamTypes } from '../../types/card';

function CheckListModal() {
  const { boardId, cardId } = useParams() as ParamTypes;
  const [title, setTitle] = useState('Чек-лист');
  const [addCheckList] = useAddCheckListMutation();
  const dispatch = useAppDispatch();

  function onClickHandler() {
    addCheckList({ boardId, cardId, title });
    dispatch(setCheckListModalClose());
    setTitle('Чек-лист');
  }

  function onClickCloseHandler() {
    dispatch(setCheckListModalClose());
    setTitle('Чек-лист');
  }

  const ref = useDetectClickOutside({ onTriggered: onClickCloseHandler });

  return (
    <div className="card__checklist-modal" ref={ref}>
      <h3>Добавление списка задач</h3>
      <button
        className="card__modal-close"
        type="button"
        aria-label="close modal"
        onClick={onClickCloseHandler}
      />
      <span className="board-participants-modal__line" />
      <p>Название</p>
      <input
        className="card__checklist-modal-input"
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <button
        className="card__description-btn card__description-btn--save"
        onClick={onClickHandler}
        type="button"
      >
        Добавить
      </button>
    </div>
  );
}

export default CheckListModal;
