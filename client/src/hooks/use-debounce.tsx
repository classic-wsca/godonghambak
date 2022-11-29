/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from 'react';

type Timer = ReturnType<typeof setTimeout>;

const useDebounce = <T extends any[]>(
  callback: (...params: T) => void,
  delay: number,
) => {
  const timer = useRef<Timer>();

  const debouncedFunction = (...params: T) => {
    if (timer.current) {
      clearTimeout(timer.current);
    }

    const newTimer = setTimeout(() => {
      callback(...params);
    }, delay);

    timer.current = newTimer;
  };

  const clearDebouncedFunction = () => {
    if (!timer.current) {
      return;
    }

    clearTimeout(timer.current);
  };

  useEffect(() => {
    return () => clearDebouncedFunction();
  }, []);

  return debouncedFunction;
};

export default useDebounce;
