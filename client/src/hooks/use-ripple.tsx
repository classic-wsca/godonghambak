import React, { useState } from 'react';
import { CSSProperties } from 'styled-components';

const MINIMUM_RIPPLE_SIZE = 100;

interface Ripple {
  key: number;
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

  const getRippleSize = (e: React.MouseEvent<HTMLButtonElement>): number => {
    const elementWidth = e.currentTarget.clientHeight;
    const elementHeight = e.currentTarget.clientWidth;

    return Math.min(elementWidth, elementHeight, MINIMUM_RIPPLE_SIZE);
  };

  const createNewRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    const rippleSize = getRippleSize(e);

    return {
      key: e.timeStamp,
      style: {
        width: rippleSize,
        height: rippleSize,
        left: x - rippleSize / 2,
        top: y - rippleSize / 2,
        ...baseStyle,
      },
    };
  };

  const addRiple = (e: React.MouseEvent<HTMLButtonElement>): void => {
    const newRipple = createNewRipple(e);
    setRipples((prevRipples) => [...prevRipples, newRipple]);
  };

  const handleAnimationEnd = (currentKey: number) => {
    setRipples((prevRipples) =>
      prevRipples.filter((prevRipple) => prevRipple.key !== currentKey),
    );
  };

  const ripplesArray: JSX.Element[] = ripples.map(({ key, ...props }) => (
    <span key={key} {...props} onAnimationEnd={() => handleAnimationEnd(key)} />
  ));

  return [addRiple, ripplesArray];
};

export default useRipple;
