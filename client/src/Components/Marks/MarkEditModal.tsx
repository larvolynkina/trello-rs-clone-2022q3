import { useState, ReactElement, ChangeEvent, FormEvent, Dispatch, SetStateAction } from 'react';
import { IMark } from '../../types/card';
import MarkHeader from './MarkHeader';
import MarkItem from './MarkItem';

import { useAddNewMarkOnBoardMutation } from '../../store/reducers/board/board.api';
import { MARK_COLORS } from '../../const/const';

type MarkEditModalProps = {
  mark: IMark | null;
  children: ReactElement | ReactElement[];
  typeAction: 'create' | 'edit';
  setIsOpenModal: (b: boolean) => void;
  setMarks: Dispatch<SetStateAction<IMark[]>>;
  boardId: string;
};

function MarkEditModal({
  mark,
  children,
  typeAction,
  setIsOpenModal,
  setMarks,
  boardId,
}: MarkEditModalProps) {
  const [ addNewMarkOnBoard ] = useAddNewMarkOnBoardMutation();
  const [text, setText] = useState('');
  const [newMark, setNewMark] = useState({
    color: '#c6c8ce',
    text: '',
    checked: false,
  });

  const handleClickColor = (color: string) => {
    setNewMark({
      ...newMark,
      color,
    });
  };

  const handleChangeText = (e: ChangeEvent<HTMLInputElement>) => {
    setNewMark({
      ...newMark,
      text: e.target.value,
    });
    setText(e.target.value);
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (typeAction === 'create') {
      addNewMarkOnBoard({boardId, text: newMark.text, color: newMark.color});
      setMarks((prev: IMark[]) => [...prev, newMark]);
      setIsOpenModal(false);
    } else if (typeAction === 'edit') {
      console.log('edit');
    }
  };
  return (
    <form className="mark-edit" onSubmit={handleFormSubmit} action="">
      <MarkHeader isShow={setIsOpenModal} />
      <div className="mark-edit__present">
        <div className="mark-edit__mark-item">
          <MarkItem showCheckBox={false} showPensil={false} mark={mark || newMark} />
        </div>
      </div>
      <div className="mark-edit__body">
        <label className="mark-edit__label" htmlFor="name">
          Название
          <input
            type="text"
            className="mark-edit__input"
            name="name"
            value={text}
            onChange={handleChangeText}
          />
        </label>
        <p className="mark-edit__label">Цвет</p>
        <div className="mark-edit__colors">
          {MARK_COLORS.map((color) => (
            <button
              key={color}
              type="button"
              className="mark-edit__color-btn"
              style={{ backgroundColor: color }}
              onClick={() => handleClickColor(color)}
            >
              цвет
            </button>
          ))}
        </div>
      </div>
      <div className="mark-edit__btns">{children}</div>
    </form>
  );
}

export default MarkEditModal;
