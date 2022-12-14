import type { UnderlineAnimation } from '~types/animation';
import type { NavigationSubRoutes } from '~types/navigation';

import Link from 'next/link';
import styled, { css } from 'styled-components';

import { useToggle } from '~hooks/index';
import DownArrowSVG from '~public/svgs/down-arrow.svg';
import { underlineAnimation } from '~styles/animation';
import { pixelToRem } from '~utils/style-utils';

interface PageListProps {
  text: string;
  subRoutes: NavigationSubRoutes[];
}

const PageList = ({ text, subRoutes }: PageListProps) => {
  const [isOpen, toggle] = useToggle();

  return (
    <div>
      <Trigger isOpen={isOpen} onClick={toggle}>
        <h4>{text}</h4>
        <DownArrowSVG />
      </Trigger>
      <List isOpen={isOpen}>
        {subRoutes.map(({ text: subText, href, highlight }) => (
          <li key={subText}>
            <Link href={href} passHref>
              <Item
                href="replace"
                color="#707070"
                highlight={highlight ? '#fdc47c' : ''}
                aria-label={subText}
              >
                {subText}
              </Item>
            </Link>
          </li>
        ))}
      </List>
    </div>
  );
};

const Trigger = styled.div<{ isOpen: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: ${pixelToRem(12)};
  font-size: ${({ theme }) => theme.fontSizes.xl};

  h4 {
    margin-top: 0;
  }

  svg {
    display: none;
  }

  @media ${({ theme }) => theme.breakPoints.medium} {
    padding: ${pixelToRem(12)} 0;
    font-size: inherit;
    cursor: pointer;

    h4 {
      margin: 0;
      color: ${({ theme, isOpen }) => isOpen && theme.colors.yellow};
    }

    svg {
      display: inline-block;
      transform: rotate(${({ isOpen }) => isOpen && 180}deg);
      transition: transform 200ms linear;
    }
  }
`;

const List = styled.ul<{ isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  gap: ${pixelToRem(20)};
  margin: 0;

  @media ${({ theme }) => theme.breakPoints.medium} {
    gap: ${pixelToRem(10)};
    transition: all 300ms ease-in-out;
    overflow: hidden;

    ${({ isOpen }) =>
      isOpen
        ? css`
            max-height: ${pixelToRem(500)};
            padding: ${pixelToRem(6)} ${pixelToRem(10)} ${pixelToRem(16)};
            opacity: 1;
          `
        : css`
            max-height: 0;
            padding: 0 ${pixelToRem(10)};
            opacity: 0;
          `}
  }
`;

const Item = styled.a<UnderlineAnimation>`
  transition: all 400ms ease-in;
  color: ${({ theme, highlight }) => highlight || theme.colors.dark};

  &:hover {
    color: ${({ theme, highlight }) => highlight || theme.colors.dark};
    font-weight: 500;
  }

  @media ${({ theme }) => theme.breakPoints.medium} {
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }

  ${underlineAnimation};
`;

export default PageList;
