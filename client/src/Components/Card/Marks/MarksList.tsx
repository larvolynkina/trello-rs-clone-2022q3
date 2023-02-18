import React from 'react';
import Mark from './Mark';
import { useAppSelector } from '../../../hooks/redux';

interface MarksListProps {
  marksId: string[];
}

function MarksList({ marksId }: MarksListProps) {
  const marks = useAppSelector((state) => state.BOARD.boardData.marks);

  return (
    <div className="card__marks">
      <h3>Метки</h3>
      <div className="card__mark-list">
        {marksId.map((item) => (
          <Mark markId={item} key={item} marks={marks || []} />
        ))}
      </div>
    </div>
  );
}

export default MarksList;
