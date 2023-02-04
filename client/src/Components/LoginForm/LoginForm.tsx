import { useState } from 'react';
import { Link } from 'react-router-dom';

import { APPRoute } from '../../const/const';
import { useAppDispatch } from '../../hooks/redux';
import { loginAction } from '../../store/serviceActions';
import './LoginForm.scss';

function LoginForm() {
  const dispatch = useAppDispatch();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginBtnClick = () => {
    dispatch(
      loginAction({
        email: login,
        password,
      }),
    );
  };

  return (
    <section className="login-form">
      <div className="login-form__container">
        <form className="login-form__wrapper">
          <h1 className="login-form__title">Вход в Trello</h1>
          <input
            className="login-form__input"
            type="email"
            placeholder="Укажите адрес электронной почты"
            required
            name="login"
            onChange={(evt) => setLogin(evt.currentTarget.value)}
          />
          <input
            className="login-form__input"
            type="password"
            placeholder="Введите пароль"
            required
            name="password"
            onChange={(evt) => setPassword(evt.currentTarget.value)}
          />
          <button className="login-form__login-btn" type="submit" onClick={handleLoginBtnClick}>
            Войти
          </button>
          <hr className="login-form__separator" />
          <Link className="login-form__sign-up-link" to={APPRoute.signUp}>
            Зарегистрировать аккаунт
          </Link>
        </form>
      </div>
    </section>
  );
}

export default LoginForm;
