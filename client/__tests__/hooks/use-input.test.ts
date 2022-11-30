import { renderHook, act } from '@testing-library/react';

import { useInput } from '~hooks/index';

const getEvents = (
  value: string,
): [
  React.ChangeEvent<HTMLInputElement>,
  React.FocusEvent<HTMLInputElement>,
] => {
  const changeEvent = {
    target: {
      value,
    },
  } as React.ChangeEvent<HTMLInputElement>;
  const blurEvent = {
    target: {
      value,
    },
  } as React.FocusEvent<HTMLInputElement>;

  return [changeEvent, blurEvent];
};

describe('useInput hook', () => {
  it('should has initial value', () => {
    // given
    const { result } = renderHook(() => useInput(''));

    // when
    // then
    expect(result.current.value).toBe('');
    expect(result.current.status).toBe('default');
  });

  it('should be able to update value when change event', () => {
    // given
    const { result } = renderHook(() => useInput(''));
    const [changeEvent] = getEvents('new value');

    expect(result.current.value).toBe('');

    // when
    act(() => {
      result.current.handleChange(changeEvent);
    });

    // then
    expect(result.current.value).toBe('new value');
  });

  it('should update status when type is email and blur event', () => {
    // given
    const { result } = renderHook(() => useInput('', 'email'));
    const [changeEventFail, blurEventFail] = getEvents('example.com');
    const [changeEventSuccess, blurEventSuccess] =
      getEvents('example@gmail.com');

    // when
    act(() => {
      result.current.handleChange(changeEventFail);
      result.current.handleBlur(blurEventFail);
    });

    // then
    expect(result.current.status).toBe('error');
    expect(result.current.value).toBe('example.com');

    // when
    act(() => {
      result.current.handleChange(changeEventSuccess);
      result.current.handleBlur(blurEventSuccess);
    });

    // then
    expect(result.current.status).toBe('success');
    expect(result.current.value).toBe('example@gmail.com');
  });

  it('should update status when type is password and blur event', () => {
    // given
    const { result } = renderHook(() => useInput('', 'password'));
    const [changeEventFail, blurEventFail] = getEvents('password');
    const [changeEventSuccess, blurEventSuccess] = getEvents('password12!');

    // when
    act(() => {
      result.current.handleChange(changeEventFail);
      result.current.handleBlur(blurEventFail);
    });

    // then
    expect(result.current.status).toBe('error');
    expect(result.current.value).toBe('password');

    // when
    act(() => {
      result.current.handleChange(changeEventSuccess);
      result.current.handleBlur(blurEventSuccess);
    });

    // then
    expect(result.current.status).toBe('default');
    expect(result.current.value).toBe('password12!');
  });

  it('should update status when type is tel and blur event', () => {
    // given
    const { result } = renderHook(() => useInput('', 'tel'));
    const [changeEventFail, blurEventFail] = getEvents('0101');
    const [changeEventSuccess, blurEventSuccess] = getEvents('01012345678');

    // when
    act(() => {
      result.current.handleChange(changeEventFail);
      result.current.handleBlur(blurEventFail);
    });

    // then
    expect(result.current.status).toBe('error');
    expect(result.current.value).toBe('010-1');

    // when
    act(() => {
      result.current.handleChange(changeEventSuccess);
      result.current.handleBlur(blurEventSuccess);
    });

    // then
    expect(result.current.status).toBe('default');
    expect(result.current.value).toBe('010-1234-5678');
  });

  it('should change value to phone number format when type is tel and blur event', () => {
    // given
    const { result } = renderHook(() => useInput('', 'tel'));
    const [changeEvent, blurEvent] = getEvents('01012345678');

    // when
    act(() => {
      result.current.handleChange(changeEvent);
      result.current.handleBlur(blurEvent);
    });

    // then
    expect(result.current.value).toBe('010-1234-5678');
  });

  it('should change status to default if value is empty', () => {
    // given
    const { result } = renderHook(() => useInput('', 'email'));
    const [changeEventBeforeTyping, blurEventBeforeTyping] = getEvents('');
    const [changeEventTyping] = getEvents('something');
    const [changeEventAfterTyping, blurEventAfterTyping] = getEvents('');

    // when
    act(() => {
      result.current.handleChange(changeEventBeforeTyping);
      result.current.handleBlur(blurEventBeforeTyping);
    });

    // then
    expect(result.current.status).toBe('default');

    // when
    act(() => {
      result.current.handleChange(changeEventTyping);
    });

    // then
    expect(result.current.value).toBe('something');

    // when
    act(() => {
      result.current.handleChange(changeEventAfterTyping);
      result.current.handleBlur(blurEventAfterTyping);
    });

    // then
    expect(result.current.value).toBe('');
    expect(result.current.status).toBe('default');
  });

  it('shoudl reset value', () => {
    // given
    const { result } = renderHook(() => useInput('something'));

    expect(result.current.value).toBe('something');

    // when
    act(() => {
      result.current.handleReset();
    });

    // then
    expect(result.current.value).toBe('');
  });
});
