import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { IChecklist, ParamTypes } from '../../types/card';
import {
  useDeleteCheckListMutation,
  useAddCheckListItemMutation,
} from '../../store/reducers/cards/cards.api';
import CheckListItem from './CheckListItem';

interface CheckListProps {
  checklist: IChecklist;
  id: string;
  checkListIndex: number;
}

function CheckList({ checklist, id, checkListIndex }: CheckListProps) {
  const [deleteCheckList] = useDeleteCheckListMutation();
  const [addCheckListItem] = useAddCheckListItemMutation();
  const { boardId, cardId } = useParams() as ParamTypes;
  const [adding, setAdding] = useState(false);
  const [title, setTitle] = useState('');

  function addCheckListItemHandler() {
    addCheckListItem({ boardId, cardId, title, id });
    setTitle('');
  }

  return (
    <div>
      <div>
        <div>{checklist.title}</div>
        <button
          type="button"
          onClick={() => deleteCheckList({ boardId, cardId, title: checklist.title, id })}
        >
          Удалить
        </button>
        <div>
          {checklist.checkItems.map((item) => (
            <CheckListItem checkListItem={item} key={item._id} checkListIndex={checkListIndex} />
          ))}
        </div>
        {!adding && (
          <button type="button" onClick={() => setAdding(true)}>
            Добавить элемент
          </button>
        )}
        {adding && (
          <div>
            <input
              type="text"
              placeholder="Добавить элемент"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
            <button type="button" onClick={addCheckListItemHandler}>
              Добавить
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CheckList;
