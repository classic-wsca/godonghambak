export const pixelToRem = (pixel: number): string => {
  if (pixel < 0) {
    throw new Error('음수는 변환할 수 없습니다.');
  }

  if (typeof window === 'undefined') {
    return `${pixel * 0.0625}rem`;
  }

  const browserFontSize = getComputedStyle(document.documentElement).fontSize;
  const fontSize =
    Math.round((pixel / parseFloat(browserFontSize) + Number.EPSILON) * 100) /
    100;

  return `${fontSize}rem`;
};

export const createBreakPoint = (breakPoint: number): string => {
  if (breakPoint < 0) {
    throw new Error('화면 사이즈는 0보다 커야 합니다.');
  }

  return `screen and (max-width: ${breakPoint}rem)`;
};
