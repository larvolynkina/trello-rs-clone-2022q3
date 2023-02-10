import { IChecklist } from '../../types/card';
import CheckList from './CheckList';

interface CheckListListProps {
  items: IChecklist[];
}

function CheckListList({ items }: CheckListListProps) {
  return (
    <div>
      {items.map((item, index) => (
        <CheckList checklist={item} key={item._id} id={item._id} checkListIndex={index} />
      ))}
    </div>
  );
}

export default CheckListList;
