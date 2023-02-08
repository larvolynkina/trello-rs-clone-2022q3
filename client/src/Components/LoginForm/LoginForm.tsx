import { Link } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';

import { APPRoute } from '../../const/const';
import { loginInputData } from '../../const/AuthFormData';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { loginAction } from '../../store/serviceActions';
import { LoginData } from '../../types/userData';
import FormInput from '../FormInput';
import './LoginForm.scss';

function LoginForm() {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.USER);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    mode: 'all',
  });

  const handleFormSubmit: SubmitHandler<LoginData> = (data, evt) => {
    evt?.preventDefault();
    dispatch(loginAction(data));
  };

  return (
    <section className="login-form auth-form">
      <div className="login-form__container">
        <form className="auth-form__wrapper" onSubmit={handleSubmit(handleFormSubmit)}>
          <h1 className="auth-form__title">Вход в Trello</h1>

          {loginInputData.map(({ id, ...props }) => (
            <FormInput<LoginData> key={id} register={register} errors={errors} {...props} />
          ))}

          <button className="login-form__btn form-btn" type="submit" disabled={isLoading}>
            Войти
          </button>
          <hr className="auth-form__separator" />
          <Link className="auth-form__link" to={APPRoute.signUp}>
            Зарегистрировать аккаунт
          </Link>
        </form>
      </div>
    </section>
  );
}

export default LoginForm;
