import { getRandomNumber } from '~utils/math-utils';

export const isClient = typeof window === 'object';

export const getRandomBrowserSize = () => {
  const BROWSER_SIZES = [360, 768, 992, 1280, 1440, 1920, 2048];
  const randomIndex = getRandomNumber(0, BROWSER_SIZES.length);
  const randomValue = BROWSER_SIZES[randomIndex];

  return randomValue;
};

export const triggerResize = (dimension: 'width' | 'height', value: number) => {
  if (dimension === 'width') {
    window.innerWidth = value;
  } else if (dimension === 'height') {
    window.innerHeight = value;
  }

  window.dispatchEvent(new Event('resize'));
};
