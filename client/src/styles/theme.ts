import { DefaultTheme } from 'styled-components';

import { pixelToRem, createBreakPoint } from '~utils/style-utils';

export const colors = {
  red: '#B9584E',
  red_warning: '#ff1f00',
  red_warning_light: '#fff5f1',
  yellow: '#fdc47c',
  orange: '#fa743b',
  green: '#447A55',
  green_success: '#198754',
  green_success_light: '#dfffdc',
  blue: '#0085ff',
  pink: '#faddcd',
  light: '#fefefe',
  gray_100: '#f8f8f8',
  gray: '#dbdbdb',
  gray_500: '#9c9c9c',
  gray_600: '#707070',
  gray_700: '#666666',
  white: '#ffffff',
  dark: '#444444',
};

export const fontSizes = {
  '9xl': pixelToRem(64),
  '8xl': pixelToRem(60),
  '7xl': pixelToRem(44),
  '6xl': pixelToRem(40),
  '5xl': pixelToRem(32),
  '4xl': pixelToRem(28),
  '3xl': pixelToRem(24),
  '2xl': pixelToRem(22),
  xl: pixelToRem(20),
  lg: pixelToRem(18),
  md: pixelToRem(16),
  sm: pixelToRem(14),
  xs: pixelToRem(12),
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
