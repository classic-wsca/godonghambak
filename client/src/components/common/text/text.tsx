import type * as CSS from 'csstype';
import type { PropsWithChildren } from 'react';
import type { GlobalColors } from '~types/common';
import type { FontSizes, FontWeight, MarginPadding } from '~types/style';

import styled, { css } from 'styled-components';

import { shorthandStyleOfMarginPadding } from '~styles/custom-style';

export type TextElement =
  | 'p'
  | 'b'
  | 'i'
  | 'u'
  | 's'
  | 'em'
  | 'strong'
  | 'small'
  | 'cite'
  | 'mark'
  | 'del'
  | 'ins'
  | 'sub'
  | 'sup'
  | 'span';

interface TextProps extends MarginPadding, PropsWithChildren {
  id?: string;
  as?: TextElement;
  align?: CSS.Property.TextAlign;
  casing?: CSS.Property.TextTransform;
  decoration?: CSS.Property.TextDecoration;
  size?: FontSizes;
  fontWeight?: FontWeight;
  color?: GlobalColors;
  lineHeight?: CSS.Property.LineHeight;
  numberOfLines?: number;
}

const Text = ({ as = 'p', children, ...rest }: TextProps) => {
  return (
    <Base as={as} {...rest}>
      {children}
    </Base>
  );
};

const Base = styled.p<TextProps>`
  ${({ align }) =>
    align &&
    css`
      text-align: ${align};
    `};

  ${({ casing }) =>
    casing &&
    css`
      text-transform: ${casing};
    `};

  ${({ theme, color }) =>
    color &&
    css`
      color: ${theme.colors[color]};
    `};

  ${({ decoration }) =>
    decoration &&
    css`
      text-decoration: ${decoration};
    `};

  ${({ theme, size }) =>
    size &&
    css`
      font-size: ${theme.fontSizes[size]};
    `};

  ${({ fontWeight }) =>
    fontWeight &&
    css`
      font-weight: ${fontWeight};
    `};

  ${({ numberOfLines }) =>
    numberOfLines &&
    css`
      display: -webkit-box;
      padding-bottom: 3px; // 글자 잘림 현상 방지
      overflow: hidden;
      text-overflow: ellipsis;
      word-wrap: break-word;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: ${numberOfLines};
    `}

  ${({ lineHeight }) =>
    lineHeight &&
    css`
      line-height: ${lineHeight};
    `}

  ${shorthandStyleOfMarginPadding};
`;

export default Text;
