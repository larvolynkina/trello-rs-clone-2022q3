import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  setBoardParticipantsModalClose,
  setBoardParticipantsModalOpen,
} from '../../store/reducers/cards/cardSlice';

interface AsideButtonProps {
  text: string;
  ico: string;
}

function AsideButton({ text, ico }: AsideButtonProps) {
  const dispatch = useAppDispatch();
  const boardParticipantsModalActive = useAppSelector(
    (state) => state.CARD.boardParticipantsModalActive,
  );

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
  }

  return (
    <button onClick={onClickHandler} type="button" className="card__aside-btn">
      <div className="card__aside-btn-ico" style={{ backgroundImage: `url(${ico})` }} />
      <p>{text}</p>
    </button>
  );
}

export default AsideButton;
