import type { HTMLInputTypeAttribute } from 'react';

export interface UserInformation {
  email: string;
  password: string;
  name: string;
  phoneNumber: string;
  birth: string;
  [key: string]: string;
}

export interface JoinInformation extends UserInformation {
  emailVerificationCode: '';
  passwordConfirm: '';
}

export interface JoinErrorMessage {
  notExist: Readonly<UserInformation>;
  invalidFormat: Readonly<UserInformation>;
  failVerification: Readonly<string>;
}

export interface JoinFormField {
  id: string;
  type: Extract<HTMLInputTypeAttribute, 'text' | 'email' | 'password' | 'tel'>;
  placeholder: string;
  text: string;
}
