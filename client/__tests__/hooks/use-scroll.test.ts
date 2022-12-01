import { renderHook, fireEvent, act } from '@testing-library/react';

import { useScroll } from '../../src/hooks';

const getHook = () => {
  return renderHook(() => useScroll());
};

describe('useScroll 훅 테스트', () => {
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
    expect(useScroll).toBeDefined();
  });

  it('should return scroll position value', () => {
    // given
    const { result } = getHook();

    // when
    // then
    expect(result.current).toEqual({ x: 0, y: 0 });
  });

  it('should return scrolled position', () => {
    // given
    const { result } = getHook();

    // when
    fireEvent.scroll(window, { target: { scrollY: 100 } });

    act(() => {
      jest.advanceTimersByTime(200);
    });

    // then
    expect(result.current).toEqual({ x: 0, y: 100 });
  });
});
