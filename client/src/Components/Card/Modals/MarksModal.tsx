import React from 'react';
import Marks from '../../Marks';

interface MarksModalProps {
  from: 'card';
  boardId: string;
  cardMarks: string[];
}

function MarksModal({ from, boardId, cardMarks }: MarksModalProps) {
  return (
    <div className="card__modal">
      <Marks boardId={boardId} cardMarks={cardMarks} from={from} />
    </div>
  );
}

export default MarksModal;
