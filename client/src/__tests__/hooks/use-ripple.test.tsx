/* eslint-disable testing-library/no-node-access */
import { render, renderHook, act, fireEvent } from '../test-utils';
import { useRipple } from '~hooks/index';

describe('useRipple hook', () => {
  it('should has zero ripples before the user clicks', () => {
    const { result } = renderHook(() => useRipple());

    expect(result.current[1]).toEqual([]);
  });

  it('should be able to add ripples when the user clicks', async () => {
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

    act(() => {
      result.current[0](event);
    });

    expect(result.current[1].length).toBe(1);
  });

  it('should remove the remaining ripples except for the current ripple after the animation end', () => {
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

    act(() => {
      result.current[0](event);
    });

    expect(result.current[1].length).toBe(1);

    const { container } = render(result.current[1][0]);
    const ripple = container.firstChild as Element;
    fireEvent.animationEnd(ripple);

    expect(result.current[1].length).toBe(0);
  });
});
