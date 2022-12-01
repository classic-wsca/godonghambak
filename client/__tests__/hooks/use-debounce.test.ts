import { renderHook, act } from '@testing-library/react';

import { useDebounce } from '../../src/hooks';

const setup = (callback: (param?: number) => void, delay?: number) => {
  const { result } = renderHook(() => useDebounce(callback, delay));
  const debounceFn = result.current;

  return debounceFn;
};

describe('useDebounce 훅 테스트', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it('should be defined', () => {
    // given
    // when
    // then
    expect(useDebounce).toBeDefined();
  });

  it('should return the function', () => {
    // given
    const callback = jest.fn();
    const debounceFn = setup(callback);

    // when
    // then
    expect(debounceFn).toBeInstanceOf(Function);
  });

  it('should call recived function', () => {
    // given
    let count = 0;
    const callback = jest.fn(() => {
      count += 1;
    });
    const debounceFn = setup(callback, 100);

    // when
    act(() => {
      debounceFn();
      jest.advanceTimersByTime(100);
    });

    // then
    expect(count).toEqual(1);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should call only the last function that was called within the delay time', () => {
    // given
    let count = 0;
    const callback = jest.fn((param) => {
      count += param;
    });
    const debounceFn = setup(callback, 100);

    // when
    act(() => {
      debounceFn(5);
      debounceFn(4);
      debounceFn(1);
      debounceFn(3);
      jest.advanceTimersByTime(100);
    });

    // then
    expect(count).toBe(3);
    expect(callback).toHaveBeenCalledTimes(1);
  });
});
