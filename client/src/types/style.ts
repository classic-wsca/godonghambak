import type { FontSize } from '~styles/theme';

export type PercentNumber = `${number}%`;

export type CommonBasicValues = 'inherit' | 'initial' | 'unset';

export type MarginValue = number | 'auto' | PercentNumber | CommonBasicValues;

export type PaddingValue = number | PercentNumber | CommonBasicValues;

export interface MarginPadding {
  m?: MarginValue;
  mt?: MarginValue;
  mb?: MarginValue;
  ml?: MarginValue;
  mr?: MarginValue;
  mx?: MarginValue;
  my?: MarginValue;
  p?: PaddingValue;
  pt?: PaddingValue;
  pb?: PaddingValue;
  pl?: PaddingValue;
  pr?: PaddingValue;
  px?: PaddingValue;
  py?: PaddingValue;
}

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
