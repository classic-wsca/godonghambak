import type { Status } from './common';
import type { HTMLInputTypeAttribute } from 'react';

export interface UserInformation {
  name: string;
  birth: string;
  phoneNumber: string;
  [key: string]: string;
}

export interface LoginInformation {
  email: string;
  password: string;
  [key: string]: string;
}

export interface JoinInformation extends UserInformation, LoginInformation {
  emailVerificationCode: string;
  passwordConfirm: string;
  [key: string]: string;
}

export interface FormField {
  id: string;
  type: Extract<HTMLInputTypeAttribute, 'text' | 'email' | 'password' | 'tel'>;
  placeholder: string;
  text: string;
}

export type FormFieldsStatus<T> = Partial<Record<keyof T, Status>>;

export interface FormErrorMessage {
  notExist: Readonly<JoinInformation>;
  invalidFormat: Readonly<JoinInformation>;
  failVerification: Readonly<string>;
}
