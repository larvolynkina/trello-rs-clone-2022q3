import { ChangeEvent, KeyboardEvent, useState, useRef, useEffect } from 'react';
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
  const inputArea = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (inputArea.current) {
      inputArea.current.focus();
    }
  }, []);
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
  const handleKeyDownTextArea = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      saveObject(text);
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
        ref={inputArea}
        onKeyDown={handleKeyDownTextArea}
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
