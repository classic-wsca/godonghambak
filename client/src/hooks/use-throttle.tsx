/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from 'react';

const useThrottle = <T extends any[]>(
  callback: (...params: T) => void,
  delay = 200,
) => {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const throttledFunction = (...params: T) => {
    if (timer.current) return;

    const newTimer = setTimeout(() => {
      callback(...params);
      timer.current = null;
    }, delay);

    timer.current = newTimer;
  };

  useEffect(() => {
    return () => {
      if (!timer.current) return;
      clearTimeout(timer.current);
    };
  }, []);

  return throttledFunction;
};

export default useThrottle;
