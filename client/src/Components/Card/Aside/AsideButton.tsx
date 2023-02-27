import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { useDeleteCardByIdMutation } from '../../../store/reducers/cards/cards.api';
import {
  setBoardParticipantsModalClose,
  setBoardParticipantsModalOpen,
  setCheckListModalClose,
  setCheckListModalOpen,
  setAttachModalClose,
  setAttachModalOpen,
  setMarksModalClose,
  setMarksModalOpen,
} from '../../../store/reducers/cards/cardSlice';
import { deleteCardFromColumnInStore } from '../../../store/reducers/board/boardState';

interface AsideButtonProps {
  text: string;
  ico: string;
  boardId: string;
  cardId: string;
  closeCard?: () => void;
}

function AsideButton({ text, ico, boardId, cardId, closeCard }: AsideButtonProps) {
  const dispatch = useAppDispatch();
  const boardParticipantsModalActive = useAppSelector(
    (state) => state.CARD.boardParticipantsModalActive,
  );
  const checkListModalActive = useAppSelector((state) => state.CARD.checkListModalActive);
  const attachModalActive = useAppSelector((state) => state.CARD.attachModalActive);
  const marksModalActive = useAppSelector((state) => state.CARD.marksModalActive);
  const [deleteCardById] = useDeleteCardByIdMutation();

  function onClickHandler() {
    if (text === 'Участники') {
      if (boardParticipantsModalActive) {
        dispatch(setBoardParticipantsModalClose());
      } else {
        setTimeout(() => {
          dispatch(setBoardParticipantsModalOpen());
        }, 0);
      }
    }
    if (text === 'Чек-лист') {
      if (checkListModalActive) {
        dispatch(setCheckListModalClose());
      } else {
        setTimeout(() => {
          dispatch(setCheckListModalOpen());
        }, 0);
      }
    }
    if (text === 'Вложения') {
      if (attachModalActive) {
        dispatch(setAttachModalClose());
      } else {
        setTimeout(() => {
          dispatch(setAttachModalOpen());
        }, 0);
      }
    }
    if (text === 'Метки') {
      if (marksModalActive) {
        dispatch(setMarksModalClose());
      } else {
        setTimeout(() => {
          dispatch(setMarksModalOpen());
        }, 0);
      }
    }
    if (text === 'Удалить') {
      dispatch(deleteCardFromColumnInStore({cardId}));
      deleteCardById({ boardId, cardId });
      if (closeCard) {
        closeCard();
      }
    }
  }

  return (
    <button onClick={onClickHandler} type="button" className="card__aside-btn">
      <div className="card__aside-btn-ico" style={{ backgroundImage: `url(${ico})` }} />
      <p>{text}</p>
    </button>
  );
}

AsideButton.defaultProps = {
  closeCard: undefined,
};

export default AsideButton;
