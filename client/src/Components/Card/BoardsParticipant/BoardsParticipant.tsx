import React from 'react';
import { IUser } from '../../../types/card';
import Avatar from '../Avatar/Avatar';

interface BoardsParticipantProps {
  participant: IUser;
}

function BoardsParticipant({ participant }: BoardsParticipantProps) {
  return (
  <div className='card__board-participant'>
    <Avatar participant={participant} />
    <div>{participant.userName}</div>
  </div>
  );
}

export default BoardsParticipant;
