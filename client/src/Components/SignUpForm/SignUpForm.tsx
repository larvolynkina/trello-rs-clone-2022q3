import { ChangeEvent, MouseEvent, useState } from 'react';
import { Link } from 'react-router-dom';

import { APPRoute } from '../../const/const';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { signUpAction } from '../../store/serviceActions';
import { SignUpData } from '../../types/userData';
import './SignUpForm.scss';

const initialFormData: SignUpData = {
  userName: '',
  email: '',
  password: '',
};

function SignUpForm() {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.USER);

  const [formData, setFormData] = useState<SignUpData>(initialFormData);

  const handleFormChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = evt.currentTarget;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignUpBtnClick = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    dispatch(signUpAction(formData));
  };

  const isButtonDisabled =
    isLoading || formData.userName === '' || formData.email === '' || formData.password === '';

  return (
    <section className="sign-up-form auth-form">
      <div className="sign-up-form__container">
        <form className="auth-form__wrapper">
          <h1 className="auth-form__title">Регистрация в Trello</h1>
          <input
            className="auth-form__input"
            type="text"
            placeholder="Укажите свое имя"
            required
            name="userName"
            onChange={handleFormChange}
          />
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
            autoComplete="on"
            onChange={handleFormChange}
          />
          <button
            className="sign-up-form__btn form-btn"
            type="submit"
            onClick={handleSignUpBtnClick}
            disabled={isButtonDisabled}
          >
            Зарегистрировать
          </button>
          <hr className="auth-form__separator" />
          <Link className="auth-form__link" to={APPRoute.login}>
            Войти в аккаунт
          </Link>
        </form>
      </div>
    </section>
  );
}

export default SignUpForm;
