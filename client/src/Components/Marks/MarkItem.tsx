import { useState, Dispatch, SetStateAction } from 'react';
import { IMark } from '../../types/card';
import MarkEditModal from './MarkEditModal';

type MarkItemProps = {
  showCheckBox: boolean;
  showPensil: boolean;
  mark: IMark;
  setMarks: Dispatch<SetStateAction<IMark[]>>;
  index: number;
  boardId: string;
};

function MarkItem({ showCheckBox, showPensil, mark, setMarks, index, boardId }: MarkItemProps) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  return (
    <div className="mark-item">
      {showCheckBox && <input type="checkbox" className="mark-item__checkbox" />}
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
        <button type="button" className="mark-item__pensil">
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

export default MarkItem;
