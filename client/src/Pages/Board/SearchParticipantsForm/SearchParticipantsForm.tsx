import { useState } from 'react';
import './searchParticipantsForm.scss';
import { toast } from 'react-toastify';

import {
  useGetUserByEmailMutation,
  useAddMembersOnBoardMutation,
} from '../../../store/reducers/board/board.api';
import { useAppDispatch } from '../../../hooks/redux';
import { addParticipantsInStore } from '../../../store/reducers/board/boardState';
import { IUser } from '../../../types/card';
import UserAvatar from '../../../Components/UserAvatar';

type SearchParticipantsFormProps = {
  setIsShowSearchForm: (b: boolean) => void;
  boardId: string;
};

function SearchParticipantsForm({ setIsShowSearchForm, boardId }: SearchParticipantsFormProps) {
  const [getUserByEmail] = useGetUserByEmailMutation();
  const [addMembersOnBoard] = useAddMembersOnBoardMutation();
  const [inputText, setInputText] = useState('');
  const [parts, setParts] = useState<IUser[] | []>([]);
  const dispatch = useAppDispatch();

  const handleSaveParticipants = () => {
    const membersId = parts.map((part) => part._id);
    setIsShowSearchForm(false);
    setInputText('');
    dispatch(addParticipantsInStore(parts));
    addMembersOnBoard({ boardId, membersId }).then((res) => {
      if ('error' in res && 'status' in res.error) {
        if (res.error.status === 400) {
          toast.error('Этот(эти) пользователь(-ли) уже участник(и) доски' , {autoClose: 1000});
        } 
      }
    });
    setParts([]);
  };

  const handleCancelParticipants = () => {
    setIsShowSearchForm(false);
  };

  const handleSearchParticipants = () => {
    async function getPart() {
      const response = await getUserByEmail({ boardId, email: inputText });
      return response;
    }
    getPart().then((res) => {
      if ('data' in res) {
        const part = res.data;
        if (parts.find((el) => el._id === part._id)) {
          toast.error('Пользователь уже добавлен в список', {autoClose: 1000});
        } else {
          setParts([...parts, res.data]);
        }
        setInputText('');
      } else if ('error' in res && 'status' in res.error) {
        if (res.error.status === 400) {
          toast.error('Пользователя с указанным email не существует', {autoClose: 1000});
        }
      }
    });
  };

  return (
    <div className="add-participants">
      <form className="add-participants__form">
        <label htmlFor="searchParticipantsInput" className="add-participants__label">
          Добавить участника
          <input
            id="searchParticipantsInput"
            type="search"
            placeholder="Адрес электронной почты"
            className="add-participants__input"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <button
            type="button"
            className="add-participants__search-btn"
            onClick={handleSearchParticipants}
          >
            Найти
          </button>
        </label>
        <ul className="add-participants__list">
          {parts.map((part) => (
            <li className="add-participants__item" key={part._id}>
              <UserAvatar participant={part} />
              <p>{part.email}</p>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="add-participants__add-btn"
          onClick={handleSaveParticipants}
        >
          Добавить
        </button>
        <button
          type="button"
          className="add-participants__cancel-btn"
          onClick={handleCancelParticipants}
        >
          Отмена
        </button>
      </form>
    </div>
  );
}

export default SearchParticipantsForm;
