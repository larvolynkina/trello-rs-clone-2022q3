import React from 'react';
import UserAvatar from '../UserAvatar';
import { IUser } from '../../types/card';

interface ParticipantsProps {
  onClick: () => void;
  cardParticipants: IUser[];
}

function Participants({ onClick, cardParticipants }: ParticipantsProps) {
  return (
    <div className="card__participants">
      <h3>Участники</h3>
      <div className="card__participants-list">
        {cardParticipants &&
          cardParticipants.length > 0 &&
          cardParticipants.map((participant) => (
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
