import {
  render,
  screen,
  renderHook,
  act,
  fireEvent,
} from '@testing-library/react';

import { useRipple } from '~hooks/index';

describe('useRipple hook', () => {
  it('should has zero ripples before the user clicks', () => {
    // given
    const { result } = renderHook(() => useRipple());

    // when
    // then
    expect(result.current[1]).toEqual([]);
  });

  it('should be able to add ripples when the user clicks', async () => {
    // given
    const { result } = renderHook(() => useRipple());
    const event = {
      currentTarget: {
        getBoundingClientRect: () => ({ left: 10, top: 10 }),
        clientWidth: 20,
        clientHeight: 20,
      },
      clientX: 15,
      clientY: 15,
    } as React.MouseEvent<HTMLButtonElement>;

    // when
    act(() => {
      result.current[0](event);
    });

    // then
    expect(result.current[1].length).toBe(1);
  });

  it('should remove the remaining ripples except for the current ripple after the animation end', () => {
    // given
    const { result } = renderHook(() => useRipple());
    const event = {
      currentTarget: {
        getBoundingClientRect: () => ({ left: 10, top: 10 }),
        clientWidth: 20,
        clientHeight: 20,
      },
      clientX: 15,
      clientY: 15,
      timeStamp: Date.now(),
    } as React.MouseEvent<HTMLButtonElement>;

    // when
    act(() => {
      result.current[0](event);
    });

    // then
    expect(result.current[1].length).toBe(1);

    // when
    render(result.current[1][0]);
    const ripple = screen.getByLabelText('ripple');
    fireEvent.animationEnd(ripple);

    // then
    expect(result.current[1].length).toBe(0);
  });
});
