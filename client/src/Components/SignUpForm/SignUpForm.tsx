import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { APPRoute } from '../../const/const';
import { signUpInputData } from '../../const/AuthFormData';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { signUpAction } from '../../store/serviceActions';
import { SignUpData } from '../../types/userData';
import FormInput from '../FormInput';
import Logo from '../Logo';
import './SignUpForm.scss';

function SignUpForm() {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.USER);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpData>({ mode: 'all' });

  const handleFormSubmit: SubmitHandler<SignUpData> = (data, evt) => {
    evt?.preventDefault();
    dispatch(signUpAction(data));
  };

  return (
    <section className="sign-up-form auth-form">
      <div className="sign-up-form__container">
        <Logo className="sign-up-form__logo logo--large" />

        <form className="auth-form__wrapper" onSubmit={handleSubmit(handleFormSubmit)}>
          <h1 className="auth-form__title sign-up-form__title">Регистрация на Boards</h1>

          {signUpInputData.map(({ id, ...props }) => (
            <FormInput<SignUpData> key={id} register={register} errors={errors} {...props} />
          ))}

          <button className="sign-up-form__btn form-btn" type="submit" disabled={isLoading}>
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
