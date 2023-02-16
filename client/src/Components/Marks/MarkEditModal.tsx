import { useState, ChangeEvent, FormEvent, Dispatch, SetStateAction } from 'react';
import { IMark } from '../../types/card';
import MarkHeader from './MarkHeader';
import MarkItem from './MarkItem';

import {
  useAddNewMarkOnBoardMutation,
  useUpdateMarkOnBoardMutation,
  useDeleteMarkFromBoardMutation,
} from '../../store/reducers/board/board.api';
import { MARK_COLORS } from '../../const/const';

type MarkEditModalProps = {
  mark: IMark | null;
  typeAction: 'create' | 'edit';
  setIsOpenModal: (b: boolean) => void;
  setMarks: Dispatch<SetStateAction<IMark[]>>;
  boardId: string;
  index: number;
};

function MarkEditModal({
  mark,
  typeAction,
  setIsOpenModal,
  setMarks,
  boardId,
  index,
}: MarkEditModalProps) {
  const [addNewMarkOnBoard] = useAddNewMarkOnBoardMutation();
  const [updateMarkOnBoard] = useUpdateMarkOnBoardMutation();
  const [deleteMarkFromBoard] = useDeleteMarkFromBoardMutation();
  const [text, setText] = useState(mark?.text || '');
  const [newMark, setNewMark] = useState(() => {
    if (mark) return mark;
    return {
      color: '#c6c8ce',
      text: '',
      checked: false,
    };
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
      addNewMarkOnBoard({ boardId, text: newMark.text || '', color: newMark.color });
      setMarks((prev: IMark[]) => [...prev, newMark]);
      setIsOpenModal(false);
    } else if (typeAction === 'edit') {
      const body = {
        boardId,
        color: newMark.color,
        text: newMark.text || '',
        index,
      };
      updateMarkOnBoard(body);
      setMarks((prev: IMark[]) =>
        prev.map((el) =>
          el._id === mark?._id
            ? { ...el, color: newMark.color, checked: newMark.checked, text: newMark.text }
            : el,
        ),
      );
      setIsOpenModal(false);
    }
  };
  const handleDelete = () => {
    const body = {
      boardId,
      markId: mark?._id || '',
    };
    deleteMarkFromBoard(body);
    setMarks((prev: IMark[]) => prev.filter((el) => !(el._id === mark?._id)));
    setIsOpenModal(false);
  };

  return (
    <form className="mark-edit" onSubmit={handleFormSubmit} action="">
      <MarkHeader isShow={setIsOpenModal} />
      <div className="mark-edit__present">
        <div className="mark-edit__mark-item">
          <MarkItem
            showCheckBox={false}
            showPensil={false}
            mark={newMark}
            setMarks={setMarks}
            index={-1}
            boardId=""
          />
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
      <div className="mark-edit__btns">
        {typeAction === 'create' && (
          <button type="submit" className="marks__btn">
            Создать
          </button>
        )}
        {typeAction === 'edit' && (
          <>
            <button type="submit" className="marks__btn">
              Сохранить
            </button>
            <button type="button" className="marks__btn marks__btn--del" onClick={handleDelete}>
              Удалить
            </button>
          </>
        )}
      </div>
    </form>
  );
}

export default MarkEditModal;
