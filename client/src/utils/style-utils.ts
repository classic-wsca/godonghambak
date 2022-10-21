export const pixelToRem = (pixel: number): string => {
  const BASE_FONT_SIZE = 16;
  const fontSize = pixel / BASE_FONT_SIZE;

  return `${fontSize}rem`;
};

export const createBreakPoint = (breakPoint: number): string => {
  if (breakPoint < 0) {
    throw new Error('화면 사이즈는 0보다 커야 합니다.');
  }

  return `screen and (max-width: ${breakPoint}rem)`;
};
