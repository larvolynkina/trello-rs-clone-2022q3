import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
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

interface AsideButtonProps {
  text: string;
  ico: string;
}

function AsideButton({ text, ico }: AsideButtonProps) {
  const dispatch = useAppDispatch();
  const boardParticipantsModalActive = useAppSelector(
    (state) => state.CARD.boardParticipantsModalActive,
  );
  const checkListModalActive = useAppSelector((state) => state.CARD.checkListModalActive);
  const attachModalActive = useAppSelector((state) => state.CARD.attachModalActive);
  const marksModalActive = useAppSelector((state) => state.CARD.marksModalActive);

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
  }

  return (
    <button onClick={onClickHandler} type="button" className="card__aside-btn">
      <div className="card__aside-btn-ico" style={{ backgroundImage: `url(${ico})` }} />
      <p>{text}</p>
    </button>
  );
}

export default AsideButton;
