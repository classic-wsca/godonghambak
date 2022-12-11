import { renderHook, act } from '@testing-library/react';
import React from 'react';

import { useForm } from '~hooks/index';

const getHook = <T extends object>(
  initialValues: T,
  onSubmit: (values: T) => void,
  validate: (props: T) => Partial<T>,
) => {
  const { result } = renderHook(() =>
    useForm({ initialValues, onSubmit, validate }),
  );

  return result;
};

const getEvent = (name?: string, value?: string, type?: string) => {
  const changeEvent = {
    target: {
      name,
      value,
    },
  } as React.ChangeEvent<HTMLInputElement>;
  const focusEvent = {
    target: {
      name,
      type,
      value,
    },
  } as React.FocusEvent<HTMLInputElement>;
  const submitEvent: Partial<React.FormEvent<HTMLFormElement>> = {
    preventDefault: jest.fn(),
  };

  return { changeEvent, focusEvent, submitEvent };
};

describe('UseForm 훅 테스트', () => {
  it('입력받은 값을 업데이트 할 수 있어야 한다.', () => {
    // given
    const initialValues = {
      email: '',
      password: '',
    };
    const onSubmit = jest.fn();
    const validate = jest.fn();
    const result = getHook(initialValues, onSubmit, validate);
    const { changeEvent } = getEvent('email', 'example@gmail.com');

    // when
    act(() => {
      result.current.handleChange(changeEvent);
    });

    // then
    expect(result.current.values).toEqual({
      email: 'example@gmail.com',
      password: '',
    });
  });

  it('form 안에 input이 포커스에서 벗어날 때, 해당 input의 입력 형식에 맞지 않다면 상태가 에러로 변경되어야 한다.', () => {
    // given
    const initialValues = {
      email: '',
      password: '',
    };
    const onSubmit = jest.fn();
    const validate = jest.fn();
    const result = getHook(initialValues, onSubmit, validate);
    const { changeEvent } = getEvent('email', 'example');
    const { focusEvent: blurEvent } = getEvent('email', 'example', 'email');

    // when
    act(() => {
      result.current.handleChange(changeEvent);
      result.current.handleBlur(blurEvent);
    });

    // then
    expect(result.current.statuses).toEqual({ email: 'error' });
  });

  it('입력 후 다시 입력값을 모두 제거한다면, 기본 상태로 변경되어야 한다.', () => {
    const initialValues = {
      email: '',
      password: '',
    };
    const onSubmit = jest.fn();
    const validate = jest.fn();
    const result = getHook(initialValues, onSubmit, validate);
    const { changeEvent: enterInput } = getEvent('email', 'example@gmail.com');
    const { changeEvent: removeInput } = getEvent('email', '');
    const { focusEvent: enterInputBlurEvent } = getEvent(
      'email',
      'example@gmail.com',
      'email',
    );
    const { focusEvent: removeInputBlurEvent } = getEvent('email', '', 'email');

    // when
    act(() => {
      result.current.handleChange(enterInput);
      result.current.handleBlur(enterInputBlurEvent);
      result.current.handleChange(removeInput);
      result.current.handleBlur(removeInputBlurEvent);
    });

    // then
    expect(result.current.statuses).toEqual({ email: 'default' });
  });

  it('form 안에 input이 포커스 될 때, 해당 input의 상태를 기본 상태로 변경해야 한다.', () => {
    const initialValues = {
      email: '',
      password: '',
    };
    const onSubmit = jest.fn();
    const validate = jest.fn();
    const result = getHook(initialValues, onSubmit, validate);
    const { changeEvent } = getEvent('email', 'example');
    const { focusEvent: blurEvent } = getEvent('email', 'example', 'email');
    const { focusEvent } = getEvent('email');

    // when
    act(() => {
      result.current.handleChange(changeEvent);
      result.current.handleBlur(blurEvent);
      result.current.handleFocus(focusEvent);
    });

    // then
    expect(result.current.statuses).toEqual({ email: 'default' });
  });

  it('input의 타입이 tel이라면 포커스가 벗어날 때, 입력값을 핸드폰 번호 형식으로 변경할 수 있어야 한다.', () => {
    const initialValues = {
      phoneNumber: '',
    };
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
    expect(result.current.values).toEqual({ phoneNumber: '010-1234-5678' });
  });

  it('submit 이벤트 발생 시에 기본 동작을 중지 시킬 수 있어야 한다.', () => {
    const initialValues = {
      email: 'example@gamil.com',
      password: 'example1234!',
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
    expect(submitEvent.preventDefault).toHaveBeenCalledTimes(1);
  });

  it('입력값이 빈 상태에서 submit 이벤트 발생 시에 상태가 에러로 변경되어야 한다.', () => {
    const initialValues = {
      email: '',
      password: '',
    };
    const onSubmit = jest.fn();
    const validate = jest.fn().mockReturnValueOnce(() => ({
      email: '이메일을 입력해 주세요',
      password: '비밀번호를 입력해 주세요',
    }));
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
      password: 'error',
    });
  });

  it('입력값이 빈 상태에서 submit 이벤트 발생 시에 에러 메시지가 변경되어야 한다.', () => {
    const initialValues = {
      email: '',
      password: '',
    };
    const onSubmit = jest.fn();
    const validate = jest.fn().mockReturnValueOnce(() => ({
      email: '이메일을 입력해 주세요',
      password: '비밀번호를 입력해 주세요',
    }));
    const result = getHook(initialValues, onSubmit, validate);
    const { submitEvent } = getEvent();

    // when
    act(() => {
      result.current.handleSubmit(
        submitEvent as React.FormEvent<HTMLFormElement>,
      );
    });

    // then
    expect(result.current.errors).toEqual({
      email: '이메일을 입력해 주세요',
      password: '비밀번호를 입력해 주세요',
    });
  });

  it('에러가 없다면 submit 값을 전송할 수 있어야 한다.', () => {
    const initialValues = {
      email: 'example@gamil.com',
      password: 'example1234!',
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
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });
});
