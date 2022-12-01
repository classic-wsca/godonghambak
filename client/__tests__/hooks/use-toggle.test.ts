import { renderHook, act } from '@testing-library/react';

import { useToggle } from '~hooks/index';

describe('useToggle hook', () => {
  it('should has initial value', () => {
    // given
    const { result } = renderHook(() => useToggle());

    // when
    // then
    expect(result.current[0]).toBe(false);
  });

  it('should assign initial value', () => {
    // given
    const { result } = renderHook(() => useToggle(true));

    // when
    // then
    expect(result.current[0]).toBe(true);
  });

  it('should be able to update value', () => {
    // given
    const { result } = renderHook(() => useToggle());

    expect(result.current[0]).toBe(false);

    // when
    act(() => {
      result.current[1]();
    });

    // then
    expect(result.current[0]).toBe(true);
  });
});
