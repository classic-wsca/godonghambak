import type { LoginInformation } from '~pages/login';

import Link from 'next/link';
import styled from 'styled-components';

import {
  Button,
  InputWithLabelAndStatus as TextField,
} from '~components/common';
import {
  INITIAL_LOGIN_VALUE,
  LOGIN_FORM_FIELDS,
  LOGIN_RELATED_PAGES,
} from '~constants/form';
import { useForm } from '~hooks/index';
import { pixelToRem } from '~utils/style-utils';
import { validateForm } from '~utils/validate-utils';

interface LoginFormProps {
  onSubmit: (values: LoginInformation) => void;
}

const LoginForm = ({ onSubmit }: LoginFormProps) => {
  const {
    values,
    statuses,
    errors,
    handleChange,
    handleFocus,
    handleBlur,
    handleSubmit,
  } = useForm<LoginInformation>({
    initialValues: INITIAL_LOGIN_VALUE,
    validate: validateForm,
    onSubmit,
  });

  return (
    <Form role="form" aria-label="login" onSubmit={handleSubmit} noValidate>
      <FormFieldList>
        {LOGIN_FORM_FIELDS.map(({ id, type, placeholder, text }) => (
          <li key={id}>
            <TextField
              id={id}
              type={type}
              placeholder={placeholder}
              value={values[type]}
              status={statuses[type]}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              message={errors[type]}
            >
              {text}
            </TextField>
          </li>
        ))}
        <li>
          <Button
            type="submit"
            size="x-small"
            fullWidth
            aria-label="login-submit"
          >
            로그인
          </Button>
        </li>
      </FormFieldList>
      <LoginRelatedPageList>
        {LOGIN_RELATED_PAGES.map(({ link, text }) => (
          <li key={link}>
            <Link href={link}>{text}</Link>
          </li>
        ))}
      </LoginRelatedPageList>
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

const LoginRelatedPageList = styled.ul`
  display: flex;
  justify-content: center;
  gap: ${pixelToRem(28)};
  margin-top: ${pixelToRem(24)};
  margin-bottom: 0;
  font-size: ${({ theme }) => theme.fontSizes.xs};

  li:not(:last-of-type):after {
    content: '';
    border-right: 1px solid ${({ theme }) => theme.colors.gray};
    margin-left: ${pixelToRem(24)};
  }

  @media ${({ theme }) => theme.breakPoints.small} {
    gap: ${pixelToRem(14)};

    li:not(:last-of-type):after {
      border-right: 1px solid ${({ theme }) => theme.colors.gray};
      margin-left: ${pixelToRem(12)};
    }
  }
`;

export default LoginForm;
