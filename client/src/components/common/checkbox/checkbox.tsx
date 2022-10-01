import type { InputHTMLAttributes } from 'react';

import styled from 'styled-components';
import CheckSVG from '~public/svgs/check.svg';

import { pixelToRem } from '~utils/style-utils';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  checked: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const Checkbox = ({
  id,
  checked,
  children,
  onChange,
  ...rest
}: CheckboxProps) => {
  return (
    <Label htmlFor={id}>
      <Input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        {...rest}
      />
      <FakeInput checked={checked} role="checkbox" aria-checked={checked}>
        {checked && <CheckSVG />}
      </FakeInput>
      {children}
    </Label>
  );
};

const Label = styled.label`
  display: inline-flex;
  align-items: center;
  gap: ${pixelToRem(10)};
  color: ${({ theme }) => theme.colors.dark};
  cursor: pointer;
`;

const Input = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  border: 0;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  overflow: hidden;
  white-space: nowrap;
`;

const FakeInput = styled.div<{ checked: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${pixelToRem(18)};
  height: ${pixelToRem(18)};
  margin-top: ${pixelToRem(2)};
  box-sizing: border-box;
  border: ${pixelToRem(2)} solid
    ${({ theme, checked }) => (checked ? 'transparent' : theme.colors.gray_500)};
  border-radius: ${pixelToRem(2)};
  background-color: ${({ theme, checked }) =>
    checked ? theme.colors.green : theme.colors.white};
  transition: all 0.2s;
  cursor: pointer;
`;

export default Checkbox;
