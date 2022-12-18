import type { FormFieldsStatus, JoinInformation } from '~types/form';

import React, { useState } from 'react';

import { FORM_FIELD_STATUS, JOIN_FIELD_KEYS } from '~constants/form';
import { formatPhoneNumber } from '~utils/format-utils';
import { validateInput } from '~utils/validate-utils';

interface UseFormWithVerificationProps<T> {
  initialValues: T;
  onSubmit: (values: T) => void;
  validate: (props: T, verificationCode?: string) => Partial<T>;
  verificationCode?: string;
}

const useFormWithVerification = <
  T extends Record<keyof JoinInformation, string>,
>({
  initialValues,
  onSubmit,
  validate,
  verificationCode,
}: UseFormWithVerificationProps<T>) => {
  const [values, setValues] = useState<T>(initialValues);
  const [statuses, setStatuses] = useState<FormFieldsStatus<T>>({});
  const [errors, setErrors] = useState<Partial<T>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target as HTMLInputElement;
    const confirmValues: Record<string, string> = {
      email: JOIN_FIELD_KEYS.emailVerificationCode,
      password: JOIN_FIELD_KEYS.passwordConfirm,
    };

    setStatuses((prevStatuses) => ({
      ...prevStatuses,
      [name]: FORM_FIELD_STATUS.default,
    }));

    if (name === JOIN_FIELD_KEYS.email || name === JOIN_FIELD_KEYS.password) {
      resetField(confirmValues[name]);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    const compareValue = getComapreValueByName(name);

    if (value === '' && statuses[name] !== FORM_FIELD_STATUS.error) {
      setStatuses((prevStatuses) => ({
        ...prevStatuses,
        [name]: FORM_FIELD_STATUS.default,
      }));
      return;
    }

    if (name === JOIN_FIELD_KEYS.phoneNumber) {
      setValues((prevValues) => ({
        ...prevValues,
        [name]: formatPhoneNumber(value),
      }));
    }

    updateStatus(name, value, compareValue);
    updateErrors();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    Object.entries(values).forEach(([key, value]) => {
      const compareValue = getComapreValueByName(key);
      updateStatus(key, value, compareValue);
    });

    const updatedErrors = validate(values, verificationCode);
    updateErrors(updatedErrors);

    if (Object.keys(updatedErrors).length === 0) {
      onSubmit(values);
    }
  };

  const getComapreValueByName = (name: string) => {
    return name === JOIN_FIELD_KEYS.passwordConfirm
      ? values.password
      : verificationCode;
  };

  const updateStatus = (key: string, value: string, compareValue?: string) => {
    setStatuses((prevStatuses) => ({
      ...prevStatuses,
      [key]: FORM_FIELD_STATUS.default,
    }));

    if (!validateInput(value, key, compareValue)) {
      setStatuses((prevStatuses) => ({
        ...prevStatuses,
        [key]: FORM_FIELD_STATUS.error,
      }));
      return;
    }

    if (isConfirmationKey(key) && value !== '') {
      setStatuses((prevStatuses) => ({
        ...prevStatuses,
        [key]: FORM_FIELD_STATUS.success,
      }));
    }
  };

  const isConfirmationKey = (key: string) => {
    const { passwordConfirm, emailVerificationCode } = JOIN_FIELD_KEYS;
    return key === passwordConfirm || key === emailVerificationCode;
  };

  const updateErrors = (updatedErrors?: Partial<T>) => {
    setErrors(updatedErrors || validate(values, verificationCode));
  };

  const resetField = (key: string) => {
    setValues((prevValues) => ({ ...prevValues, [key]: '' }));
    setStatuses((prevStatuses) => ({
      ...prevStatuses,
      [key]: FORM_FIELD_STATUS.default,
    }));
    setErrors((prevErrors) => {
      const { [key]: removedProperty, ...rest } = prevErrors || {};
      return rest as Partial<T>;
    });
  };

  return {
    values,
    statuses,
    errors,
    verificationCode,
    updateStatus,
    updateErrors,
    resetField,
    handleChange,
    handleFocus,
    handleBlur,
    handleSubmit,
  };
};

export default useFormWithVerification;
