import React from 'react';
import BoardsParticipant from './BoardsParticipant';
import { IUser } from '../../types/card';
import './BoardParticipantsModal.scss';

interface ParticipantModalProps {
  boardParticipants: IUser[];
  cardParticipantsId: string[];
  onClick: () => void;
}

function BoardParticipantsModal({
  boardParticipants,
  cardParticipantsId,
  onClick,
}: ParticipantModalProps) {
  return (
    <div className="board-participants-modal">
      <h3>Участники</h3>
      <button
        className="board-participants-modal__close"
        type="button"
        aria-label="close modal"
        onClick={onClick}
      />
      <span className="board-participants-modal__line" />
      <p>Участники доски</p>
      <div className="board-participants-modal__list">
        {boardParticipants.map((participant) => (
          <BoardsParticipant
            participant={participant}
            key={participant._id}
            cardParticipantsId={cardParticipantsId}
          />
        ))}
      </div>
    </div>
  );
}

export default BoardParticipantsModal;
