import type { Color, FontSize } from '~styles/theme';

export type GlobalColors = keyof Color;

export type GlobalSizes = 'x-small' | 'small' | 'medium' | 'large' | 'x-large';

export type FontSizes = keyof FontSize;

export interface ImageObject {
  src: string;
  alt: string;
}

export interface Dimension {
  width: number;
  height: number;
}
