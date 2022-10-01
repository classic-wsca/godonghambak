import { renderHook, act } from '../test-utils';
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
    const { result } = renderHook(() => useInput(''));

    expect(result.current.value).toBe('');
    expect(result.current.status).toBe('default');
  });

  it('should be able to update value when change event', () => {
    const { result } = renderHook(() => useInput(''));
    const [changeEvent] = getEvents('new value');

    expect(result.current.value).toBe('');

    act(() => {
      result.current.handleChange(changeEvent);
    });

    expect(result.current.value).toBe('new value');
  });

  it('should update status when type is email and blur event', () => {
    const { result } = renderHook(() => useInput('', 'email'));
    const [changeEventFail, blurEventFail] = getEvents('example.com');
    const [changeEventSuccess, blurEventSuccess] =
      getEvents('example@gmail.com');

    act(() => {
      result.current.handleChange(changeEventFail);
      result.current.handleBlur(blurEventFail);
    });

    expect(result.current.status).toBe('error');
    expect(result.current.value).toBe('example.com');

    act(() => {
      result.current.handleChange(changeEventSuccess);
      result.current.handleBlur(blurEventSuccess);
    });

    expect(result.current.status).toBe('success');
    expect(result.current.value).toBe('example@gmail.com');
  });

  it('should update status when type is password and blur event', () => {
    const { result } = renderHook(() => useInput('', 'password'));
    const [changeEventFail, blurEventFail] = getEvents('password');
    const [changeEventSuccess, blurEventSuccess] = getEvents('password12!');

    act(() => {
      result.current.handleChange(changeEventFail);
      result.current.handleBlur(blurEventFail);
    });

    expect(result.current.status).toBe('error');
    expect(result.current.value).toBe('password');

    act(() => {
      result.current.handleChange(changeEventSuccess);
      result.current.handleBlur(blurEventSuccess);
    });

    expect(result.current.status).toBe('default');
    expect(result.current.value).toBe('password12!');
  });

  it('should update status when type is tel and blur event', () => {
    const { result } = renderHook(() => useInput('', 'tel'));
    const [changeEventFail, blurEventFail] = getEvents('0101');
    const [changeEventSuccess, blurEventSuccess] = getEvents('01012345678');

    act(() => {
      result.current.handleChange(changeEventFail);
      result.current.handleBlur(blurEventFail);
    });

    expect(result.current.status).toBe('error');
    expect(result.current.value).toBe('010-1');

    act(() => {
      result.current.handleChange(changeEventSuccess);
      result.current.handleBlur(blurEventSuccess);
    });

    expect(result.current.status).toBe('default');
    expect(result.current.value).toBe('010-1234-5678');
  });

  it('should change value to phone number format when type is tel and blur event', () => {
    const { result } = renderHook(() => useInput('', 'tel'));
    const [changeEvent, blurEvent] = getEvents('01012345678');

    act(() => {
      result.current.handleChange(changeEvent);
      result.current.handleBlur(blurEvent);
    });

    expect(result.current.value).toBe('010-1234-5678');
  });

  it('should change status to default if value is empty', () => {
    const { result } = renderHook(() => useInput('', 'email'));
    const [changeEventBeforeTyping, blurEventBeforeTyping] = getEvents('');
    const [changeEventTyping] = getEvents('something');
    const [changeEventAfterTyping, blurEventAfterTyping] = getEvents('');

    act(() => {
      result.current.handleChange(changeEventBeforeTyping);
      result.current.handleBlur(blurEventBeforeTyping);
    });

    expect(result.current.status).toBe('default');

    act(() => {
      result.current.handleChange(changeEventTyping);
    });

    expect(result.current.value).toBe('something');

    act(() => {
      result.current.handleChange(changeEventAfterTyping);
      result.current.handleBlur(blurEventAfterTyping);
    });

    expect(result.current.value).toBe('');
    expect(result.current.status).toBe('default');
  });

  it('shoudl reset value', () => {
    const { result } = renderHook(() => useInput('something'));

    expect(result.current.value).toBe('something');

    act(() => {
      result.current.handleReset();
    });

    expect(result.current.value).toBe('');
  });
});
