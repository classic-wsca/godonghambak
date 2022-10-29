import type { MarginPadding } from '~types/style';

import { css } from 'styled-components';
import { pixelToRem } from '~utils/style-utils';

const validateNumberValueOfCSS = (value?: string | number | undefined) => {
  if (value === undefined) {
    return null;
  }

  if (typeof value === 'string') {
    return value;
  }

  return pixelToRem(value);
};

export const shorthandStyleOfMarginPadding = css<MarginPadding>`
  ${({ m }) =>
    m !== undefined &&
    css`
      margin: ${validateNumberValueOfCSS(m)};
    `};

  ${({ mt }) =>
    mt !== undefined &&
    css`
      margin-top: ${validateNumberValueOfCSS(mt)};
    `};

  ${({ mb }) =>
    mb !== undefined &&
    css`
      margin-bottom: ${validateNumberValueOfCSS(mb)};
    `};

  ${({ ml }) =>
    ml !== undefined &&
    css`
      margin-left: ${validateNumberValueOfCSS(ml)};
    `};

  ${({ mr }) =>
    mr !== undefined &&
    css`
      margin-right: ${validateNumberValueOfCSS(mr)};
    `};

  ${({ mx }) =>
    mx !== undefined &&
    css`
      margin-left: ${validateNumberValueOfCSS(mx)};
      margin-right: ${validateNumberValueOfCSS(mx)};
    `};

  ${({ my }) =>
    my !== undefined &&
    css`
      margin-top: ${validateNumberValueOfCSS(my)};
      margin-bottom: ${validateNumberValueOfCSS(my)};
    `};

  ${({ p }) =>
    p !== undefined &&
    css`
      padding: ${validateNumberValueOfCSS(p)};
    `};

  ${({ pt }) =>
    pt !== undefined &&
    css`
      padding-top: ${validateNumberValueOfCSS(pt)};
    `};

  ${({ pb }) =>
    pb !== undefined &&
    css`
      padding-bottom: ${validateNumberValueOfCSS(pb)};
    `};

  ${({ pl }) =>
    pl !== undefined &&
    css`
      padding-left: ${validateNumberValueOfCSS(pl)};
    `};

  ${({ pr }) =>
    pr !== undefined &&
    css`
      padding-right: ${validateNumberValueOfCSS(pr)};
    `};

  ${({ px }) =>
    px !== undefined &&
    css`
      padding-left: ${validateNumberValueOfCSS(px)};
      padding-right: ${validateNumberValueOfCSS(px)};
    `};

  ${({ py }) =>
    py !== undefined &&
    css`
      padding-top: ${validateNumberValueOfCSS(py)};
      padding-bottom: ${validateNumberValueOfCSS(py)};
    `};
`;
