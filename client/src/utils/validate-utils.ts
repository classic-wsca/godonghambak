import type { JoinInformation } from '~types/form';

import { FORM_ERROR_MESSAGES } from '~constants/form';

export const validateForm = (
  fields: Partial<JoinInformation>,
  compareValue?: string,
) => {
  const errors: Partial<JoinInformation> = {};

  Object.entries(fields).forEach(([key, value]) => {
    const { notExist, invalidFormat } = FORM_ERROR_MESSAGES;
    const compare = key === 'passwordConfirm' ? fields.password : compareValue;

    if (!validateInput(value as string, key, compare)) {
      errors[key] = value === '' ? notExist[key] : invalidFormat[key];
    }
  });

  return errors;
};

export const validateInput = (
  value: string,
  key: keyof JoinInformation,
  compareValue?: string,
) => {
  const validate: {
    [key: keyof JoinInformation]: (
      value: string,
      compareValue?: string,
    ) => boolean;
  } = {
    email: validateEmail,
    emailVerificationCode: isEqual,
    password: validatePassword,
    passwordConfirm: isEqual,
    tel: validatePhoneNumber,
    phoneNumber: validatePhoneNumber,
    name: validateName,
    birth: validateBirth,
  };

  return validate[key](value, compareValue);
};

export const validateEmail = (value: string) => {
  const regex = /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  return regex.test(value);
};

export const validatePassword = (value: string) => {
  // 길이가 7-15 사이의 하나 이상의 숫자와 특수 문자를 가진 문자열
  const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
  return regex.test(value);
};

export const validateName = (value: string) => {
  const regex = /^[가-힣]{2,15}$/;
  return regex.test(value);
};

export const validatePhoneNumber = (value: string) => {
  // 01[016789]-000[0]-0000
  const regex = /^01[016789]{1}?[- ]?(\d{3,4})[- ]?(\d{4})$/;
  return regex.test(value);
};

export const validateBirth = (value: string) => {
  if (value.length !== 6) {
    return false;
  }

  const regex = /([0-9]{2}(0[1-9]|1[0-2])(0[1-9]|[1,2][0-9]|3[0,1]))/;

  if (!regex.test(value)) {
    return false;
  }

  const month = value.slice(2, 4);
  const date = value.slice(4);

  if (/^((0?[469])|11)$/.test(month) && date === '31') {
    return false;
  }

  if (parseInt(month, 10) === 2 && parseInt(date, 10) > 29) {
    return false;
  }

  return true;
};

export const isEqual = <T>(valueA: T, valueB: T) => {
  return valueA === valueB;
};
