import { useParams } from 'react-router-dom';
import { ICheckItem, ParamTypes } from '../../types/card';
import { useDeleteCheckListItemMutation } from '../../store/reducers/cards/cards.api';

interface CheckListItemProps {
  checkListItem: ICheckItem;
  checkListIndex: number;
}

function CheckListItem({ checkListItem, checkListIndex }: CheckListItemProps) {
  const { boardId, cardId } = useParams() as ParamTypes;
  const [deleteCheckListItem] = useDeleteCheckListItemMutation();
  return (
    <div>
      <div>{checkListItem.title}</div>
      <button
        type="button"
        onClick={() => deleteCheckListItem({ boardId, cardId, id: checkListItem._id, checkListIndex })}
      >
        Удалить элемент
      </button>
    </div>
  );
}

export default CheckListItem;
