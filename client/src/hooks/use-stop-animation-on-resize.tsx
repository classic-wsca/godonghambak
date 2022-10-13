import type { MutableRefObject, RefObject } from 'react';

import { useState, useEffect, useRef, useCallback } from 'react';

const useStopAnimationOnResize = <T extends HTMLElement>(): {
  ref: RefObject<T>;
  isOnResize: boolean;
} => {
  const [isOnResize, setIsOnResize] = useState(false);
  const ref: RefObject<T> = useRef<T>(null);
  const timerRef: MutableRefObject<NodeJS.Timeout | undefined> = useRef();

  const handleAnimationStopOnResize = useCallback(() => {
    setIsOnResize(true);
    clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      setIsOnResize(false);
    }, 400);
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleAnimationStopOnResize);

    return () => {
      window.removeEventListener('resize', handleAnimationStopOnResize);
    };
  }, [handleAnimationStopOnResize]);

  return { ref, isOnResize };
};

export default useStopAnimationOnResize;
