import type { PropsWithChildren } from 'react';
import type { GlobalColors } from '~types/common';
import type { FontSizes, FontWeight, MarginPadding } from '~types/style';

import styled, { css } from 'styled-components';

import { shorthandStyleOfMarginPadding } from '~styles/custom-style';

export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

interface HeadingProps extends MarginPadding, PropsWithChildren {
  id?: string;
  as?: HeadingLevel;
  size?: FontSizes;
  color?: GlobalColors;
  fontWeight?: FontWeight;
  numberOfLines?: number;
}

const Heading = ({ as = 'h1', children, ...rest }: HeadingProps) => {
  return (
    <Base as={as} {...rest}>
      {children}
    </Base>
  );
};

const HEADING_FONT_SIZES: { [key: string]: FontSizes } = {
  h1: '7xl',
  h2: '6xl',
  h3: '5xl',
  h4: '4xl',
  h5: '3xl',
  h6: '2xl',
};

const Base = styled.h1<HeadingProps>`
  ${({ theme, as: headingLevel }) =>
    headingLevel &&
    css`
      font-size: ${theme.fontSizes[HEADING_FONT_SIZES[headingLevel]]};
    `}

  ${({ theme, size }) =>
    size &&
    css`
      font-size: ${theme.fontSizes[size]};
    `}

  ${({ theme, color }) =>
    color &&
    css`
      color: ${theme.colors[color]};
    `}

  ${({ fontWeight }) =>
    fontWeight &&
    css`
      font-weight: ${fontWeight};
    `}

  ${({ numberOfLines }) =>
    numberOfLines &&
    css`
      display: -webkit-box;
      padding-bottom: 4px; // 글자 잘림 현상 방지
      overflow: hidden;
      text-overflow: ellipsis;
      word-wrap: break-word;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: ${numberOfLines};
    `}

  ${shorthandStyleOfMarginPadding};
`;

export default Heading;
