import type { Color } from '~styles/theme';

export type GlobalColors = keyof Color;

export type GlobalSizes = 'x-small' | 'small' | 'medium' | 'large' | 'x-large';

export interface ImageObject {
  src: string;
  alt: string;
}

export interface Dimension {
  width: number;
  height: number;
}

export interface Position {
  x: number;
  y: number;
}

export type Status = 'default' | 'error' | 'success';
