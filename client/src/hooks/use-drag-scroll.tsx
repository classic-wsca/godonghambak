import React, { useState, useRef, useCallback } from 'react';

import useThrottle from './use-throttle';

const useDragScroll = <T extends HTMLElement>() => {
  const ref = useRef<T>(null);
  const [startX, setStartX] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const handleDragStart = useCallback((e: React.MouseEvent) => {
    if (!ref.current) {
      return;
    }

    e.preventDefault();
    setIsDragging(true);
    setStartX(e.pageX - ref.current.offsetLeft);
  }, []);

  const handleDragMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging || !ref.current) {
        return;
      }

      const distance = startX - (e.pageX - ref.current.offsetLeft);
      ref.current.scrollLeft += distance;
    },
    [isDragging, startX],
  );

  const throttleOnMouseMove = useThrottle<[React.MouseEvent]>(
    handleDragMove,
    1000 / 60,
  );

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  return {
    ref,
    handleDragStart,
    handleDragMove: throttleOnMouseMove,
    handleDragEnd,
  };
};

export default useDragScroll;
