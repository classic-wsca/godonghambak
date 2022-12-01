import { useThrottle } from '../../src/hooks';
import { renderHook, act } from '../test-utils';

const setup = (callback: () => void, delay?: number) => {
  const { result } = renderHook(() => useThrottle(callback, delay));
  const throttleFn = result.current;

  return throttleFn;
};

describe('useThrottle 훅 테스트', () => {
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
    expect(useThrottle).toBeDefined();
  });

  it('should recieved callback and delay', () => {
    // given
    const callback = jest.fn();
    setup(callback);

    // when
    // then
    expect(callback).toHaveBeenCalledTimes(0);
  });

  it('should return the function', () => {
    // given
    const callback = jest.fn();
    const throttleFn = setup(callback);

    // when
    // then
    expect(throttleFn).toBeInstanceOf(Function);
  });

  it('should call recieved function', () => {
    // given
    let count = 0;
    const callback = jest.fn(() => {
      count += 1;
    });
    const throttleFn = setup(callback, 100);

    // when
    act(() => {
      throttleFn();
      jest.advanceTimersByTime(100);
    });

    // then
    expect(count).toEqual(1);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should call received function with throttle', () => {
    // given
    let count = 0;
    const callback = jest.fn(() => {
      count += 1;
    });
    const throttleFn = setup(callback, 100);

    // when
    act(() => {
      throttleFn();
      throttleFn();
      throttleFn();

      jest.advanceTimersByTime(100);

      throttleFn();
      throttleFn();
      throttleFn();

      jest.advanceTimersByTime(100);
    });

    // then
    expect(count).toEqual(2);
    expect(callback).toHaveBeenCalledTimes(2);
  });
});
