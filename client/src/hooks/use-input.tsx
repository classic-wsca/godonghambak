import type { WithStatusType } from 'hocs/with-status';

import React, { HTMLInputTypeAttribute, useState } from 'react';

import { formatPhoneNumber } from '~utils/format-utils';
import { validateInput } from '~utils/validate-utils';

const useInput = (
  initialValue: string,
  type: HTMLInputTypeAttribute = 'text',
) => {
  const [value, setValue] = useState(initialValue);
  const [status, setStatus] = useState<WithStatusType>('default');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setStatus('default');

    if (type === 'tel') {
      setValue(formatPhoneNumber(e.target.value));
    }

    if (e.target.value === '') {
      return;
    }

    const valid = validateInput(e.target.value, type);

    if (type === 'email' && valid) {
      setStatus('success');
    }

    if (valid !== null && !valid) {
      setStatus('error');
    }
  };

  const handleReset = () => {
    setValue('');
  };

  return { value, status, handleChange, handleBlur, handleReset };
};

export default useInput;
