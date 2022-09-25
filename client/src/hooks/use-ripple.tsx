import React, { useState } from 'react';
import { CSSProperties } from 'styled-components';

const MINIMUM_RIPPLE_SIZE = 100;

interface Ripple {
  index: number;
  style: CSSProperties;
}

const useRipple = (
  style?: CSSProperties,
): [(e: React.MouseEvent<HTMLButtonElement>) => void, JSX.Element[]] => {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const baseStyle: CSSProperties = {
    position: 'absolute',
    display: 'block',
    borderRadius: '50%',
    background: 'currentColor',
    opacity: 0.4,
    pointerEvents: 'none',
    animationName: 'useRippleAnimation',
    animationDuration: '0.7s',
    animationFillMode: 'forwards',
    ...style,
  };

  const addRiple = (e: React.MouseEvent<HTMLButtonElement>): void => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    const rippleSize = Math.min(
      e.currentTarget.clientHeight,
      e.currentTarget.clientWidth,
      MINIMUM_RIPPLE_SIZE,
    );

    const newRipple = {
      index: e.timeStamp,
      style: {
        width: rippleSize,
        height: rippleSize,
        left: x - rippleSize / 2,
        top: y - rippleSize / 2,
        ...baseStyle,
      },
    };

    setRipples((prevRipples) => [...prevRipples, newRipple]);
  };

  const handleAnimationEnd = (current: number) => {
    setRipples((prevRipples) =>
      prevRipples.filter((prevRipple) => prevRipple.index !== current),
    );
  };

  const ripplesArray: JSX.Element[] = ripples.map((currentRipple) => {
    return (
      <span
        key={currentRipple.index}
        {...currentRipple}
        onAnimationEnd={() => handleAnimationEnd(currentRipple.index)}
      />
    );
  });

  return [addRiple, ripplesArray];
};

export default useRipple;
