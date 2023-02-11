import { SubmitHandler, useForm } from 'react-hook-form';

import FormInput from '../FormInput';
import { userNameValidation } from '../../const/AuthFormData';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { changeUserNameAction } from '../../store/serviceActions';
import { NewUserName } from '../../types/userData';
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
      <h3 className="new-name-form__title">Изменить имя пользователя</h3>

      <FormInput
        register={register}
        errors={errors}
        name="newUserName"
        validation={userNameValidation}
        placeholder={userData?.userName}
      />

      <button type="submit" className="new-name-form__btn form-btn" disabled={isLoading}>
        Изменить имя
      </button>
    </form>
  );
}

export default UserNameForm;
