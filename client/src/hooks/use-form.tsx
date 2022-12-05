import React, { useState } from 'react';

import { WithStatusType } from '~hocs/with-status';
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
  const [statuses, setStatuses] = useState<{ [key: string]: WithStatusType }>(
    {},
  );
  const [errors, setErrors] = useState<Partial<T>>({});

  const updateStatus = (key: string, value: string) => {
    setStatuses((prevStatuses) => ({ ...prevStatuses, [key]: 'default' }));

    if (!validateInput(value, key)) {
      setStatuses((prevStatuses) => ({ ...prevStatuses, [key]: 'error' }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target as HTMLInputElement;

    setStatuses((prevStatuses) => ({ ...prevStatuses, [name]: 'default' }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, type, value } = e.target as HTMLInputElement;

    if (value === '' && statuses[name] !== 'error') {
      setStatuses((prevStatuses) => ({ ...prevStatuses, [name]: 'default' }));
      return;
    }

    if (type === 'tel') {
      setValues((prevValues) => ({
        ...prevValues,
        [name]: formatPhoneNumber(value),
      }));
    }

    updateStatus(type, value);
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
