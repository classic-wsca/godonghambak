import type { FormFieldsStatus } from '~types/form';

import React, { useState } from 'react';

import { FORM_FIELD_STATUS } from '~constants/form';
import { formatPhoneNumber } from '~utils/format-utils';
import { validateInput } from '~utils/validate-utils';

interface UseFormProps<T> {
  initialValues: T;
  onSubmit: (values: T) => void;
  validate: (props: T) => Partial<T>;
}

const useForm = <T extends object>({
  initialValues,
  onSubmit,
  validate,
}: UseFormProps<T>) => {
  const [values, setValues] = useState<T>(initialValues);
  const [statuses, setStatuses] = useState<FormFieldsStatus<T>>({});
  const [errors, setErrors] = useState<Partial<T>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target as HTMLInputElement;

    setStatuses((prevStatuses) => ({
      ...prevStatuses,
      [name]: FORM_FIELD_STATUS.default,
    }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;

    if (value === '' && statuses[name as keyof T] !== FORM_FIELD_STATUS.error) {
      setStatuses((prevStatuses) => ({
        ...prevStatuses,
        [name]: FORM_FIELD_STATUS.default,
      }));
      return;
    }

    if (name === 'phoneNumber') {
      setValues((prevValues) => ({
        ...prevValues,
        [name]: formatPhoneNumber(value),
      }));
    }

    updateStatus(name, value);
    setErrors(validate(values));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    Object.entries(values).forEach(([key, value]) => updateStatus(key, value));

    const updatedErrors = validate(values);
    setErrors(updatedErrors);

    if (Object.keys(updatedErrors).length === 0) {
      onSubmit(values);
    }
  };

  const updateStatus = (key: string, value: string) => {
    setStatuses((prevStatuses) => ({
      ...prevStatuses,
      [key]: FORM_FIELD_STATUS.default,
    }));

    if (!validateInput(value, key)) {
      setStatuses((prevStatuses) => ({
        ...prevStatuses,
        [key]: FORM_FIELD_STATUS.error,
      }));
    }
  };

  return {
    values,
    statuses,
    errors,
    handleChange,
    handleFocus,
    handleBlur,
    handleSubmit,
  };
};

export default useForm;
