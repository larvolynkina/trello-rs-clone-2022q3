import React from 'react';
import { IUser } from '../../types/card';
import UserAvatar from '../UserAvatar';

interface ParticipantsProps {
  participants: IUser[];
  onClick: () => void;
}

function Participants({ participants, onClick }: ParticipantsProps) {
  return (
    <div className="card__participants">
      <h3>Участники</h3>
      <div className="card__participants-list">
        {participants.map((participant) => (
          <UserAvatar participant={participant} key={participant._id} />
        ))}
        <button
          type="button"
          aria-label="open modal"
          className="card__participants-add"
          onClick={onClick}
        />
      </div>
    </div>
  );
}

export default Participants;
