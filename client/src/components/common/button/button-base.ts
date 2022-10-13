import type { GlobalColors, GlobalSizes } from '~types/common';

import styled from 'styled-components';

import { pixelToRem } from '~utils/style-utils';
import { rippleAnimation } from '~styles/animation';

export type ButtonVariants = 'fill' | 'outline' | 'ghost' | 'icon';

export interface ButtonStyle {
  variant?: ButtonVariants;
  size?: GlobalSizes;
  color?: GlobalColors;
  fullWidth?: boolean;
}

const ButtonBase = styled.button<ButtonStyle>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: ${pixelToRem(10)};
  font-weight: 500;
  white-space: nowrap;
  user-select: none;
  transition: color 0.1s ease-in-out, background-color 0.1s ease-in-out;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.blue};
  }

  &:disabled {
    opacity: 0.25;
    cursor: not-allowed;
  }

  ${rippleAnimation}
`;

export default ButtonBase;
