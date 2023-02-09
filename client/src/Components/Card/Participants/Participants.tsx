/* eslint-disable no-underscore-dangle */
import React from 'react';
import { IUser } from '../../../types/card';

interface ParticipantsProps {
  participants: IUser[];
}

function Participants({ participants }: ParticipantsProps) {
  return (
    <div className="card__participants">
      <h3>Участники</h3>
      <ul>
        {participants.map((item) => (
          <li key={item._id}>{item.userName}</li>
        ))}
      </ul>
    </div>
  );
}

export default Participants;
