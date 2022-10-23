import { renderHook, act } from '../test-utils';
import { useWindowSize } from '~hooks/index';
import { getRandomNumber } from '~utils/math-utils';

describe('useWindowSize hook', () => {
  const BROWSER_SIZES = [360, 768, 992, 1280, 1440, 1920, 2048];

  const isClient = typeof window === 'object';

  const getRandomValueOfArray = <T,>(array: T[]) => {
    const randomIndex = getRandomNumber(0, array.length);
    const randomBrowserSize = array[randomIndex];

    return randomBrowserSize;
  };

  const triggerResize = (dimension: 'width' | 'height', value: number) => {
    if (dimension === 'width') {
      window.innerWidth = value;
    } else if (dimension === 'height') {
      window.innerHeight = value;
    }

    window.dispatchEvent(new Event('resize'));
  };

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
    const randomBrowserSize = getRandomValueOfArray(BROWSER_SIZES);

    act(() => {
      triggerResize('width', randomBrowserSize);
    });

    expect(result.current.width).toBe(randomBrowserSize);
  });

  it('should re-render after height change', () => {
    const { result } = renderHook(() => useWindowSize());
    const randomBrowserSize = getRandomValueOfArray(BROWSER_SIZES);

    act(() => {
      triggerResize('height', randomBrowserSize);
    });

    expect(result.current.height).toBe(randomBrowserSize);
  });
});
