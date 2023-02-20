import { useState, useEffect } from 'react';
import Mark from './Mark';
import { useAppSelector, useAppDispatch } from '../../../hooks/redux';
import { updateMarksIdArrayInState } from '../../../store/reducers/cards/cardSlice';
import { useUpdateMarksIdArrayMutation } from '../../../store/reducers/cards/cards.api';

interface MarksListProps {
  marksId: string[];
  boardId: string;
  cardId: string;
}

function MarksList({ marksId, boardId, cardId }: MarksListProps) {
  const marks = useAppSelector((state) => state.BOARD.boardData.marks);
  const [marksIdArray, setMarksIdArray] = useState(marksId);
  const dispatch = useAppDispatch();
  const [updateMarksIdArray] = useUpdateMarksIdArrayMutation();

  useEffect(() => {
    setMarksIdArray(marksId);
  }, [marksId]);

  useEffect(() => {
    const updatedMarksIdArray: string[] = [];
    if (marks && marks.length > 0) {
      const boardMarksIds = marks.map((item) => item._id);
      marksId.forEach((id) => {
        if (boardMarksIds.includes(id)) {
          updatedMarksIdArray.push(id);
        }
      });
    }
    setMarksIdArray(updatedMarksIdArray);
    dispatch(updateMarksIdArrayInState(updatedMarksIdArray));
    updateMarksIdArray({ boardId, cardId, marks: updatedMarksIdArray });
  }, [marks]);

  return (
    <div className="card__marks">
      <h3>Метки</h3>
      <div className="card__mark-list">
        {marksIdArray.map((item) => (
          <Mark markId={item} key={item} marks={marks || []} />
        ))}
      </div>
    </div>
  );
}

export default MarksList;
