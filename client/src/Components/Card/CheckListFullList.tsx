import { IChecklist } from '../../types/card';
import CheckList from './CheckList';

interface CheckListFullListProps {
  items: IChecklist[];
  boardId: string;
  cardId: string;
}

function CheckListFullList({ items, boardId, cardId }: CheckListFullListProps) {
  return (
    <div >
      {items.map((item, index) => (
        <CheckList checklist={item} key={item._id} id={item._id} checkListIndex={index} boardId={boardId} cardId={cardId} />
      ))}
    </div>
  );
}

export default CheckListFullList;
