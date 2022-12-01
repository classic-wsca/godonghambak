import { renderHook, act, fireEvent } from '@testing-library/react';

import { useWindowResize } from '~hooks/index';

describe('useWindowResize hook', () => {
  it('should return ref object and resizing state', () => {
    // given
    const { result } = renderHook(() => useWindowResize());

    // when
    // then
    expect(result.current.ref).toEqual({ current: null });
    expect(result.current.isOnResize).toBe(false);
  });

  it('should observe resizing event of window', () => {
    // given
    const { result } = renderHook(() => useWindowResize());

    // when
    fireEvent(window, new Event('resize'));

    // then
    expect(result.current.isOnResize).toBe(true);
  });

  it('should update resize state after resize event', () => {
    jest.useFakeTimers();

    // given
    const { result } = renderHook(() => useWindowResize());

    // when
    fireEvent(window, new Event('resize'));
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    // then
    expect(result.current.isOnResize).toBe(false);
    jest.useRealTimers();
  });
});
