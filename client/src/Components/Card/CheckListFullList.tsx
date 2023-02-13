import { IChecklist } from '../../types/card';
import CheckList from './CheckList';

interface CheckListFullListProps {
  items: IChecklist[];
}

function CheckListFullList({ items }: CheckListFullListProps) {
  return (
    <div >
      {items.map((item, index) => (
        <CheckList checklist={item} key={item._id} id={item._id} checkListIndex={index} />
      ))}
    </div>
  );
}

export default CheckListFullList;
