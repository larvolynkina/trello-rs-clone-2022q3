import { useDetectClickOutside } from 'react-detect-click-outside';
import { useAppDispatch } from '../../hooks/redux';
import { setAttachModalClose } from '../../store/reducers/cards/cardSlice';

function AttachModal() {
  const dispatch = useAppDispatch();

  function onClickCloseHandler() {
    dispatch(setAttachModalClose());
  }

  const ref = useDetectClickOutside({ onTriggered: onClickCloseHandler });

  return (
    <div className="card__modal" ref={ref}>
      <h3>Прикрепить</h3>
      <button
        className="card__modal-close"
        type="button"
        aria-label="close modal"
        onClick={onClickCloseHandler}
      />
      <span className="board-participants-modal__line" />

      <p>Прикрепить ссылку</p>
      <button className="card__description-btn card__description-btn--save" type="button">
        Прикрепить
      </button>
    </div>
  );
}

export default AttachModal;
