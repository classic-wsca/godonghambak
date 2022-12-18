import type { JoinInformation } from '~types/form';

import styled from 'styled-components';

import {
  Button,
  InputWithLabelAndStatus as TextField,
} from '~components/common';
import { JOIN_FIELD_KEYS } from '~constants/form';
import { useFormWithVerification } from '~hooks/index';
import { pixelToRem } from '~utils/style-utils';
import { validateForm, validateInput } from '~utils/validate-utils';

type ChangePasswordInformation = Pick<
  JoinInformation,
  'password' | 'passwordConfirm' | string
>;

interface ChangePasswordFormProps {
  onSubmit: (values: Partial<JoinInformation>) => void;
}

const ChangePasswordForm = ({ onSubmit }: ChangePasswordFormProps) => {
  const {
    values,
    statuses,
    errors,
    handleChange,
    handleFocus,
    handleBlur,
    handleSubmit,
  } = useFormWithVerification<ChangePasswordInformation>({
    initialValues: { password: '', passwordConfirm: '' },
    validate: validateForm,
    onSubmit,
  });

  return (
    <Form
      role="form"
      aria-label="change-password"
      onSubmit={handleSubmit}
      noValidate
    >
      <FormFieldList>
        <li>
          <TextField
            id={JOIN_FIELD_KEYS.password}
            type="password"
            placeholder="비밀번호를 입력해 주세요."
            value={values.password}
            status={statuses.password}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            message={errors.password}
          >
            비밀번호
          </TextField>
        </li>
        <li>
          <TextField
            id={JOIN_FIELD_KEYS.passwordConfirm}
            type="password"
            placeholder="비밀번호를 한번 더 입력해 주세요."
            value={values.passwordConfirm}
            status={statuses.passwordConfirm}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            message={errors.passwordConfirm}
            disabled={!validateInput(values.password, 'password')}
          />
        </li>
        <li>
          <Button
            type="submit"
            size="x-small"
            fullWidth
            aria-label="비밀번호 변경"
          >
            비밀번호 재설정 및 로그인
          </Button>
        </li>
      </FormFieldList>
    </Form>
  );
};

const Form = styled.form`
  width: ${pixelToRem(468)};
  margin-top: ${pixelToRem(28)};
  margin-bottom: ${pixelToRem(4)};
  padding: ${pixelToRem(38)} ${pixelToRem(50)};
  border-radius: ${pixelToRem(10)};
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2), 0 2px 4px rgba(0, 0, 0, 0.1);

  @media ${({ theme }) => theme.breakPoints.small} {
    width: 100%;
    padding: ${pixelToRem(38)} ${pixelToRem(28)};
  }
`;

const FormFieldList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${pixelToRem(16)};
  margin: 0;

  li:nth-of-type(2) {
    margin-top: ${pixelToRem(-8)};
  }
`;

export default ChangePasswordForm;
