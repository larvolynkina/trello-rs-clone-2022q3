import React, { useState, useCallback } from 'react';
import { ICheckItem } from '../../types/card';
import {
  useDeleteCheckListItemMutation,
  useSetCheckListItemCheckedMutation,
} from '../../store/reducers/cards/cards.api';
import {
  toggleCheckListItemCheckedInState,
  deleteCheckListItemFromState,
} from '../../store/reducers/cards/cardSlice';
import { useAppDispatch } from '../../hooks/redux';
import debounce from '../../helpers';

interface CheckListItemProps {
  checkListItem: ICheckItem;
  checkListIndex: number;
  boardId: string;
  cardId: string;
}

function CheckListItem({ checkListItem, checkListIndex, boardId, cardId }: CheckListItemProps) {
  const [deleteCheckListItem] = useDeleteCheckListItemMutation();
  const [setCheckListItemChecked] = useSetCheckListItemCheckedMutation();
  const [checked, setChecked] = useState(checkListItem.checked);
  const dispatch = useAppDispatch();

  const setCheckListItemStatus = useCallback(
    debounce((flag: boolean) => {
      setCheckListItemChecked({
        boardId,
        cardId,
        id: checkListItem._id,
        checkListIndex,
        status: flag,
      });
    }, 1000),
    [],
  );

  function onChangeCheckboxHandler(event: React.ChangeEvent<HTMLInputElement>) {
    dispatch(toggleCheckListItemCheckedInState({ id: checkListItem._id, checkListIndex }));
    setChecked(event.target.checked);
    setCheckListItemStatus(event.target.checked);
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
        onClick={() => {
          dispatch(deleteCheckListItemFromState({ id: checkListItem._id, checkListIndex }));
          deleteCheckListItem({ boardId, cardId, id: checkListItem._id, checkListIndex });
        }}
      />
    </div>
  );
}

export default CheckListItem;
