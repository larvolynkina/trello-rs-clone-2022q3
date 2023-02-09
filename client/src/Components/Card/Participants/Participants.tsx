import React from 'react';

interface ParticipantsProps {
  participants: string[];
}

function Participants({ participants }: ParticipantsProps) {
  return (
    <div>
      <h3>Участники</h3>
      <ul>
        {participants.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default Participants;
