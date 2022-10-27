import type { MarginValue, MarginPadding } from '~types/margin-padding';

import { css } from 'styled-components';
import { pixelToRem } from '~utils/style-utils';

const validateMarginPaddingValue = (value?: MarginValue) => {
  if (value === undefined) {
    return null;
  }

  if (typeof value === 'string') {
    return value;
  }

  return pixelToRem(value);
};

export const marginAndPaddings = css<MarginPadding>`
  ${({ m }) =>
    m !== undefined &&
    css`
      margin: ${validateMarginPaddingValue(m)};
    `};

  ${({ mt }) =>
    mt !== undefined &&
    css`
      margin-top: ${validateMarginPaddingValue(mt)};
    `};

  ${({ mb }) =>
    mb !== undefined &&
    css`
      margin-bottom: ${validateMarginPaddingValue(mb)};
    `};

  ${({ ml }) =>
    ml !== undefined &&
    css`
      margin-left: ${validateMarginPaddingValue(ml)};
    `};

  ${({ mr }) =>
    mr !== undefined &&
    css`
      margin-right: ${validateMarginPaddingValue(mr)};
    `};

  ${({ mx }) =>
    mx !== undefined &&
    css`
      margin-left: ${validateMarginPaddingValue(mx)};
      margin-right: ${validateMarginPaddingValue(mx)};
    `};

  ${({ my }) =>
    my !== undefined &&
    css`
      margin-top: ${validateMarginPaddingValue(my)};
      margin-bottom: ${validateMarginPaddingValue(my)};
    `};

  ${({ p }) =>
    p !== undefined &&
    css`
      padding: ${validateMarginPaddingValue(p)};
    `};

  ${({ pt }) =>
    pt !== undefined &&
    css`
      padding-top: ${validateMarginPaddingValue(pt)};
    `};

  ${({ pb }) =>
    pb !== undefined &&
    css`
      padding-bottom: ${validateMarginPaddingValue(pb)};
    `};

  ${({ pl }) =>
    pl !== undefined &&
    css`
      padding-left: ${validateMarginPaddingValue(pl)};
    `};

  ${({ pr }) =>
    pr !== undefined &&
    css`
      padding-right: ${validateMarginPaddingValue(pr)};
    `};

  ${({ px }) =>
    px !== undefined &&
    css`
      padding-left: ${validateMarginPaddingValue(px)};
      padding-right: ${validateMarginPaddingValue(px)};
    `};

  ${({ py }) =>
    py !== undefined &&
    css`
      padding-top: ${validateMarginPaddingValue(py)};
      padding-bottom: ${validateMarginPaddingValue(py)};
    `};
`;
