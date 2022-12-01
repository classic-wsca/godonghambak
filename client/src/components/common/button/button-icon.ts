import type { GlobalSizes } from '~types/common';

import styled, { css } from 'styled-components';

import { pixelToRem } from '~utils/style-utils';

import ButtonBase from './button-base';

const ICON_BUTTON_STYLES: Partial<Record<GlobalSizes, ReturnType<typeof css>>> =
  {
    small: css`
      width: fit-content;
      height: fit-content;
      padding: ${pixelToRem(8)};
      border-radius: 50%;
      background-color: ${({ theme }) => theme.colors.dark};
      color: white;

      &:hover {
        background-image: linear-gradient(rgba(0, 0, 0, 0.1) 0 0);
      }
    `,
    medium: css`
      width: fit-content;
      height: fit-content;
      padding: ${pixelToRem(12)};
      border-radius: 50%;
      background-color: ${({ theme }) => theme.colors.green};
      color: white;

      &:hover {
        background-image: linear-gradient(rgba(0, 0, 0, 0.1) 0 0);
      }
    `,
    large: css`
      width: fit-content;
      height: fit-content;
      padding: ${pixelToRem(18)};
      border: 2px solid ${({ theme }) => theme.colors.gray_100};
      background-color: ${({ theme }) => theme.colors.gray_100};
      transition: transform 0.2s ease-out;
      color: ${({ theme }) => theme.colors.gray_500};

      &:hover {
        border: 2px solid ${({ theme }) => theme.colors.blue};
        box-shadow: 0px 2px 4px ${({ theme }) => `${theme.colors.blue}88`};
        transform: translateY(${pixelToRem(-16)});
      }

      &:active {
        border: 2px solid ${({ theme }) => theme.colors.blue};
      }
    `,
  };

const IconButton = styled(ButtonBase)`
  ${({ size = 'small' }) => ICON_BUTTON_STYLES[size]};
`;

export default IconButton;
