import { css } from 'styled-components';

export interface UnderlineAnimation {
  color: string;
  highlight?: string;
}

export const rippleAnimation = css`
  position: relative;
  overflow: hidden;

  @keyframes useRippleAnimation {
    to {
      transform: scale(15);
      opacity: 0;
    }
  }
`;

export const underlineAnimation = css<UnderlineAnimation>`
  position: relative;
  display: inline-block;
  color: ${({ color, highlight }) => highlight || color};

  &:after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -4px;
    width: 100%;
    height: 2px;
    background-color: ${({ color, highlight }) => highlight || color};
    transform: scaleX(0);
    transform-origin: bottom right;
    transition: transform 0.25s ease-out;
  }

  &:hover:after {
    transform: scaleX(1);
    transform-origin: bottom left;
  }
`;
