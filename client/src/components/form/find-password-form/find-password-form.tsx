import type { JoinInformation } from '~types/form';

import { useEffect, useState } from 'react';
import styled from 'styled-components';

import {
  Button,
  InputWithLabelAndStatus as TextField,
  Text,
} from '~components/common';
import {
  FORM_ERROR_MESSAGES,
  FORM_FIELD_STATUS,
  JOIN_FIELD_KEYS,
} from '~constants/form';
import { useFormWithVerification, useTimer } from '~hooks/index';
import { formatNumberToTime } from '~utils/format-utils';
import { pixelToRem } from '~utils/style-utils';
import { validateForm, validateInput } from '~utils/validate-utils';

type FindPasswordInformation = Pick<
  JoinInformation,
  'email' | 'emailVerificationCode' | string
>;

interface FindPasswordFormProps {
  onSubmit: (values: Partial<FindPasswordInformation>) => void;
  toggleModal: () => void;
}

const FindPasswordForm = ({ onSubmit, toggleModal }: FindPasswordFormProps) => {
  const [verificationCode, setVerificationCode] = useState('');
  const [isShowTimer, setIsShowTimer] = useState(false);

  const {
    values,
    statuses,
    errors,
    handleChange,
    handleFocus,
    handleBlur,
    handleSubmit,
    updateStatus,
    updateErrors,
    resetField,
  } = useFormWithVerification<FindPasswordInformation>({
    initialValues: { email: '', emailVerificationCode: '' },
    validate: validateForm,
    onSubmit,
    verificationCode,
  });

  const {
    time,
    start: startTimer,
    reset: resetTimer,
  } = useTimer({
    endTime: 0,
    initialTime: 180,
    timerType: 'DECREMENTAL',
    onTimeOver: () => {
      setVerificationCode('expired');
      updateStatus(
        JOIN_FIELD_KEYS.emailVerificationCode,
        FORM_FIELD_STATUS.error,
      );
      updateErrors({
        emailVerificationCode: FORM_ERROR_MESSAGES.failVerification,
      });
    },
  });

  const isDisabled = (name: string, confirmFieldName: string) => {
    const isBeforeInput = values[name] === '';
    const isNotValid = !validateInput(values[name], name);
    const isVerified = statuses[confirmFieldName] === FORM_FIELD_STATUS.success;

    return isBeforeInput || isNotValid || isVerified;
  };

  const handleVerifyEmail = () => {
    if (
      isDisabled(JOIN_FIELD_KEYS.email, JOIN_FIELD_KEYS.emailVerificationCode)
    ) {
      updateStatus(JOIN_FIELD_KEYS.email, values.email);
      updateErrors();
      return;
    }

    // TODO
    // 이메일 인증 요청 보내기
    // 생성되는 6자리의 난수를 상태에 저장
    setVerificationCode('123456');

    resetField(JOIN_FIELD_KEYS.emailVerificationCode);

    // TODO
    // 인증 번호가 발송되었는지 체크

    toggleModal();
    setIsShowTimer(true);

    resetTimer();
    startTimer();
  };

  useEffect(() => {
    if (statuses.emailVerificationCode === FORM_FIELD_STATUS.success) {
      setIsShowTimer(false);
      resetTimer();
    }
  }, [statuses, resetTimer]);

  return (
    <Form
      role="form"
      aria-label="find-password"
      onSubmit={handleSubmit}
      noValidate
    >
      <FormFieldList>
        <li>
          <TextField
            id={JOIN_FIELD_KEYS.email}
            type="email"
            placeholder="아이디를 입력해 주세요. (이메일 주소 포함)"
            value={values.email}
            status={statuses.email}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            message={errors.email}
          >
            이메일
          </TextField>
          <Button
            id={JOIN_FIELD_KEYS.emailVerificationCode}
            type="button"
            size="x-small"
            onClick={handleVerifyEmail}
          >
            이메일 인증
          </Button>
          {verificationCode && (
            <VerifyEmailField>
              <TextField
                id={JOIN_FIELD_KEYS.emailVerificationCode}
                type="text"
                placeholder="인증 번호 6자리를 입력해 주세요."
                value={values.emailVerificationCode}
                status={statuses.emailVerificationCode}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                message={errors.emailVerificationCode}
                disabled={isDisabled(
                  JOIN_FIELD_KEYS.email,
                  JOIN_FIELD_KEYS.emailVerificationCode,
                )}
              />
              {isShowTimer && (
                <Timer role="timer" aria-labelledby="timer">
                  <Text id="timer" size="xs">
                    {formatNumberToTime(time)}
                  </Text>
                </Timer>
              )}
            </VerifyEmailField>
          )}
        </li>
        <li>
          <Button
            type="submit"
            size="x-small"
            fullWidth
            aria-label="비밀번호 찾기"
          >
            비밀번호 찾기
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

  li:first-of-type {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: ${pixelToRem(8)};

    label {
      order: 1;
      grid-column: 1 / 4;
    }

    input {
      order: 2;
      grid-column: 1 / 3;
      margin: 0;
    }

    button {
      order: 3;
      grid-column: 3 / 4;
    }

    p {
      order: 4;
      grid-column: 1 / 4;
    }
  }

  @media ${({ theme }) => theme.breakPoints.small} {
    li:first-of-type {
      button {
        font-size: ${({ theme }) => theme.fontSizes.xs};
      }
    }
  }
`;

const VerifyEmailField = styled.div`
  position: relative;
  grid-column: 1 / 4;
  order: 5;

  & > p {
    margin-top: ${pixelToRem(8)};
  }
`;

const Timer = styled.div`
  position: absolute;
  top: ${pixelToRem(1)};
  right: ${pixelToRem(1)};

  p {
    height: ${pixelToRem(42)};
    margin: 0;
    padding: ${pixelToRem(12)} ${pixelToRem(16)};
    border-radius: ${pixelToRem(10)};
    line-height: 1.5;
  }
`;

export default FindPasswordForm;
