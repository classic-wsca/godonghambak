import type { MutableRefObject, RefObject } from 'react';

import { useState, useEffect, useRef, useCallback } from 'react';

const useWindowResize = <T extends HTMLElement>(
  delay = 400,
): {
  ref: RefObject<T>;
  isOnResize: boolean;
} => {
  const [isOnResize, setIsOnResize] = useState(false);
  const ref: RefObject<T> = useRef<T>(null);
  const timerRef: MutableRefObject<NodeJS.Timeout | undefined> = useRef();

  const handleResize = useCallback(() => {
    setIsOnResize(true);
    clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      setIsOnResize(false);
    }, delay);
  }, [delay]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  return { ref, isOnResize };
};

export default useWindowResize;
