import { useState, useEffect, useRef } from 'react';
import { useDetectClickOutside } from 'react-detect-click-outside';
import { useAppDispatch } from '../../../hooks/redux';
import { useAddCheckListMutation } from '../../../store/reducers/cards/cards.api';
import { setCheckListModalClose } from '../../../store/reducers/cards/cardSlice';
import Loader from '../../Loader';
import { onMouseDownHandler } from '../helpers';

interface CheckListModalProps {
  boardId: string;
  cardId: string;
}

function CheckListModal({ boardId, cardId }: CheckListModalProps) {
  const [title, setTitle] = useState('Чек-лист');
  const [mouseDownTarget, setMouseDownTarget] = useState(false);
  const [addCheckList, { isLoading, isSuccess }] = useAddCheckListMutation();
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement | null>(null);

  function onClickHandler() {
    addCheckList({ boardId, cardId, title });
    setTitle('Чек-лист');
  }

  function onClickCloseHandler() {
    dispatch(setCheckListModalClose());
    setTitle('Чек-лист');
  }

  const ref = useDetectClickOutside({
    onTriggered: () => {
      if (mouseDownTarget === false) {
        onClickCloseHandler();
      }
    },
  });

  function myListener(event: MouseEvent) {
    onMouseDownHandler(event, ref, setMouseDownTarget);
  }

  useEffect(() => {
    if(inputRef.current){
      inputRef.current.focus();
      inputRef.current.select();
    }
    document.addEventListener('mousedown', myListener);
    return () => {
      document.removeEventListener('mousedown', myListener);
    };
  }, []);

  useEffect(() => {
    if (isSuccess) {
      dispatch(setCheckListModalClose());
    }
  }, [isSuccess]);

  return (
    <>
      {isLoading && <Loader />}
      <div className="card__modal" ref={ref}>
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
          ref={inputRef}
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
    </>
  );
}

export default CheckListModal;
