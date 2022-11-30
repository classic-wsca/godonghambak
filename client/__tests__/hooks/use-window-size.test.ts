import { renderHook, act } from '@testing-library/react';

import { useWindowSize } from '~hooks/index';

import {
  isClient,
  getRandomBrowserSize,
  triggerResize,
} from '../test-utils/window';

describe('useWindowSize hook', () => {
  it('should be defined', () => {
    // given
    // when
    // then
    expect(useWindowSize).toBeDefined();
  });

  it('should retrun current window dimensions', () => {
    // given
    const { result } = renderHook(() => useWindowSize());

    // when
    // then
    expect(typeof result.current).toBe('object');
    expect(typeof result.current.width).toBe('number');
    expect(typeof result.current.height).toBe('number');
  });

  it('should return undefined in case of non-browser use', () => {
    // given
    const { result } = renderHook(() => useWindowSize());

    // when
    // then
    expect(result.current.width).toBe(isClient ? window.innerWidth : undefined);
    expect(result.current.height).toBe(
      isClient ? window.innerHeight : undefined,
    );
  });

  it('should re-render after width change', () => {
    // given
    const { result } = renderHook(() => useWindowSize());
    const randomBrowserSize = getRandomBrowserSize();

    // when
    act(() => {
      triggerResize('width', randomBrowserSize);
    });

    // then
    expect(result.current.width).toBe(randomBrowserSize);
  });

  it('should re-render after height change', () => {
    // given
    const { result } = renderHook(() => useWindowSize());
    const randomBrowserSize = getRandomBrowserSize();

    // when
    act(() => {
      triggerResize('height', randomBrowserSize);
    });

    // then
    expect(result.current.height).toBe(randomBrowserSize);
  });
});
