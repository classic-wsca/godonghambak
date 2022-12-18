import type { JoinInformation } from '~types/form';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import {
  Button,
  Checkbox,
  InputWithLabelAndStatus as TextField,
  Text,
} from '~components/common';
import { Modal, ConfirmationModal } from '~components/modal';
import {
  FORM_ERROR_MESSAGES,
  FORM_FIELD_STATUS,
  INITIAL_JOIN_VALUE,
  JOIN_FORM_FIELDS,
  JOIN_FIELD_KEYS,
} from '~constants/form';
import { useFormWithVerification, useToggle, useTimer } from '~hooks/index';
import { formatNumberToTime } from '~utils/format-utils';
import { pixelToRem } from '~utils/style-utils';
import { validateInput, validateForm } from '~utils/validate-utils';

interface JoinFormProps {
  onSubmit: (values: JoinInformation) => void;
}

const JoinForm = ({ onSubmit }: JoinFormProps) => {
  const [verificationCode, setVerificationCode] = useState('');
  const [isCheckboxChecked, toggleCheckboxChecked] = useToggle();
  const [isVerificationModalOpen, toggleVerificationModal] = useToggle();
  const [isSubmitModalOpen, toggleSubmitModal] = useToggle();
  const {
    values,
    statuses,
    errors,
    updateStatus,
    updateErrors,
    resetField,
    handleChange,
    handleFocus,
    handleBlur,
    handleSubmit,
  } = useFormWithVerification({
    initialValues: INITIAL_JOIN_VALUE,
    onSubmit,
    validate: validateForm,
    verificationCode,
  });

  const handleVerificationTimeOver = () => {
    // TODO 인증 코드 비교 로직 구현
    setVerificationCode('expired');
    updateStatus(
      JOIN_FIELD_KEYS.emailVerificationCode,
      FORM_FIELD_STATUS.error,
    );
    updateErrors({
      emailVerificationCode: FORM_ERROR_MESSAGES.failVerification,
    });
  };

  const {
    time,
    start: startTimer,
    reset: resetTimer,
  } = useTimer({
    endTime: 0,
    initialTime: 180,
    timerType: 'DECREMENTAL',
    onTimeOver: handleVerificationTimeOver,
  });

  const isDisabled = (name: string, confirmFieldName: string) => {
    const isBeforeInput = values[name] === '';
    const isNotValid = !validateInput(values[name], name);
    const isVerified = statuses[confirmFieldName] === FORM_FIELD_STATUS.success;

    return isBeforeInput || isNotValid || isVerified;
  };

  const isSubmitButtonDisabled = () => {
    return Object.keys(errors).length !== 0 || isCheckboxChecked === false;
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
    // 인증 번호가 발송되었는지 체크하기

    toggleVerificationModal();

    // timer 진행
    resetTimer();
    startTimer();
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();

    toggleSubmitModal();
  };

  useEffect(() => {
    if (statuses.emailVerificationCode === FORM_FIELD_STATUS.success) {
      resetTimer();
    }
  }, [statuses, resetTimer]);

  return (
    <>
      <Form
        role="form"
        aria-label="join"
        onSubmit={handleSubmitForm}
        noValidate
      >
        <FormFieldList>
          {JOIN_FORM_FIELDS.map(({ id, type, placeholder, text }) => (
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
              {type === JOIN_FIELD_KEYS.email && (
                <Button
                  id="emailVerification"
                  type="button"
                  size="x-small"
                  onClick={handleVerifyEmail}
                  disabled={
                    statuses.emailVerificationCode === FORM_FIELD_STATUS.success
                  }
                >
                  이메일 인증
                </Button>
              )}
              {type === JOIN_FIELD_KEYS.email && verificationCode && (
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
                  {statuses.emailVerificationCode !== 'success' && (
                    <Timer role="timer" aria-labelledby="timer">
                      <Text id="timer" size="xs">
                        {formatNumberToTime(time)}
                      </Text>
                    </Timer>
                  )}
                </VerifyEmailField>
              )}
              {type === JOIN_FIELD_KEYS.password && (
                <TextField
                  id={JOIN_FIELD_KEYS.passwordConfirm}
                  type={type}
                  placeholder="비밀번호를 한번 더 입력해 주세요."
                  value={values.passwordConfirm}
                  status={statuses.passwordConfirm}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  message={errors.passwordConfirm}
                  disabled={isDisabled(
                    JOIN_FIELD_KEYS.password,
                    JOIN_FIELD_KEYS.passwordConfirm,
                  )}
                />
              )}
            </li>
          ))}
          <li>
            <Checkbox
              id="agreeTerm"
              type="checkbox"
              checked={isCheckboxChecked}
              onChange={toggleCheckboxChecked}
              aria-label="agreeTerm"
            >
              본인은 14세 이상이며, 이용약관에 동의합니다.
            </Checkbox>
          </li>
          <li>
            <Button
              id="createAccount"
              type="submit"
              size="x-small"
              fullWidth
              aria-label="join-submit"
              disabled={isSubmitButtonDisabled()}
            >
              계정 생성
            </Button>
          </li>
        </FormFieldList>
      </Form>
      <Modal
        title="이메일 인증"
        isOpen={isVerificationModalOpen}
        onClose={toggleVerificationModal}
      >
        <ConfirmationModal
          message="인증번호가 발송되었습니다."
          onConfirm={toggleVerificationModal}
        />
      </Modal>
      <Modal
        title="회원가입"
        isOpen={isSubmitModalOpen}
        onClose={toggleSubmitModal}
      >
        <ConfirmationModal
          message="회원가입 하시겠습니까?"
          onConfirm={handleSubmit}
          onCancel={toggleSubmitModal}
        />
      </Modal>
    </>
  );
};

const Form = styled.form`
  width: ${pixelToRem(478)};
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

  p {
    line-height: 1;
  }

  li:first-of-type {
    position: relative;
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

    #emailVerificationCode {
      order: 5;
    }
  }

  li:nth-of-type(6) {
    display: flex;
    justify-content: center;
    height: ${pixelToRem(22)};
    margin: ${pixelToRem(16)} 0;
  }

  @media ${({ theme }) => theme.breakPoints.small} {
    li:first-of-type {
      button {
        font-size: ${({ theme }) => theme.fontSizes.xs};
      }
    }

    li:nth-of-type(6) {
      div {
        flex-shrink: 0;
      }
      label {
        font-size: ${({ theme }) => theme.fontSizes.sm};
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

export default JoinForm;
