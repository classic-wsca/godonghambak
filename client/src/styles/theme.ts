import { DefaultTheme } from 'styled-components';
import { pixelToRem, createBreakPoint } from '~utils/style';

export const colors = {
  primary: '#447A55',
  secondary: '#B9584E',
  success: '#198754',
  success_background: '#dfffdc',
  warning: '#ff1f00',
  warning_background: '#fff5f1',
  background: '#fefefe',
  orange: 'fa743b',
  yellow: '#fdc47c',
  blue: '#0d6efd',
  pink: '#faddcd',
  gray_100: '#f8f8f8',
  gray_300: '#dbdbdb',
  gray_500: '#9c9c9c',
  gray_700: '#707070',
  white: '#fff',
  black: '#444',
};

export const fontSizes = {
  h1: pixelToRem(44),
  h2: pixelToRem(40),
  h3: pixelToRem(32),
  h4: pixelToRem(28),
  h5: pixelToRem(24),
  h6: pixelToRem(22),
  large: pixelToRem(20),
  medium: pixelToRem(18),
  small: pixelToRem(14),
  bigFont_large: pixelToRem(64),
  bigFont_small: pixelToRem(60),
};

export const breakPoints = {
  extraLarge: createBreakPoint(75),
  large: createBreakPoint(62),
  medium: createBreakPoint(48),
  small: createBreakPoint(35.5),
};

export type BreakPoint = typeof breakPoints;
export type Color = typeof colors;
export type FontSize = typeof fontSizes;

export const theme: DefaultTheme = {
  colors,
  fontSizes,
  breakPoints,
};
