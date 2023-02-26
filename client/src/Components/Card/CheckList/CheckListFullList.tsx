import { useEffect } from 'react';
import { useAppDispatch } from '../../../hooks/redux';
import { updateCardChecklistsInStore } from '../../../store/reducers/board/boardState';
import { IChecklist } from '../../../types/card';
import CheckList from './CheckList';

interface CheckListFullListProps {
  items: IChecklist[];
  boardId: string;
  cardId: string;
}

function CheckListFullList({ items, boardId, cardId }: CheckListFullListProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch( updateCardChecklistsInStore({cardId, checklists: items}))  
  }, [items]);

  return (
    <div >
      {items.map((item, index) => (
        <CheckList checklist={item} key={item._id} id={item._id} checkListIndex={index} boardId={boardId} cardId={cardId} />
      ))}
    </div>
  );
}

export default CheckListFullList;
