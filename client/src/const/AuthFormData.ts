import {
  CustomFormInputData,
  LoginDataInputTypeWithoutId,
  SignUpDataInputTypeWithoutId,
} from '../types/AuthFormData';
import { LoginData, SignUpData } from '../types/userData';

export const emailValidation = {
  required: 'Поле обязательно к заполнению',
  pattern: {
    value: /\S+@\S+\.\S+/,
    message: 'Значение не соответствует формату эл. почты',
  },
};

export const emailInputData: LoginDataInputTypeWithoutId = {
  name: 'email',
  type: 'email',
  validation: emailValidation,
  placeholder: 'Укажите адрес электронной почты',
};

export const passwordValidation = {
  required: 'Поле обязательно к заполнению',
  minLength: {
    value: 6,
    message: 'Минимальная длина пароля 6 символов',
  },
  maxLength: {
    value: 20,
    message: 'Максимальная длина пароля 20 символов',
  },
  pattern: {
    value: /^\S+$/,
    message: 'Пароль не должен содержать пробелы',
  },
};

export const passwordInputData: LoginDataInputTypeWithoutId = {
  name: 'password',
  type: 'password',
  validation: passwordValidation,
  placeholder: 'Введите пароль',
  autoComplete: 'off',
};

export const userNameValidation = {
  required: 'Поле обязательно к заполнению',
  minLength: {
    value: 3,
    message: 'Минимальная длина имени 3 символа',
  },
  maxLength: {
    value: 20,
    message: 'Максимальная длина имени 20 символов',
  },
  pattern: {
    value: /^[a-zA-Zа-яА-я0-9]+$/,
    message: 'Имя может содержать только буквы и цифры',
  },
};

export const userNameInputData: SignUpDataInputTypeWithoutId = {
  name: 'userName',
  type: 'text',
  validation: userNameValidation,
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
