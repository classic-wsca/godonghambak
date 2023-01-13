import type { ReactElement } from 'react';

import Image from 'next/image';
import styled from 'styled-components';

import { Button } from '~components/common';
import { BreadcrumbLayout } from '~components/layout';
import { MENU_CATEGORIES } from '~constants/menu';
import { useDragScroll } from '~hooks/index';
import { pixelToRem } from '~utils/style-utils';

const Menu = () => {
  const {
    ref: navRef,
    handleDragStart,
    handleDragEnd,
    handleDragMove,
  } = useDragScroll();

  return (
    <Container>
      <MenuNav
        ref={navRef}
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
      >
        <MenuCategories>
          {MENU_CATEGORIES.map(({ image, name }) => (
            <MenuCategoryItem key={name}>
              <Button type="button" variant="icon" size="large">
                <Image
                  src={`/images/${image}.png`}
                  width={40}
                  height={40}
                  priority
                />
              </Button>
              {name}
            </MenuCategoryItem>
          ))}
        </MenuCategories>
      </MenuNav>
    </Container>
  );
};

Menu.getLayout = function getLayout(page: ReactElement) {
  return <BreadcrumbLayout>{page}</BreadcrumbLayout>;
};

const Container = styled.div`
  margin-top: ${pixelToRem(-20)};
  overflow: visible;

  @media ${({ theme }) => theme.breakPoints.small} {
    padding: 0 16px;
  }
`;

const MenuNav = styled.nav`
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const MenuCategories = styled.ul`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: ${pixelToRem(20)};
  min-width: ${pixelToRem(480)};
  height: ${pixelToRem(124)};
  margin: 0;

  @media ${({ theme }) => theme.breakPoints.small} {
    justify-content: flex-start;
    gap: ${pixelToRem(12)};
  }
`;

const MenuCategoryItem = styled.li`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${pixelToRem(8)};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  transition: transform 0.2s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(${pixelToRem(-16)});

    button {
      border: 2px solid ${({ theme }) => theme.colors.blue};
    }
  }

  @media ${({ theme }) => theme.breakPoints.small} {
    font-size: ${({ theme }) => theme.fontSizes.xs};
  }
`;

export default Menu;
