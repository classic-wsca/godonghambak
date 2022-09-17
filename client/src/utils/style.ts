export const pixelToRem = (pixel: number): string => {
  if (typeof window === 'undefined') {
    return `${pixel * 0.0625}rem`;
  }

  const documentStyle = getComputedStyle(document.documentElement);
  const fontSize = pixel / parseFloat(documentStyle.fontSize);

  return `${fontSize}rem`;
};

export const createBreakPoint = (breakPoint: number): string => {
  return `screen and (max-width: ${breakPoint}rem)`;
};
