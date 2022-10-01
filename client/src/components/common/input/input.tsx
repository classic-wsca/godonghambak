import type { ComponentPropsWithoutRef, HTMLInputTypeAttribute } from 'react';
import type { WithStatusType } from '~hocs/with-status';

import React, { forwardRef } from 'react';
import styled, { css } from 'styled-components';

import { withLabel, withStatus } from '~hocs/index';
import { pixelToRem } from '~utils/style-utils';

interface InputProps extends ComponentPropsWithoutRef<'input'> {
  id?: string;
  type?: Extract<HTMLInputTypeAttribute, 'text' | 'email' | 'password' | 'tel'>;
  value: string;
  status?: WithStatusType;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { id, type = 'text', value, status, onChange, onBlur, ...rest },
    forwardedRef,
  ) => {
    return (
      <InputBase
        ref={forwardedRef}
        id={id}
        name={id}
        type={type}
        value={value}
        status={status}
        disabled={status === 'success'}
        onChange={onChange}
        onBlur={onBlur}
        aria-label={id}
        {...rest}
      />
    );
  },
);

Input.displayName = 'Input';

const InputBase = styled.input<InputProps>`
  width: 100%;
  margin: ${pixelToRem(8)} 0;
  padding: ${pixelToRem(12)} ${pixelToRem(16)};
  border: 1px solid ${({ theme }) => theme.colors.gray};
  border-radius: ${pixelToRem(6)};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.dark};

  ::placeholder {
    font-weight: 400;
    color: ${({ theme }) => theme.colors.gray};
  }

  &:focus {
    outline: none;
    border: 1px solid ${({ theme }) => theme.colors.blue};
    box-shadow: inset 0 0 0 1px ${({ theme }) => theme.colors.blue};
  }

  &:-webkit-autofill {
    box-shadow: inset 0 0 0 30px white !important;
  }

  ${({ status }) =>
    status === 'error' &&
    css`
      border-color: ${({ theme }) => theme.colors.red_warning};
      background-color: ${({ theme }) => theme.colors.red_warning_light};

      &:focus {
        border: 1px solid ${({ theme }) => theme.colors.red_warning};
        box-shadow: inset 0 0 0 1px ${({ theme }) => theme.colors.red_warning};
      }

      &:-webkit-autofill {
        -webkit-box-shadow: inset 0 0 0 30px
          ${({ theme }) => theme.colors.red_warning_light} !important;
      }
    `}

  ${({ status }) =>
    status === 'success' &&
    css`
      border-color: ${({ theme }) => theme.colors.green_success};
      background-color: ${({ theme }) => theme.colors.green_success_light};

      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0 30px
          ${({ theme }) => theme.colors.green_success_light} inset !important;
      }
    `}
`;

export default Input;

export const InputWithLabel = withLabel(Input);
export const InputWithStatus = withStatus(Input);
export const InputWithLabelAndStatus = withStatus(withLabel(Input));
