import { SubmitHandler, useForm } from 'react-hook-form';

import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { changeUserNameAction } from '../../../store/serviceActions';
import { NewUserName } from '../../../types/userData';
import './UserNameForm.scss';

function UserNameForm() {
  const { userData, isLoading } = useAppSelector((state) => state.USER);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewUserName>();

  const handleFormSubmit: SubmitHandler<NewUserName> = (data, evt) => {
    evt?.preventDefault();
    dispatch(changeUserNameAction(data));
  };

  return (
    <form className="new-name-form" onSubmit={handleSubmit(handleFormSubmit)}>
      <h3 className="new-name-form__title">Имя пользователя</h3>
      <label htmlFor="newUserName" className="auth-form__label">
        <input
          type="text"
          placeholder={userData?.userName}
          {...register('newUserName', {
            required: 'Поле обязательно к заполнению',
            minLength: {
              value: 3,
              message: 'Минимальная длина имени 3 символа',
            },
          })}
          className="auth-form__input"
        />
        {errors?.newUserName && (
          <p className="auth-form__input-error">{errors?.newUserName?.message}</p>
        )}
      </label>

      <button type="submit" className="new-name-form__btn form-btn" disabled={isLoading}>
        Изменить имя
      </button>
    </form>
  );
}

export default UserNameForm;
