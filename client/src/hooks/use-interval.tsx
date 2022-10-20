import { useEffect, useRef } from 'react';

const useInterval = (callback: () => void, delay: number) => {
  const intervalRef = useRef<number | null>(null);
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const timerId = window.setInterval(() => callbackRef.current(), delay);
    intervalRef.current = timerId;

    return () => clearInterval(timerId);
  }, [delay]);

  return intervalRef;
};

export default useInterval;
