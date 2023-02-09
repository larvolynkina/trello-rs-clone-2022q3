import React from 'react';
import BoardsParticipant from '../BoardsParticipant/BoardsParticipant';
import { IUser } from '../../../types/card';

interface ParticipantModalProps {
  boardParticipants: IUser[];
  cardParticipantsId: string[];
}

function ParticipantModal({ boardParticipants, cardParticipantsId }: ParticipantModalProps) {
  return (
    <div className="card__participant-modal">
      <h3>Участники</h3>
      <span className="card__participant-modal-line" />
      <p>Участники доски</p>
      <div className="card__participant-modal-list">
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

export default ParticipantModal;
