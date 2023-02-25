import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import UserAvatar from '../UserAvatar';
import { emailValidation } from '../../const/AuthFormData';
import { IParticipant } from '../../types/workspace';
import './AddParticipantsToWorkspace.scss';
import { axiosApi } from '../../store/rootReducer';
import { APIRoute } from '../../const/const';
import { User } from '../../types/userData';
import { showErrorToast, showLoadingToast, showSuccessToast } from '../../utils/toast';
import { useAddParticipantsToWorkspaceMutation } from '../../store/reducers/workspace/workspace.api';

type EmailData = {
  email: string;
};

type UsersState = {
  users: User[];
  isUserLoading: boolean;
};

type AddParticipantsToWorkspaceProps = {
  workspaceId: string;
  participants: IParticipant[];
  onClose: () => void;
};

function AddParticipantsToWorkspace({
  onClose,
  participants,
  workspaceId,
}: AddParticipantsToWorkspaceProps) {
  const [addParticipants, { isLoading: isParticipantsAdding }] =
    useAddParticipantsToWorkspaceMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EmailData>();

  const [{ users, isUserLoading }, setUsers] = useState<UsersState>({
    users: [],
    isUserLoading: false,
  });

  const handleFindBtnClick: SubmitHandler<EmailData> = async (data, evt) => {
    evt?.preventDefault();

    const toastId = showLoadingToast('Поиск пользователя...');

    setUsers((prev) => ({
      ...prev,
      isUserLoading: true,
    }));

    try {
      const { data: user } = await axiosApi.post<User>(`${APIRoute.users}/email`, data);

      setUsers((prev) => ({
        isUserLoading: false,
        users: [...prev.users, user],
      }));
      showSuccessToast(toastId, 'Пользователь найден!');
      reset();
    } catch (err) {
      showErrorToast({
        id: toastId,
        err,
        fallbackMsg: 'Пользователь не найден!',
      });

      setUsers((prev) => ({
        ...prev,
        isUserLoading: false,
      }));
    }
  };

  const handleAddUserToWs = async () => {
    if (users.length) {
      const toastId = showLoadingToast('Добавление участников...');

      try {
        const { message } = await addParticipants({
          workspaceId,
          membersId: users.map((user) => user._id),
        }).unwrap();

        showSuccessToast(toastId, message);
        onClose();
      } catch (err) {
        showErrorToast({
          id: toastId,
          err,
        });
      }
    }
  };

  const checkEmailIsAdded = (value: string) => {
    if (users.some((user) => user.email === value)) {
      return 'Данный пользователь уже найден!';
    }
    if (participants.some((user) => user.email === value)) {
      return 'Данный пользователь уже добавлен к раб. пр.!';
    }
    return true;
  };

  return (
    <div className="add-participants-ws">
      <h3 className="add-participants-ws__title">Добавить участника</h3>
      <form
        className="add-participants-ws__input-wrapper"
        onSubmit={handleSubmit(handleFindBtnClick)}
      >
        <label className="auth-form__label" htmlFor="email">
          <input
            {...register('email', {
              ...emailValidation,
              validate: checkEmailIsAdded,
            })}
            type="email"
            className="auth-form__input add-participants-ws__email"
            placeholder="Адрес эл. почты"
          />
          {errors?.email && <p className="auth-form__input-error">{errors?.email?.message}</p>}
        </label>

        <button
          className="form-btn form-btn--small add-participants-ws__find-btn"
          type="submit"
          disabled={isUserLoading}
        >
          Найти
        </button>
      </form>

      <div className="add-participants-ws__users">
        {users.map((user) => (
          <UserAvatar key={user._id} participant={user} />
        ))}
      </div>

      <div className="add-participants-ws__controls">
        <button type="button" className="add-participants-ws__cancel-btn" onClick={onClose}>
          Отмена
        </button>

        <button
          type="button"
          className="form-btn form-btn--small"
          onClick={handleAddUserToWs}
          disabled={users.length === 0 || isParticipantsAdding || isUserLoading}
        >
          Добавить
        </button>
      </div>
    </div>
  );
}

export default AddParticipantsToWorkspace;
