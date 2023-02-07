import { RegisterOptions } from 'react-hook-form';
import { LoginData, SignUpData } from './userData';

type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

export type CustomFormInputData<TData> = {
  id: number;
  name: keyof TData;
  validation: RegisterOptions;
  placeholder: string;
}[];

type LoginDataInputType = ArrayElement<CustomFormInputData<LoginData>>;

export type LoginDataInputTypeWithoutId = Omit<LoginDataInputType, 'id'>;

type SignUpDataInputType = ArrayElement<CustomFormInputData<SignUpData>>;

export type SignUpDataInputTypeWithoutId = Omit<SignUpDataInputType, 'id'>;
