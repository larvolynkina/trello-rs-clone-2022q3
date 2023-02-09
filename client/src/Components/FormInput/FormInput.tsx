import {
  DeepMap,
  FieldError,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from 'react-hook-form';
import { InputHTMLAttributes } from 'react';

type FormInputProps<TFormValues extends FieldValues> = {
  name: Path<TFormValues>;
  register: UseFormRegister<TFormValues>;
  validation: RegisterOptions;
  errors: Partial<DeepMap<TFormValues, FieldError>>;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'name'>;

function FormInput<TFormValues extends Record<string, unknown>>({
  name,
  register,
  validation,
  errors,
  ...props
}: FormInputProps<TFormValues>) {
  return (
    <label htmlFor="email" className="auth-form__label">
      <input className="auth-form__input" {...register(name, validation)} {...props} />
      {errors?.[name] && <p className="auth-form__input-error">{errors?.[name]?.message}</p>}
    </label>
  );
}

export default FormInput;
