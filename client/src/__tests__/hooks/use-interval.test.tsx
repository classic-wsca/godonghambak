import { renderHook, act } from '../test-utils';
import { useInterval } from '~hooks/index';

describe('useInterval hook', () => {
  beforeAll(() => {});

  beforeEach(() => {
    jest.useFakeTimers();
    jest.spyOn(globalThis, 'setTimeout');
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should recieved callback and delay', () => {
    const callback = jest.fn();
    const delay = 1000;
    renderHook(() => useInterval(callback, delay));

    expect(callback).toHaveBeenCalledTimes(0);
  });

  it('should call callback every delay time', () => {
    const callback = jest.fn();
    const delay = 1000;
    renderHook(() => useInterval(callback, delay));

    jest.advanceTimersByTime(2000);
    expect(callback).toHaveBeenCalledTimes(2);
  });

  it('should not restart the timer, if you pass a new callback', () => {
    const callback1 = jest.fn();
    const callback2 = jest.fn();
    let callback = callback1;

    const { rerender } = renderHook(() => {
      useInterval(callback, 1000);
    });

    jest.advanceTimersByTime(500);

    callback = callback2;
    rerender();

    jest.advanceTimersByTime(500);
    expect(callback1).toHaveBeenCalledTimes(0);
    expect(callback2).toHaveBeenCalledTimes(1);
  });

  it('should cancel the current timer and start a new one, if you pass a new delay', () => {
    const callback = jest.fn();
    let delay = 500;

    const { rerender } = renderHook(() => {
      useInterval(callback, delay);
    });

    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(2);

    delay = 1000;
    rerender();
    jest.advanceTimersByTime(5000);
    expect(callback).toHaveBeenCalledTimes(7);
  });

  it('should causes no change in the timer if passing the same parameters', () => {
    const callback = jest.fn();

    const { rerender } = renderHook(() => {
      useInterval(callback, 1000);
    });

    jest.advanceTimersByTime(500);

    rerender();

    jest.advanceTimersByTime(500);
    expect(callback).toHaveBeenCalledTimes(1);
  });
});
