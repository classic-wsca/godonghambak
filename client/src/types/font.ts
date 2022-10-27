import type { FontSize, CommonBasicValues } from './common';

export type FontSizes = keyof FontSize;

export type FontWeight =
  | 100
  | 200
  | 300
  | 400
  | 500
  | 600
  | 700
  | 800
  | 900
  | 'bold'
  | 'bolder'
  | 'lighter'
  | 'normal'
  | CommonBasicValues;
