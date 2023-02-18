import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { IChecklist } from '../../../types/card';
import {
  useDeleteCheckListMutation,
  useAddCheckListItemMutation,
  useUpdateCheckListTitleMutation,
} from '../../../store/reducers/cards/cards.api';
import CheckListItem from './CheckListItem';
import { deleteCheckListFromState } from '../../../store/reducers/cards/cardSlice';
import { useAppDispatch } from '../../../hooks/redux';
import Loader from '../../Loader';

interface CheckListProps {
  checklist: IChecklist;
  id: string;
  checkListIndex: number;
  boardId: string;
  cardId: string;
}

function CheckList({ checklist, id, checkListIndex, boardId, cardId }: CheckListProps) {
  const [deleteCheckList] = useDeleteCheckListMutation();
  const [addCheckListItem, { isLoading }] = useAddCheckListItemMutation();
  const [updateCheckListTitle] = useUpdateCheckListTitleMutation();
  const [adding, setAdding] = useState(false);
  const [title, setTitle] = useState(checklist.title);
  const [newItemTitle, setNewItemTitle] = useState('');
  const [checklistProgress, setCheckListProgress] = useState(0);
  const [progressLineWidth, setProgressLineWidth] = useState(0);
  const dispatch = useAppDispatch();

  function addCheckListItemHandler() {
    addCheckListItem({ boardId, cardId, title: newItemTitle, id });
    setNewItemTitle('');
    setAdding(false);
  }

  function deleteCheckListItemHandler() {
    dispatch(deleteCheckListFromState(id));
    deleteCheckList({ boardId, cardId, title: checklist.title, id });
  }

  function onChangeTitleInputHandler() {
    if (!title) {
      toast.error('Название чек-листа не должно быть пустой строкой');
      setTitle(checklist.title);
      return;
    }
    if (checklist.title !== title) {
      updateCheckListTitle({ boardId, cardId, title, checkListIndex });
    }
  }

  useEffect(() => {
    if (!checklist.checkItems.length) {
      setCheckListProgress(0);
      setProgressLineWidth(0);
    } else {
      const checkedItems = checklist.checkItems.filter((item) => item.checked).length;
      const progress = Math.round((100 * checkedItems) / checklist.checkItems.length);
      setCheckListProgress(progress);
      setProgressLineWidth(progress);
    }
  }, [checklist]);

  return (
    <div className="checklist">
      <div className="checklist__header">
        <span className="card__icon card__icon--checklist" />
        <input
          className="checklist__title"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          onBlur={onChangeTitleInputHandler}
        />
        <button className="checklist__btn" type="button" onClick={deleteCheckListItemHandler}>
          Удалить
        </button>
      </div>
      <div className="checklist__progress">
        <p className="checklist__progress-percent">{`${checklistProgress}%`}</p>
        <div className="checklist__progress-line" style={{ width: `${progressLineWidth}%` }} />
      </div>
      <div className="checklist__items">
        {checklist.checkItems.map((item) => (
          <CheckListItem
            checkListItem={item}
            key={item._id}
            checkListIndex={checkListIndex}
            boardId={boardId}
            cardId={cardId}
          />
        ))}
      </div>
      {!adding && (
        <button className="checklist__btn" type="button" onClick={() => setAdding(true)}>
          Добавить элемент
        </button>
      )}
      {adding && (
        <div className="checklist__item-add-form">
          <input
            type="text"
            className="checklist__item-add-form-input"
            placeholder="Добавить элемент"
            value={newItemTitle}
            onChange={(event) => setNewItemTitle(event.target.value)}
          />
          <div className="checklist__item-add-form-wrapper">
            <button className="checklist__btn" type="button" onClick={addCheckListItemHandler}>
              Добавить
            </button>
            <button className="checklist__btn" type="button" onClick={() => setAdding(false)}>
              Отмена
            </button>
          </div>
        </div>
      )}
      {isLoading && <Loader />}
    </div>
  );
}

export default CheckList;
