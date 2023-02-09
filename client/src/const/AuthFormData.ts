import {
  CustomFormInputData,
  LoginDataInputTypeWithoutId,
  SignUpDataInputTypeWithoutId,
} from '../types/AuthFormData';
import { LoginData, SignUpData } from '../types/userData';

export const emailInputData: LoginDataInputTypeWithoutId = {
  name: 'email',
  type: 'email',
  validation: {
    required: 'Поле обязательно к заполнению',
    pattern: {
      value: /\S+@\S+\.\S+/,
      message: 'Значение не соответствует формату эл. почты',
    },
  },
  placeholder: 'Укажите адрес электронной почты',
};

export const passwordInputData: LoginDataInputTypeWithoutId = {
  name: 'password',
  type: 'password',
  validation: {
    required: 'Поле обязательно к заполнению',
    minLength: {
      value: 6,
      message: 'Минимальная длина пароля 6 символов',
    },
    maxLength: {
      value: 20,
      message: 'Максимальная длина пароля 20 символов',
    },
  },
  placeholder: 'Введите пароль',
};

export const userNameInputData: SignUpDataInputTypeWithoutId = {
  name: 'userName',
  type: 'text',
  validation: {
    required: 'Поле обязательно к заполнению',
    minLength: {
      value: 3,
      message: 'Минимальная длина имени 3 символа',
    },
    maxLength: {
      value: 20,
      message: 'Максимальная длина имени 20 символов',
    },
  },
  placeholder: 'Укажите свое имя',
};

export const loginInputData: CustomFormInputData<LoginData> = [
  {
    id: 1,
    ...emailInputData,
  },
  {
    id: 2,
    ...passwordInputData,
  },
];

export const signUpInputData: CustomFormInputData<SignUpData> = [
  {
    id: 1,
    ...userNameInputData,
  },
  {
    id: 2,
    ...emailInputData,
  },
  {
    id: 3,
    ...passwordInputData,
  },
];
