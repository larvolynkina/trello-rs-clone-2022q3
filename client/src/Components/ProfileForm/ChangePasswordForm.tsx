import { SubmitHandler, useForm } from 'react-hook-form';

import { passwordValidation } from '../../const/AuthFormData';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { changeUserPasswordAction } from '../../store/serviceActions';
import { ChangePasswordData } from '../../types/userData';
import FormInput from '../FormInput';
import './ChangePasswordForm.scss';

function ChangePasswordForm() {
  const { isLoading } = useAppSelector((state) => state.USER);
  const dispatch = useAppDispatch();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordData>({
    mode: 'onBlur',
  });

  const handleFormSubmit: SubmitHandler<ChangePasswordData> = (data, evt) => {
    evt?.preventDefault();
    dispatch(changeUserPasswordAction(data));
  };

  return (
    <form className="change-password-form" onSubmit={handleSubmit(handleFormSubmit)}>
      <h3 className="change-password-form__title">Изменить пароль</h3>

      <FormInput
        register={register}
        errors={errors}
        type="password"
        name="currentPassword"
        validation={passwordValidation}
        placeholder="Введите текущий пароль"
      />

      <FormInput
        register={register}
        errors={errors}
        type="password"
        name="newPassword"
        validation={{
          ...passwordValidation,
          validate: (value) =>
            value !== watch('currentPassword') || 'Новый пароль не должен совпадать c текущим!',
        }}
        placeholder="Введите новый пароль"
      />

      <button type="submit" className="change-password-form__btn form-btn" disabled={isLoading}>
        Изменить пароль
      </button>
    </form>
  );
}

export default ChangePasswordForm;
