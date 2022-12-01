import { renderHook } from '@testing-library/react';

import { useInterval } from '~hooks/index';

describe('useInterval hook', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it('should recieved callback and delay', () => {
    // given
    const callback = jest.fn();
    const delay = 1000;

    // when
    renderHook(() => useInterval(callback, delay));

    // then
    expect(callback).toHaveBeenCalledTimes(0);
  });

  it('should call callback every delay time', () => {
    // given
    const callback = jest.fn();
    const delay = 1000;

    // when
    renderHook(() => useInterval(callback, delay));
    jest.advanceTimersByTime(2000);

    // then
    expect(callback).toHaveBeenCalledTimes(2);
  });

  it('should not restart the timer, if you pass a new callback', () => {
    // given
    const callback1 = jest.fn();
    const callback2 = jest.fn();
    let callback = callback1;

    // when
    const { rerender } = renderHook(() => {
      useInterval(callback, 1000);
    });
    jest.advanceTimersByTime(500);

    callback = callback2;

    rerender();
    jest.advanceTimersByTime(500);

    // then
    expect(callback1).toHaveBeenCalledTimes(0);
    expect(callback2).toHaveBeenCalledTimes(1);
  });

  it('should cancel the current timer and start a new one, if you pass a new delay', () => {
    // given
    const callback = jest.fn();
    let delay = 500;

    // when
    const { rerender } = renderHook(() => {
      useInterval(callback, delay);
    });
    jest.advanceTimersByTime(1000);

    // then
    expect(callback).toHaveBeenCalledTimes(2);

    // given
    delay = 1000;

    // when
    rerender();
    jest.advanceTimersByTime(5000);

    // then
    expect(callback).toHaveBeenCalledTimes(7);
  });

  it('should causes no change in the timer if passing the same parameters', () => {
    // given
    const callback = jest.fn();

    // when
    const { rerender } = renderHook(() => {
      useInterval(callback, 1000);
    });

    jest.advanceTimersByTime(500);

    rerender();

    jest.advanceTimersByTime(500);

    // then
    expect(callback).toHaveBeenCalledTimes(1);
  });
});
