import { useState, Dispatch, SetStateAction, useEffect } from 'react';
import { IMark } from '../../types/card';
import MarkEditModal from './MarkEditModal';

type MarkItemProps = {
  showCheckBox: boolean;
  showPensil: boolean;
  mark: IMark;
  setMarks: Dispatch<SetStateAction<IMark[]>>;
  index: number;
  boardId: string;
  cardMarks?: string[];
};

function MarkItem({
  showCheckBox,
  showPensil,
  mark,
  setMarks,
  index,
  boardId,
  cardMarks,
}: MarkItemProps) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (cardMarks && cardMarks.length > 0) {
      if (mark._id && cardMarks.includes(mark._id)) {
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
          onChange={(event) => setActive(event.target.checked)}
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
};

export default MarkItem;
