import { useState, useEffect, useCallback } from 'react';

const useWindowSize = () => {
  const isClient = typeof window === 'object';

  const getSize = useCallback(() => {
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined,
    };
  }, [isClient]);

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    if (!isClient) {
      return;
    }

    const handleResize = () => {
      setWindowSize(getSize());
    };

    window.addEventListener('resize', handleResize);
    // eslint-disable-next-line consistent-return
    return () => window.removeEventListener('resize', handleResize);
  }, [getSize, isClient]);
  return windowSize;
};

export default useWindowSize;
