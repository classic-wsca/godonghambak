import type { GlobalSizes } from '~types/common';

import styled, { css } from 'styled-components';

import ButtonBase from './button-base';

import { pixelToRem } from '~utils/style-utils';

export const BUTTON_SIZES: Partial<
  Record<GlobalSizes, ReturnType<typeof css>>
> = {
  'x-small': css`
    padding: ${pixelToRem(11)} ${pixelToRem(18)};
    font-size: ${({ theme }) => theme.fontSizes.small};
    font-weight: 400;
  `,
  small: css`
    padding: ${pixelToRem(12)} ${pixelToRem(24)};
    font-size: ${({ theme }) => theme.fontSizes.medium};
  `,
  medium: css`
    padding: ${pixelToRem(12)} ${pixelToRem(48)};
    font-size: ${({ theme }) => theme.fontSizes.large};
  `,
  large: css`
    padding: ${pixelToRem(20)} ${pixelToRem(55)};
    border-radius: ${pixelToRem(50)};
  `,
  'x-large': css`
    padding: ${pixelToRem(20)} ${pixelToRem(68)};
    font-size: ${({ theme }) => theme.fontSizes.large};
  `,
};

export const FillButton = styled(ButtonBase)`
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};

  ${({ size = 'small' }) => BUTTON_SIZES[size]};
  ${({ theme, color = 'green' }) => {
    return css`
      background-color: ${theme.colors[color]};
      color: ${color === 'light' ? theme.colors.gray_700 : theme.colors.white};

      &:hover {
        background-image: linear-gradient(rgba(0, 0, 0, 0.1) 0 0);
      }
    `;
  }};
`;

export const OutlineButton = styled(ButtonBase)`
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};

  ${({ size = 'small' }) => BUTTON_SIZES[size]};
  ${({ theme, color = 'green' }) => {
    const currentColor = theme.colors[color];

    return css`
      border: 1px solid ${currentColor};
      background-color: ${theme.colors.white};
      color: ${color === 'gray' || color === 'light'
        ? theme.colors.dark
        : currentColor};

      &:hover {
        background-image: linear-gradient(
          ${`${currentColor}18`},
          ${`${currentColor}18`}
        );
      }
    `;
  }};
`;

export const GhostButton = styled(ButtonBase)`
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};

  ${({ size = 'small' }) => BUTTON_SIZES[size]};
  ${({ theme, color = 'green' }) => {
    const currentColor = theme.colors[color];

    return css`
      background-color: ${theme.colors.white};
      color: ${color === 'light' ? theme.colors.gray_700 : currentColor};

      &:hover {
        background-image: linear-gradient(
          ${`${currentColor}18`},
          ${`${currentColor}18`}
        );
      }
    `;
  }};
`;
