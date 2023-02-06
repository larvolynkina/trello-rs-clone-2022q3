import { ChangeEvent, useState, MouseEvent } from 'react';
import { Link } from 'react-router-dom';

import { APPRoute } from '../../const/const';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { loginAction } from '../../store/serviceActions';
import { LoginData } from '../../types/userData';
import './LoginForm.scss';

const initialLoginData: LoginData = {
  email: '',
  password: '',
};

function LoginForm() {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.USER);

  const [formData, setFormData] = useState(initialLoginData);

  const handleLoginBtnClick = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    dispatch(loginAction(formData));
  };

  const handleFormChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = evt.currentTarget;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const isButtonDisabled = isLoading || formData.email === '' || formData.password === '';

  return (
    <section className="login-form auth-form">
      <div className="login-form__container">
        <form className="auth-form__wrapper">
          <h1 className="auth-form__title">Вход в Trello</h1>
          <input
            className="auth-form__input"
            type="email"
            placeholder="Укажите адрес электронной почты"
            required
            name="email"
            onChange={handleFormChange}
          />
          <input
            className="auth-form__input"
            type="password"
            placeholder="Введите пароль"
            required
            name="password"
            onChange={handleFormChange}
          />
          <button
            className="login-form__btn form-btn"
            type="submit"
            onClick={handleLoginBtnClick}
            disabled={isButtonDisabled}
          >
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
