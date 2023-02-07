import { Link } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';

import { APPRoute } from '../../const/const';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { loginAction } from '../../store/serviceActions';
import { LoginData } from '../../types/userData';
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
          <label htmlFor="email" className="auth-form__label">
            <input
              className="auth-form__input"
              type="email"
              placeholder="Укажите адрес электронной почты"
              {...register('email', {
                required: 'Поле обязательно к заполнению',
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: 'Значение не соответствует формату эл. почты',
                },
              })}
            />
            <p className="auth-form__input-error">{errors?.email && errors?.email?.message}</p>
          </label>
          <label htmlFor="password" className="auth-form__label">
            <input
              className="auth-form__input"
              type="password"
              placeholder="Введите пароль"
              {...register('password', {
                required: 'Поле обязательно к заполнению',
                minLength: {
                  value: 6,
                  message: 'Минимальная длина пароля 6 символов',
                },
                maxLength: {
                  value: 20,
                  message: 'Максимальная длина пароля 20 символов',
                },
              })}
            />
            <p className="auth-form__input-error">
              {errors?.password && errors?.password?.message}
            </p>
          </label>

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
