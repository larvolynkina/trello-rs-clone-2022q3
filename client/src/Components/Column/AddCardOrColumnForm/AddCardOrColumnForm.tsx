import { ChangeEvent, KeyboardEvent, useState } from 'react';
import './addCardOrColumnForm.scss';

type AddCardOrColumnFormProps = {
  textButton: string;
  placeholderTextarea: string;
  saveObject: (title: string) => void;
  setIsOpenAddForm: (b: boolean) => void;
};
function AddCardOrColumnForm({
  textButton,
  placeholderTextarea,
  saveObject,
  setIsOpenAddForm,
}: AddCardOrColumnFormProps) {
  const [text, setText] = useState('');

  const handleClickAddButton = () => {
    saveObject(text);
    setText('');
  };
  const handleChangeTextarea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };
  const handleKeyUp = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpenAddForm(false);
      setText('');
    }
  };
  return (
    <div
      className="AddCardOrColumnForm"
      onClick={(e) => e.stopPropagation()}
      onKeyUp={handleKeyUp}
      aria-hidden="true"
    >
      <textarea
        className="AddCardOrColumnForm__text"
        placeholder={placeholderTextarea}
        value={text}
        onChange={handleChangeTextarea}
      />
      <div className="AddCardOrColumnForm__footer">
        <button
          className="AddCardOrColumnForm__add-btn"
          type="button"
          onClick={handleClickAddButton}
        >
          {textButton}
        </button>
        <button
          className="AddCardOrColumnForm__cancel"
          type="button"
          onClick={() => setIsOpenAddForm(false)}
        >
          <span className="AddCardOrColumnForm__cross-btn" />
        </button>
      </div>
    </div>
  );
}

export default AddCardOrColumnForm;
