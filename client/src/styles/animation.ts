import type { SlideInAnimation, UnderlineAnimation } from '~types/animation';

import { css, keyframes } from 'styled-components';

const slideIn = (translateValue: number) => keyframes`
  0% {
    transform: translateX(0px);
  } 100% {
    transform: translateX(-${translateValue}px);
  }
`;

export const slideInAnimation = css<SlideInAnimation>`
  animation-name: ${({ translateValue }) => slideIn(translateValue)};
  animation-duration: ${({ duration }) => duration && `${duration || 0}s`};
  animation-timing-function: ${({ timingFunction }) =>
    timingFunction || 'ease'};
  animation-fill-mode: ${({ fillMode }) => fillMode};
  animation-delay: ${({ delay }) => `${delay || 0}s`};
  animation-iteration-count: ${({ iterationCount }) => iterationCount || 1};
  animation-direction: ${({ direction }) => direction || 'normal'};
  animation-play-state: ${({ playState }) => playState || 'running'};
`;

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

  &:after {
    content: '';
    position: absolute;
    left: 0;
    bottom: ${({ bottom }) => (bottom ? `${bottom}px` : '-4px')};
    width: 100%;
    height: ${({ height }) => (height ? `${height}px` : '2px')};
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
