import { HTMLInputTypeAttribute } from 'react';

export const validateInput = (
  value: string,
  type: HTMLInputTypeAttribute = 'text',
) => {
  if (!value) return null;

  if (type === 'email') {
    return validateEmail(value);
  }

  if (type === 'password') {
    return validatePassword(value);
  }

  if (type === 'tel') {
    return validatePhoneNumber(value);
  }

  return null;
};

export const validateEmail = (value: string) => {
  const regex = /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  return regex.test(value);
};

export const validatePassword = (value: string): boolean | null => {
  // 길이가 7-15 사이의 하나 이상의 숫자와 특수 문자를 가진 문자열
  const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
  return regex.test(value);
};

export const validatePhoneNumber = (value: string) => {
  // 01[016789]-000[0]-0000
  const regex = /^01[016789]{1}?[- ]?(\d{3,4})[- ]?(\d{4})$/;
  return regex.test(value);
};
