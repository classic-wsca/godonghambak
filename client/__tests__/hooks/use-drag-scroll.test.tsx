import { renderHook, act, render } from '@testing-library/react';
import React from 'react';

import { useDragScroll } from '~hooks/index';

describe('useDragScroll 훅 테스트', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it('마우스가 클릭된 상태가 아니면 드래그 할 수 없어야 한다.', () => {
    const { result } = renderHook(() => useDragScroll<HTMLDivElement>());
    render(<div ref={result.current.ref} />);

    // when
    act(() => result.current.handleDragMove({ pageX: 20 } as React.MouseEvent));
    act(() => result.current.handleDragMove({ pageX: 30 } as React.MouseEvent));
    act(() => result.current.handleDragMove({ pageX: 40 } as React.MouseEvent));

    act(() => {
      jest.advanceTimersByTime(60);
    });

    expect(result.current.ref.current?.scrollLeft).toBe(0);
  });

  it('ref로 지정한 요소의 scrollLeft 값을 변경할 수 있어야 한다.', () => {
    // given
    const events = [
      {
        preventDefault: jest.fn(),
        pageX: 10,
      } as unknown as React.MouseEvent,
      { pageX: 40 } as React.MouseEvent,
    ];
    const { result } = renderHook(() => useDragScroll<HTMLDivElement>());
    render(<div ref={result.current.ref} />);

    // when
    act(() => result.current.handleDragStart(events[0]));
    act(() => result.current.handleDragMove(events[1]));
    act(() => result.current.handleDragEnd());

    act(() => {
      jest.advanceTimersByTime(60);
    });

    // then
    expect(result.current.ref.current?.scrollLeft).toBe(-30);
  });
});
