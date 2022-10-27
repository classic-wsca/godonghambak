import type { PercentNumber, CommonBasicValues } from './common';

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
