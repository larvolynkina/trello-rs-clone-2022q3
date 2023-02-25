import React, { useState, Dispatch, SetStateAction, useEffect } from 'react';
import { IMark } from '../../types/board';
import MarkEditModal from './MarkEditModal';
import { toggleMarkCheckedInState } from '../../store/reducers/cards/cardSlice';
import { updateCardInStore } from '../../store/reducers/board/boardState';
import { useUpdateMarksIdArrayMutation } from '../../store/reducers/cards/cards.api';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { ICard } from '../../types/card';

type MarkItemProps = {
  showCheckBox: boolean;
  showPensil: boolean;
  mark: IMark;
  setMarks: Dispatch<SetStateAction<IMark[]>>;
  index: number;
  boardId: string;
  cardId?: string;
  cardMarks?: string[];
};

function MarkItem({
  showCheckBox,
  showPensil,
  mark,
  setMarks,
  index,
  boardId,
  cardId,
  cardMarks,
}: MarkItemProps) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [active, setActive] = useState(false);
  const [cardMarksIdArray, setCardMarks] = useState(cardMarks);
  const [updateMarksIdArray] = useUpdateMarksIdArrayMutation();
  const dispatch = useAppDispatch();
  const { cardsData } = useAppSelector((state) => state.BOARD);

  function toggleMarkActive(event: React.ChangeEvent<HTMLInputElement>) {
    let newMarksIdArray: string[] = [];
    if (event.target.checked && cardMarksIdArray && mark._id) {
      newMarksIdArray = [...cardMarksIdArray, mark._id];
    } else if (cardMarksIdArray && mark._id) {
      newMarksIdArray = [...cardMarksIdArray].filter((value) => value !== mark._id);
    }
    dispatch(toggleMarkCheckedInState({ id: mark?._id, checked: event.target.checked }));
    setActive(event.target.checked);
    setCardMarks(newMarksIdArray);
    if (cardId) {
      updateMarksIdArray({ boardId, cardId, marks: newMarksIdArray });
      const foundCard = cardsData.find((card) => card._id === cardId);
      if (foundCard) {
        dispatch(updateCardInStore({card: { ...foundCard, marks: newMarksIdArray }}));
      }
    }
  }

  useEffect(() => {
    if (cardMarksIdArray && cardMarksIdArray.length > 0) {
      if (mark._id && cardMarksIdArray.includes(mark._id)) {
        setActive(true);
      }
    }
  }, [mark]);

  return (
    <div className="mark-item">
      {showCheckBox && (
        <input
          type="checkbox"
          className="mark-item__checkbox"
          checked={active}
          onChange={toggleMarkActive}
        />
      )}
      <button
        type="button"
        className="mark-item__body"
        style={{ backgroundColor: `${mark.color}50` }}
        onClick={() => setIsOpenModal(true)}
      >
        <div className="mark-item__circle" style={{ backgroundColor: mark.color }} />
        <p className="mark-item__text">{mark.text}</p>
      </button>
      {showPensil && (
        <button type="button" className="mark-item__pensil" onClick={() => setIsOpenModal(true)}>
          Редактировать метку
        </button>
      )}
      {isOpenModal && (
        <MarkEditModal
          boardId={boardId}
          mark={mark}
          setIsOpenModal={setIsOpenModal}
          setMarks={setMarks}
          typeAction="edit"
          index={index}
        />
      )}
    </div>
  );
}

MarkItem.defaultProps = {
  cardMarks: [],
  cardId: undefined,
};

export default MarkItem;
