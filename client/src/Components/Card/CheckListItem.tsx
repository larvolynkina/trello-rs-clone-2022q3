import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ICheckItem, ParamTypes } from '../../types/card';
import {
  useDeleteCheckListItemMutation,
  useToggleCheckListItemCheckedMutation,
} from '../../store/reducers/cards/cards.api';

interface CheckListItemProps {
  checkListItem: ICheckItem;
  checkListIndex: number;
}

function CheckListItem({ checkListItem, checkListIndex }: CheckListItemProps) {
  const { boardId, cardId } = useParams() as ParamTypes;
  const [deleteCheckListItem] = useDeleteCheckListItemMutation();
  const [toggleCheckListItemChecked] = useToggleCheckListItemCheckedMutation();
  const [checked, setChecked] = useState(checkListItem.checked);

  function onChangeCheckboxHandler() {
    setChecked((prev) => !prev);
    toggleCheckListItemChecked({ boardId, cardId, id: checkListItem._id, checkListIndex });
  }

  return (
    <div className="checklist__item">
      <div className="checklist__item-wrapper">
        <input
          className="checklist__checkbox"
          type="checkbox"
          checked={checked}
          onChange={onChangeCheckboxHandler}
        />
        <div
          className={
            checkListItem.checked
              ? 'checklist__item-title checklist__item-title--checked '
              : 'checklist__item-title'
          }
        >
          {checkListItem.title}
        </div>
      </div>
      <button
        type="button"
        className="checklist__btn checklist__btn--delete"
        aria-label="delete checklist item"
        onClick={() =>
          deleteCheckListItem({ boardId, cardId, id: checkListItem._id, checkListIndex })
        }
      />
    </div>
  );
}

export default CheckListItem;
