import type { JoinInformation } from '~types/auth';

import { renderHook, act } from '@testing-library/react';

import { INITIAL_JOIN_VALUE, JOIN_ERROR_MESSAGES } from '~constants/join';
import { useJoinForm } from '~hooks/index';

const getHook = <T extends Record<keyof JoinInformation, string>>(
  initialValues: T,
  onSubmit: (values: T) => void,
  validate: (props: T) => Partial<T>,
) => {
  const { result } = renderHook(() =>
    useJoinForm({ initialValues, onSubmit, validate }),
  );

  return result;
};

const getEvent = (name?: string, value?: string) => {
  const changeEvent = {
    target: {
      name,
      value,
    },
  } as React.ChangeEvent<HTMLInputElement>;
  const focusEvent = {
    target: {
      name,
      value,
    },
  } as React.FocusEvent<HTMLInputElement>;
  const submitEvent: Partial<React.FormEvent<HTMLFormElement>> = {
    preventDefault: jest.fn(),
  };

  return { changeEvent, focusEvent, submitEvent };
};

describe('UseJoinForm 훅 테스트', () => {
  it.each([
    ['email', 'example@gmail.com'],
    ['emailVerificationCode', '123456'],
    ['password', 'example1234!'],
    ['passwordConfirm', 'example1234!'],
    ['name', '홍길동'],
    ['phoneNumber', '010-1234-5678'],
    ['birth', '000111'],
  ])('입력 받은 값을 업데이트할 수 있어야 한다.', (key, value) => {
    // given
    const initialValues = INITIAL_JOIN_VALUE;
    const onSubmit = jest.fn();
    const validate = jest.fn();
    const result = getHook(initialValues, onSubmit, validate);
    const { changeEvent } = getEvent(key, value);

    // when
    act(() => {
      result.current.handleChange(changeEvent);
    });

    // then
    expect(result.current.values[key]).toEqual(value);
  });

  it('이메일 인증 코드를 업데이트 할 수 있어야 한다.', () => {
    // given
    const initialValues = INITIAL_JOIN_VALUE;
    const onSubmit = jest.fn();
    const validate = jest.fn();
    const result = getHook(initialValues, onSubmit, validate);
    const verificationCode = '123456';

    // when
    act(() => {
      result.current.updateVerificationCode(verificationCode);
    });

    // then
    expect(result.current.verificationCode).toBe(verificationCode);
  });

  it('체크박스의 checked값을 업데이트 할 수 있어야 한다.', () => {
    // given
    const initialValues = INITIAL_JOIN_VALUE;
    const onSubmit = jest.fn();
    const validate = jest.fn();
    const result = getHook(initialValues, onSubmit, validate);

    // when
    act(() => {
      result.current.toggleCheckboxChecked();
    });

    // then
    expect(result.current.isCheckboxChecked).toBe(true);
  });

  it.each([
    ['email', 'example'],
    ['emailVerificationCode', '1234'],
    ['password', 'example'],
    ['passwordConfirm', 'exam'],
    ['name', 'exam'],
    ['phoneNumber', '0101'],
    ['birth', '000000'],
  ])(
    'input에 값을 입력 후 포커스에서 벗어날 때, 해당 input의 입력 형식에 맞지 않다면 상태가 에러로 변경되어야 한다.',
    (key, errorValue) => {
      // given
      const initialValues = INITIAL_JOIN_VALUE;
      const onSubmit = jest.fn();
      const validate = jest.fn();
      const result = getHook(initialValues, onSubmit, validate);
      const { changeEvent } = getEvent(key, errorValue);
      const { focusEvent: blurEvent } = getEvent(key, errorValue);

      // when
      act(() => {
        result.current.handleChange(changeEvent);
        result.current.handleBlur(blurEvent);
      });

      // then
      expect(result.current.statuses[key]).toEqual('error');
    },
  );

  it.each([
    ['email', 'example@gmail.com'],
    ['emailVerificationCode', '123456'],
    ['password', 'example1234!'],
    ['passwordConfirm', 'example1234!'],
    ['name', '홍길동'],
    ['phoneNumber', '010-1234-5678'],
    ['birth', '000111'],
  ])(
    'input에 입력 후 값을 모두 지운다면, 해당 input의 상태를 기본 상태로 변경해야 한다.',
    (key, value) => {
      // given
      const initialValues = INITIAL_JOIN_VALUE;
      const onSubmit = jest.fn();
      const validate = jest.fn();
      const result = getHook(initialValues, onSubmit, validate);
      const { changeEvent: enterInputEvent } = getEvent(key, value);
      const { changeEvent: removeInputEvent } = getEvent(key, '');
      const { focusEvent: enterInputBlurEvent } = getEvent(key, value);
      const { focusEvent: removeInputBlurEvent } = getEvent(key, '');

      // when
      act(() => {
        result.current.handleChange(enterInputEvent);
        result.current.handleBlur(enterInputBlurEvent);
        result.current.handleChange(removeInputEvent);
        result.current.handleBlur(removeInputBlurEvent);
      });

      // then
      expect(result.current.statuses[key]).toEqual('default');
    },
  );

  it.each([
    ['email', 'example'],
    ['emailVerificationCode', '1234'],
    ['password', 'example'],
    ['passwordConfirm', 'exam'],
    ['name', 'exam'],
    ['phoneNumber', '0101'],
    ['birth', '000000'],
  ])(
    'input에 포커스 될 때, 해당 input의 상태를 기본 상태로 변경해야 한다.',
    (key, errorValue) => {
      // given
      const initialValues = INITIAL_JOIN_VALUE;
      const onSubmit = jest.fn();
      const validate = jest.fn();
      const result = getHook(initialValues, onSubmit, validate);
      const { changeEvent } = getEvent(key, errorValue);
      const { focusEvent: blurEvent } = getEvent(key, errorValue);
      const { focusEvent } = getEvent(key);

      // when
      act(() => {
        result.current.handleChange(changeEvent);
        result.current.handleBlur(blurEvent);
        result.current.handleFocus(focusEvent);
      });

      // then
      expect(result.current.statuses[key]).toEqual('default');
    },
  );

  it.each([
    ['email', 'example', 'emailVerificationCode'],
    ['password', 'example', 'passwordConfirm'],
  ])(
    '이메일과 비밀번호 input에 포커스 될 때, 각 이메일 인증코드, 비밀번호 확인 input의 값, 상태, 에러를 초기화 시켜야 한다.',
    (key, errorValue, confirmKey) => {
      // given
      const initialValues = INITIAL_JOIN_VALUE;
      const onSubmit = jest.fn();
      const validate = jest.fn();
      const result = getHook(initialValues, onSubmit, validate);
      const { changeEvent } = getEvent(key, errorValue);
      const { focusEvent: blurEvent } = getEvent(key, errorValue);
      const { focusEvent } = getEvent(key);

      // when
      act(() => {
        result.current.handleChange(changeEvent);
        result.current.handleBlur(blurEvent);
        result.current.handleFocus(focusEvent);
      });

      // then
      expect(result.current.values[confirmKey]).toEqual('');
      expect(result.current.statuses[confirmKey]).toEqual('default');
      expect(result.current.errors[confirmKey]).toEqual(undefined);
    },
  );

  it('전화번호 입력 후 포커스가 벗어날 때, 입력값을 핸드폰 번호 형식으로 변경할 수 있어야 한다.', () => {
    const initialValues = INITIAL_JOIN_VALUE;
    const onSubmit = jest.fn();
    const validate = jest.fn();
    const result = getHook(initialValues, onSubmit, validate);
    const { changeEvent } = getEvent('phoneNumber', '01012345678');
    const { focusEvent: blurEvent } = getEvent('phoneNumber', '01012345678');

    // when
    act(() => {
      result.current.handleChange(changeEvent);
      result.current.handleBlur(blurEvent);
    });

    // then
    expect(result.current.values.phoneNumber).toEqual('010-1234-5678');
  });

  it('입력값 없이 submit 이벤트 발생 시에 상태가 에러로 변경되어야 한다.', () => {
    // given
    const initialValues = INITIAL_JOIN_VALUE;
    const onSubmit = jest.fn();
    const validate = jest.fn(() => JOIN_ERROR_MESSAGES.notExist);
    const result = getHook(initialValues, onSubmit, validate);
    const { submitEvent } = getEvent();

    // when
    act(() => {
      result.current.handleSubmit(
        submitEvent as React.FormEvent<HTMLFormElement>,
      );
    });

    // then
    expect(result.current.statuses).toEqual({
      email: 'error',
      emailVerificationCode: 'default',
      password: 'error',
      passwordConfirm: 'default',
      name: 'error',
      phoneNumber: 'error',
      birth: 'error',
    });
    expect(result.current.errors).toEqual(JOIN_ERROR_MESSAGES.notExist);
  });

  it('입력에 에러가 없어도, 체크박스에 체크가 안되었다면 폼에 저장된 값을 submit 할 수 없어야 한다.', () => {
    // given
    const initialValues = {
      email: 'example@gamil.com',
      emailVerificationCode: '123456',
      password: 'example1234!',
      passwordConfirm: 'example1234!',
      name: '홍길동',
      phoneNumber: '010-1234-5678',
      birth: '091031',
    };
    const onSubmit = jest.fn();
    const validate = jest.fn().mockReturnValueOnce(() => {});
    const result = getHook(initialValues, onSubmit, validate);
    const { submitEvent } = getEvent();

    // when
    act(() => {
      result.current.handleSubmit(
        submitEvent as React.FormEvent<HTMLFormElement>,
      );
    });

    // then
    expect(onSubmit).toHaveBeenCalledTimes(0);
  });

  it('입력에 에러가 없고, 체크박스에 체크되었다면 폼에 저장된 값을 submit 할 수 있어야 한다.', () => {
    // given
    const initialValues = {
      email: 'example@gamil.com',
      emailVerificationCode: '123456',
      password: 'example1234!',
      passwordConfirm: 'example1234!',
      name: '홍길동',
      phoneNumber: '010-1234-5678',
      birth: '091031',
    };
    const onSubmit = jest.fn();
    const validate = jest.fn().mockReturnValueOnce(() => {});
    const result = getHook(initialValues, onSubmit, validate);
    const { submitEvent } = getEvent();

    // when
    act(() => {
      result.current.toggleCheckboxChecked();
    });
    act(() => {
      result.current.handleSubmit(
        submitEvent as React.FormEvent<HTMLFormElement>,
      );
    });

    // then
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });
});
