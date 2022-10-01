import type { InputHTMLAttributes } from 'react';

import styled from 'styled-components';

import { pixelToRem } from '~utils/style-utils';

export interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
}

const Radio = ({ id, label, ...rest }: RadioProps) => {
  return (
    <Wrapper>
      <RadioInput type="radio" id={id} {...rest} />
      <Label htmlFor={id}>{label}</Label>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  gap: ${pixelToRem(12)};
  align-items: center;
  color: ${({ theme }) => theme.colors.dark};
`;

const RadioInput = styled.input`
  appearance: none;
  margin: 0;
  width: ${pixelToRem(24)};
  height: ${pixelToRem(24)};
  border: 2px solid ${({ theme }) => theme.colors.dark};
  border-radius: 50%;

  ::after {
    content: '';
    display: block;
    width: ${pixelToRem(12)};
    height: ${pixelToRem(12)};
    margin: ${pixelToRem(4)};
    border-radius: 50%;
  }

  :hover {
    border: 2px solid ${({ theme }) => theme.colors.blue};

    ::after {
      background-color: ${({ theme }) => `${theme.colors.blue}95`};
    }
  }

  :checked {
    :hover {
      background-color: ${({ theme }) => theme.colors.white};
    }

    ::after {
      background-color: ${({ theme }) => theme.colors.blue};
    }
  }
`;

const Label = styled.label``;

export default Radio;
