import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Title from './Title';
import Description from './Description';
import Participants from './Participants';
import BoardParticipantsModal from '../BoardParticipantsModal';
import {
  useGetCardByIdQuery,
  useGetCardParticipantsQuery,
} from '../../store/reducers/cards/cards.api';
import { useGetBoardParticipantsQuery } from '../../store/reducers/board/board.api';
import './Card.scss';

type ParamTypes = {
  boardId: string;
  cardId: string;
};

function Card() {
  const { boardId, cardId } = useParams() as ParamTypes;
  const { data } = useGetCardByIdQuery({ boardId, cardId });
  const { data: cardParticipants } = useGetCardParticipantsQuery({ boardId, cardId });
  const { data: boardParticipants } = useGetBoardParticipantsQuery({ boardId });

  const [boardParticipantsModalActive, setBoardParticipantsModalActive] = useState(false);

  function closeBoardParticipantsModal() {
    setBoardParticipantsModalActive(false);
  }

  function openBoardParticipantsModal() {
    setTimeout(() => {
      setBoardParticipantsModalActive(true);
    }, 0);
  }

  document.addEventListener('click', (event) => {
    if (boardParticipantsModalActive) {
      const target = event.target as HTMLElement;
      const targetParent = target.closest('div');
      if (targetParent) {
        if (
          !targetParent.classList.contains('board-participants-modal') &&
          !targetParent.classList.contains('board-participants-modal__list') &&
          !targetParent.classList.contains('board-participants-modal__participant')
        ) {
          setBoardParticipantsModalActive(false);
        }
      }
    }
  });

  return (
    <>
      {data && (
        <div className="card">
          <Title title={data.card.title} boardId={boardId} cardId={cardId} column={data.column} />
          {cardParticipants && cardParticipants.length > 0 && (
            <Participants
              participants={cardParticipants}
              onClick={() => openBoardParticipantsModal()}
            />
          )}
          <Description description={data.card.description} boardId={boardId} cardId={cardId} />
        </div>
      )}
      {boardParticipantsModalActive && (
        <div className="card__board-participants-modal">
          <BoardParticipantsModal
            boardParticipants={boardParticipants || []}
            cardParticipantsId={data?.card.participants || []}
            onClick={() => closeBoardParticipantsModal()}
          />
        </div>
      )}
    </>
  );
}

export default Card;
