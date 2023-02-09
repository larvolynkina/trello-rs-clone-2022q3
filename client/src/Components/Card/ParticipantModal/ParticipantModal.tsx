import React from 'react';
import BoardsParticipant from '../BoardsParticipant/BoardsParticipant';
import { IUser } from '../../../types/card';

interface ParticipantModalProps {
  participants: IUser[];
}

function ParticipantModal({ participants }: ParticipantModalProps) {
    // console.log(participants)
  return (
    <div className="card__participant-modal">
      <h3>Участники</h3>
      <span className="card__participant-modal-line" />
      <p>Участники доски</p>
      <div>
        {participants.map((participant) => (
          <BoardsParticipant participant={participant} key={participant._id} />
        ))}
      </div>
    </div>
  );
}

export default ParticipantModal;
