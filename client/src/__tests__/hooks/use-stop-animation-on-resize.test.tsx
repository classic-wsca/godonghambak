import { renderHook, act, fireEvent } from '../test-utils';
import { useStopAnimationOnResize } from '~hooks/index';

describe('useStopAnimationOnResize hook', () => {
  it('should return ref object and resizing state', () => {
    const { result } = renderHook(() => useStopAnimationOnResize());

    expect(result.current.ref).toEqual({ current: null });
    expect(result.current.isOnResize).toBe(false);
  });

  it('should observe resizing event of window', () => {
    const { result } = renderHook(() => useStopAnimationOnResize());

    fireEvent(window, new Event('resize'));

    expect(result.current.isOnResize).toBe(true);
  });

  it('should update resize state after resize event', () => {
    jest.useFakeTimers();
    const { result } = renderHook(() => useStopAnimationOnResize());

    fireEvent(window, new Event('resize'));
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current.isOnResize).toBe(false);
    jest.useRealTimers();
  });
});
