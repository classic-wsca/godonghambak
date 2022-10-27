import type { Color, FontSize, BreakPoint } from '~styles/theme';

export { Color, FontSize, BreakPoint };

export type GlobalColors = keyof Color;

export type GlobalSizes = 'x-small' | 'small' | 'medium' | 'large' | 'x-large';

export type CommonBasicValues = 'inherit' | 'initial' | 'unset';

export type PercentNumber = `${number}%`;

export interface ImageObject {
  src: string;
  alt: string;
}

export interface Dimension {
  width: number;
  height: number;
}
