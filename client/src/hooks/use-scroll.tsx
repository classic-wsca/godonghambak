import type { Position } from '~types/common';

import { useState, useEffect } from 'react';

import useThrottle from './use-throttle';

const useScroll = () => {
  const [scrollPosition, setScrollPosition] = useState<Position>({
    x: 0,
    y: 0,
  });

  const handleScrollPosition = () => {
    setScrollPosition({ x: window.scrollX, y: window.scrollY });
  };

  const handleScrollPositionWithThrottle = useThrottle(handleScrollPosition);

  useEffect(() => {
    window.addEventListener('scroll', handleScrollPositionWithThrottle);

    return () =>
      window.removeEventListener('scroll', handleScrollPositionWithThrottle);
  }, [handleScrollPositionWithThrottle]);

  return scrollPosition;
};

export default useScroll;
