import { useState, useLayoutEffect, useCallback } from 'react';

const useWindowSize = () => {
  const getSize = useCallback(() => {}, []);

  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useLayoutEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [getSize]);

  return windowSize;
};

export default useWindowSize;
