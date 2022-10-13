import styled, { css } from 'styled-components';

import { pixelToRem } from '~utils/style-utils';

interface NavToggleProps {
  isOpen: boolean;
  onClick: () => void;
}

const NavToggle = ({ isOpen, onClick }: NavToggleProps) => {
  return (
    <ToggleNav
      type="button"
      isOpen={isOpen}
      onClick={onClick}
      aria-label="toggle-navigation"
    >
      <Bar />
      <Bar />
      <Bar />
    </ToggleNav>
  );
};

const ToggleNav = styled.button<{ isOpen: boolean }>`
  position: relative;
  display: none;
  padding: ${pixelToRem(10)};
  z-index: 1000;

  span:last-child {
    margin-bottom: 0;
  }

  ${({ isOpen }) =>
    isOpen &&
    css`
      span:first-child {
        transform: rotate(45deg);
        transform-origin: 15% 15%;
      }
      span:nth-child(2) {
        opacity: 0;
      }
      span:last-child {
        transform: rotate(-45deg);
        transform-origin: 15% 95%;
      }
    `}

  @media ${({ theme }) => theme.breakPoints.large} {
    display: inline-block;
  }
`;

const Bar = styled.span`
  display: block;
  width: ${pixelToRem(25)};
  height: ${pixelToRem(2)};
  border-radius: ${pixelToRem(2)};
  margin-bottom: ${pixelToRem(4)};
  background-color: ${({ theme }) => theme.colors.dark};
  transform: rotate(0deg);
  transition: all 200ms ease;
`;

export default NavToggle;
