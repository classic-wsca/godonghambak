import { renderHook, act } from '../test-utils';
import {
  isClient,
  getRandomBrowserSize,
  triggerResize,
} from '../test-utils/window';
import { useWindowSize } from '~hooks/index';

describe('useWindowSize hook', () => {
  it('should be defined', () => {
    expect(useWindowSize).toBeDefined();
  });

  it('should retrun current window dimensions', () => {
    const { result } = renderHook(() => useWindowSize());

    expect(typeof result.current).toBe('object');
    expect(typeof result.current.width).toBe('number');
    expect(typeof result.current.height).toBe('number');
  });

  it('should return undefined in case of non-browser use', () => {
    const { result } = renderHook(() => useWindowSize());

    expect(result.current.width).toBe(isClient ? window.innerWidth : undefined);
    expect(result.current.height).toBe(
      isClient ? window.innerHeight : undefined,
    );
  });

  it('should re-render after width change', () => {
    const { result } = renderHook(() => useWindowSize());
    const randomBrowserSize = getRandomBrowserSize();

    act(() => {
      triggerResize('width', randomBrowserSize);
    });

    expect(result.current.width).toBe(randomBrowserSize);
  });

  it('should re-render after height change', () => {
    const { result } = renderHook(() => useWindowSize());
    const randomBrowserSize = getRandomBrowserSize();

    act(() => {
      triggerResize('height', randomBrowserSize);
    });

    expect(result.current.height).toBe(randomBrowserSize);
  });
});
