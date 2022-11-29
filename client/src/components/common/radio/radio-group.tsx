/* eslint-disable react/no-unused-prop-types */
import type { PropsWithChildren } from 'react';

import styled from 'styled-components';

import { withField } from '~hocs/index';
import { pixelToRem } from '~utils/style-utils';

import Radio from './radio';

interface Option {
  label: string;
  name?: string;
}

interface OptionGroup {
  options: Option[];
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const RadioGroup = ({ options, onChange }: PropsWithChildren<OptionGroup>) => {
  const renderOptions = () => {
    return options.map(({ label, name }: Option, index) => {
      const shortendOptionLabel = label.replace(/\s+/g, '');
      const optionId = `radio-option-${shortendOptionLabel}`;

      return (
        <Radio
          id={optionId}
          key={optionId}
          name={name}
          label={label}
          value={label}
          defaultChecked={index === 0}
          onChange={onChange}
        />
      );
    });
  };

  return <Wrapper>{renderOptions()}</Wrapper>;
};

const Wrapper = styled.div`
  display: flex;
  gap: ${pixelToRem(120)};
`;

export default withField(RadioGroup);
