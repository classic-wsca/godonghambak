import { css } from 'styled-components';

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
