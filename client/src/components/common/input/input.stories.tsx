import { ComponentMeta, ComponentStory } from '@storybook/react';

import Input, { InputWithLabelAndStatus } from './input';

import useInput from '~hooks/use-input';

export default {
  title: 'components/common/input',
  component: Input,
} as ComponentMeta<typeof Input>;

const DefaultTemplate: ComponentStory<typeof Input> = ({
  value,
  onChange,
  ...args
}) => {
  const { value: inputValue, handleChange } = useInput('');

  return <Input value={inputValue} onChange={handleChange} {...args} />;
};

export const DefaultInput = DefaultTemplate.bind({});
DefaultInput.args = {
  placeholder: '텍스트를 입력하세요',
};

const TextFieldTemplate: ComponentStory<typeof InputWithLabelAndStatus> = ({
  id,
  children,
  type,
  value,
  onChange,
  ...args
}) => {
  const {
    value: inputValue,
    status,
    handleChange,
    handleBlur,
  } = useInput(value, type);

  return (
    <InputWithLabelAndStatus
      id={id}
      type={type}
      value={inputValue}
      status={status}
      onChange={handleChange}
      onBlur={handleBlur}
      {...args}
    >
      {children}
    </InputWithLabelAndStatus>
  );
};

export const TextInput = TextFieldTemplate.bind({});
TextInput.args = {
  id: 'text',
  type: 'text',
  children: '이름',
  placeholder: '이름을 입력해주세요',
};

export const ErrorInput = TextFieldTemplate.bind({});
ErrorInput.args = {
  id: 'email',
  type: 'email',
  children: '이메일',
  value: 'example.com',
  message: '유효하지 않은 이메일 형식입니다.',
  status: 'error',
};

export const SuccesedInput = TextFieldTemplate.bind({});
SuccesedInput.args = {
  id: 'email',
  type: 'email',
  children: '이메일',
  value: 'example@gmail.com',
  status: 'success',
};

export const EmailInput = TextFieldTemplate.bind({});
EmailInput.args = {
  id: 'email',
  type: 'email',
  children: '이메일',
  placeholder: 'example@gmail.com',
  message: '유효하지 않은 이메일 형식입니다.',
};

export const PasswordInput = TextFieldTemplate.bind({});
PasswordInput.args = {
  id: 'password',
  type: 'password',
  children: '비밀번호',
  placeholder: '비밀번호를 입력하세요',
  message: '비밀번호 7-15자리 영문과 숫자, 특수문자를 포함해야 합니다.',
};

export const PhoneNumberInput = TextFieldTemplate.bind({});
PhoneNumberInput.args = {
  id: 'tel',
  type: 'tel',
  children: '휴대폰 번호',
  placeholder: '휴대폰 번호 (-없이 숫자만 입력)',
  message: '유효하지 않은 번호 형식입니다.',
};
