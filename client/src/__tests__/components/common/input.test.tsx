/* eslint-disable jest-dom/prefer-in-document */
import type { HTMLInputTypeAttribute } from 'react';

import userEvent from '@testing-library/user-event';
import { render, screen } from '../../test-utils';

import {
  Input,
  InputWithLabel,
  InputWithStatus,
  InputWithLabelAndStatus,
} from '~components/common';

import { useInput } from '~hooks/index';

interface TestProps {
  type?: Extract<HTMLInputTypeAttribute, 'text' | 'email' | 'password' | 'tel'>;
  message?: string;
}

const DefaultInput = ({ type }: TestProps) => {
  const { value, handleChange } = useInput('', type);

  const mockProps = {
    id: `${type} input`,
    type,
    value,
    placeholder: '텍스트를 입력해주세요',
    onChange: handleChange,
  };

  return <Input {...mockProps} />;
};

const WithLabelAndStatus = ({ type = 'text', message }: TestProps) => {
  const { value, status, handleChange, handleBlur } = useInput('', type);

  const mockProps = {
    id: `${type} input`,
    type,
    value,
    status,
    message,
    placeholder: '텍스트를 입력해주세요',
    onChange: handleChange,
    onBlur: handleBlur,
  };

  return (
    <InputWithLabelAndStatus {...mockProps}>
      테스트 라벨
    </InputWithLabelAndStatus>
  );
};

const defaultSetup = ({ type }: TestProps) => {
  const utils = render(<DefaultInput type={type} />);
  const input = screen.getByLabelText(`${type} input`);

  return { input, ...utils };
};

const withLabelAndStatusSetup = ({ type = 'text', message }: TestProps) => {
  const utils = render(<WithLabelAndStatus type={type} message={message} />);
  const input = screen.getByLabelText(`${type} input`);

  return { input, ...utils };
};

describe('Input component', () => {
  describe('default input', () => {
    it('should be rendered correctly', () => {
      const { input: textInput } = defaultSetup({});
      const { input: emailInput } = defaultSetup({ type: 'email' });
      const { input: passwordInput } = defaultSetup({ type: 'password' });
      const { input: phoneInput } = defaultSetup({ type: 'tel' });

      expect(textInput).toBeInTheDocument();
      expect(emailInput).toBeInTheDocument();
      expect(passwordInput).toBeInTheDocument();
      expect(phoneInput).toBeInTheDocument();
    });

    it('should be able to have placeholder', () => {
      const { getByPlaceholderText } = defaultSetup({});

      expect(getByPlaceholderText(/텍스트를 입력해주세요/)).toBeInTheDocument();
    });

    it('should be able to change value', async () => {
      const { input } = defaultSetup({});

      expect(input).toHaveValue('');

      await userEvent.type(input, 'test value');

      expect(input).toHaveValue('test value');
    });

    it('should be rendered with label', () => {
      const handleChange = jest.fn();

      render(
        <InputWithLabel id="labelTest" value="테스트" onChange={handleChange}>
          테스트 라벨
        </InputWithLabel>,
      );

      const label = screen.getByText(/테스트 라벨/i);

      expect(label).toBeInTheDocument();
    });

    it('should be rendered with status', () => {
      const handleChange = jest.fn();

      render(
        <InputWithStatus
          id="statusTest"
          value="테스트"
          onChange={handleChange}
        />,
      );

      const input = screen.getByRole('textbox', { name: 'statusTest' });

      expect(input).toBeInTheDocument();
    });
  });

  describe('input with label and status', () => {
    it('should be rendered correctly', () => {
      const { input: textInput } = withLabelAndStatusSetup({});
      const { input: emailInput } = withLabelAndStatusSetup({ type: 'email' });
      const { input: passwordInput } = withLabelAndStatusSetup({
        type: 'password',
      });
      const { input: phoneInput } = withLabelAndStatusSetup({ type: 'tel' });

      expect(textInput).toBeInTheDocument();
      expect(emailInput).toBeInTheDocument();
      expect(passwordInput).toBeInTheDocument();
      expect(phoneInput).toBeInTheDocument();
    });

    it('should be able to have placeholder', () => {
      const { getByPlaceholderText } = withLabelAndStatusSetup({});

      expect(getByPlaceholderText(/텍스트를 입력해주세요/)).toBeInTheDocument();
    });

    it('should be able to change value', async () => {
      const { input } = withLabelAndStatusSetup({});

      expect(input).toHaveValue('');

      await userEvent.type(input, 'test value');

      expect(input).toHaveValue('test value');
    });

    it('should be rendered with label', () => {
      const { input } = withLabelAndStatusSetup({});
      const label = screen.getByText(/테스트 라벨/i);

      expect(input).toBeInTheDocument();
      expect(label).toBeInTheDocument();
    });

    it('should show error message if email value is invalid', async () => {
      const { input } = withLabelAndStatusSetup({
        type: 'email',
        message: '유효하지 않은 이메일 형식입니다.',
      });

      await userEvent.type(input, 'invalid');
      await userEvent.tab();

      const errorMessage =
        screen.getByText(/유효하지 않은 이메일 형식입니다./i);

      expect(errorMessage).toBeInTheDocument();
    });

    it('should show error message if password value is invalid', async () => {
      const { input } = withLabelAndStatusSetup({
        type: 'password',
        message: '비밀번호는 7-15자리 영문과 숫자, 특수문자를 포함해야합니다.',
      });

      await userEvent.type(input, 'invalid');
      await userEvent.tab();

      const errorMessage = screen.getByText(
        /비밀번호는 7-15자리 영문과 숫자, 특수문자를 포함해야합니다./i,
      );

      expect(errorMessage).toBeInTheDocument();
    });

    it('should show error message if phone number value is invalid', async () => {
      const { input } = withLabelAndStatusSetup({
        type: 'tel',
        message: '올바르지 않은 전화번호 형식입니다.',
      });

      await userEvent.type(input, '0101455');
      await userEvent.tab();

      const errorMessage =
        screen.getByText(/올바르지 않은 전화번호 형식입니다./i);

      expect(errorMessage).toBeInTheDocument();
    });

    it('should now show error message with empty value', async () => {
      const { input } = withLabelAndStatusSetup({
        type: 'email',
        message: '올바르지 않은 이메일 형식입니다.',
      });

      input.focus();
      await userEvent.type(input, 'exam');
      await userEvent.clear(input);
      await userEvent.tab();

      const errorMessage =
        screen.queryByText(/올바르지 않은 이메일 형식입니다./i);

      expect(input).toHaveValue('');
      expect(errorMessage).toBe(null);
    });

    it('shoule be rendered succesed state with valid value if type is email', async () => {
      const { input, getByText } = withLabelAndStatusSetup({
        type: 'email',
      });

      await userEvent.type(input, 'example@gmail.com');
      await userEvent.tab();

      const successMessage = getByText(/인증완료/i);

      expect(successMessage).toBeInTheDocument();
      expect(input).toBeDisabled();
    });

    it('should be change format to phone number if type is tel', async () => {
      const { input } = withLabelAndStatusSetup({
        type: 'tel',
      });

      await userEvent.type(input, '01012345678');
      expect(input).toHaveValue('01012345678');

      await userEvent.tab();
      expect(input).toHaveValue('010-1234-5678');
    });
  });
});
