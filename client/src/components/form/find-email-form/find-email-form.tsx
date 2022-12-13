import type { UserInformation } from '~types/form';

import styled from 'styled-components';

import {
  Button,
  InputWithLabelAndStatus as TextField,
} from '~components/common';
import {
  FIND_EMAIL_FORM_FIELDS,
  INITIAL_FIND_EMAIL_FORM_VALUE,
} from '~constants/form';
import useForm from '~hooks/use-form';
import { pixelToRem } from '~utils/style-utils';
import { validateForm } from '~utils/validate-utils';

interface FindEmailFormProps {
  onSubmit: (values: Partial<UserInformation>) => void;
}

const FindEmailForm = ({ onSubmit }: FindEmailFormProps) => {
  const {
    values,
    statuses,
    errors,
    handleChange,
    handleFocus,
    handleBlur,
    handleSubmit,
  } = useForm<UserInformation>({
    initialValues: INITIAL_FIND_EMAIL_FORM_VALUE,
    validate: validateForm,
    onSubmit,
  });

  return (
    <Form
      role="form"
      aria-label="find-email"
      onSubmit={handleSubmit}
      noValidate
    >
      <FormFieldList>
        {FIND_EMAIL_FORM_FIELDS.map(({ id, type, placeholder, text }) => (
          <li key={id}>
            <TextField
              id={id}
              type={type}
              placeholder={placeholder}
              value={values[id]}
              status={statuses[id]}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              message={errors[id]}
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
            aria-label="이메일 찾기"
          >
            이메일 찾기
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

export default FindEmailForm;
