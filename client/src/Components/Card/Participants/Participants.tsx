import React from 'react';
import { IUser } from '../../../types/card';
import Avatar from '../Avatar/Avatar';

interface ParticipantsProps {
  participants: IUser[];
}

function Participants({ participants }: ParticipantsProps) {
  return (
    <div className="card__participants">
      <h3>Участники</h3>
      <div className="card__participants-list">
        {participants.map((participant) => (
          <Avatar participant={participant} key={participant._id} />
        ))}
        <div className="card__participants-add" />
      </div>
    </div>
  );
}

export default Participants;
