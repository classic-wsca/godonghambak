import type { Status } from '~types/common';

import React, { HTMLInputTypeAttribute, useState } from 'react';

import { FORM_FIELD_STATUS } from '~constants/form';
import { formatPhoneNumber } from '~utils/format-utils';
import { validateInput } from '~utils/validate-utils';

const useInput = (
  initialValue: string,
  type: HTMLInputTypeAttribute = 'text',
) => {
  const [value, setValue] = useState(initialValue);
  const [status, setStatus] = useState<Status>(FORM_FIELD_STATUS.default);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setStatus(FORM_FIELD_STATUS.default);

    if (type === 'tel') {
      setValue(formatPhoneNumber(e.target.value));
    }

    if (e.target.value === '') {
      return;
    }

    const valid = validateInput(e.target.value, type);

    if (type === 'email' && valid) {
      setStatus(FORM_FIELD_STATUS.success);
    }

    if (valid !== null && !valid) {
      setStatus(FORM_FIELD_STATUS.error);
    }
  };

  const handleReset = () => {
    setValue('');
  };

  return { value, status, handleChange, handleBlur, handleReset };
};

export default useInput;
