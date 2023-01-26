import type { ReactElement } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { MenuCard } from '~components/card';
import { Button, Text } from '~components/common';
import { BreadcrumbLayout } from '~components/layout';
import { MENU_CATEGORIES, MENU_ITEMS } from '~constants/menu';
import { useDragScroll } from '~hooks/index';
import { pixelToRem } from '~utils/style-utils';

const Menu = () => {
  const { query } = useRouter();
  const [menuItems, setMenuItems] = useState({
    category: 'all',
    items: MENU_ITEMS,
  });
  const {
    ref: navRef,
    handleDragStart,
    handleDragEnd,
    handleDragMove,
  } = useDragScroll();

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    const clickedCategory = e.currentTarget.id;
    const newMenuItems =
      clickedCategory === 'all'
        ? MENU_ITEMS
        : MENU_ITEMS.filter(({ category }) => category === e.currentTarget.id);

    setMenuItems({ category: clickedCategory, items: newMenuItems });
  };

  useEffect(() => {
    const { category: categoryQuery } = query;
    const newMenuItems = categoryQuery
      ? MENU_ITEMS.filter(({ category }) => category === categoryQuery)
      : MENU_ITEMS;

    setMenuItems({
      category: (categoryQuery as string) || 'all',
      items: newMenuItems,
    });
  }, [query]);

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
          {MENU_CATEGORIES.map(({ name, image, category }) => (
            <MenuCategoryItem
              key={name}
              id={category}
              clicked={category === menuItems.category}
              onClick={handleClick}
            >
              <Button type="button" variant="icon" size="large">
                <Image src={image} width={40} height={40} priority />
              </Button>
              {name}
            </MenuCategoryItem>
          ))}
        </MenuCategories>
      </MenuNav>
      <MenuContent>
        <Text>
          총{' '}
          <Text as="b" color="orange">
            {menuItems.items.length}개의
          </Text>{' '}
          메뉴가 있습니다.
        </Text>
        {menuItems.items.length ? (
          <MenuList>
            {menuItems.items.map(({ id, name, description, price, image }) => (
              <li key={id}>
                <MenuCard
                  name={name}
                  description={description}
                  price={price}
                  image={image}
                />
              </li>
            ))}
          </MenuList>
        ) : (
          <Blank>준비 중입니다.</Blank>
        )}
      </MenuContent>
    </Container>
  );
};

Menu.getLayout = function getLayout(page: ReactElement) {
  return <BreadcrumbLayout>{page}</BreadcrumbLayout>;
};

const Container = styled.div`
  max-width: ${pixelToRem(1440)};
  margin: 0 auto;
  margin-top: ${pixelToRem(-20)};

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

const MenuCategoryItem = styled.li<{ clicked: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${pixelToRem(8)};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  transition: transform 0.2s ease;
  cursor: pointer;

  button {
    border: ${({ theme, clicked }) =>
      clicked && `2px solid ${theme.colors.blue}`};
  }

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

const MenuContent = styled.div`
  padding: ${pixelToRem(40)} ${pixelToRem(200)};
  text-align: center;

  @media ${({ theme }) => theme.breakPoints.extraLarge} {
    padding: ${pixelToRem(40)} 5%;
  }
`;

const MenuList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(auto, 240px));
  justify-content: center;
  gap: ${pixelToRem(40)};
  width: 100%;
  margin: 0;
  margin-top: ${pixelToRem(40)};
`;

const Blank = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: ${pixelToRem(200)};
  margin-top: ${pixelToRem(40)};
  border: 2px solid ${({ theme }) => theme.colors.gray};
  border-radius: ${pixelToRem(10)};
  color: ${({ theme }) => theme.colors.gray};
  font-size: ${({ theme }) => theme.fontSizes['4xl']};
`;

export default Menu;
