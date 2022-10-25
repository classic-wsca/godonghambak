import { PropsWithChildren, useEffect, useState } from 'react';

import styled, {
  DefaultTheme,
  ThemeProps,
  FlattenInterpolation,
} from 'styled-components';
import { pixelToRem } from '~utils/style-utils';

export interface CarouselItemProps extends PropsWithChildren {
  id?: string;
  width?: number;
  margin?: number;
  label?: string;
  currentIndex?: number;
  slideCount?: number;
  className?: string; // 스타일 오버라이딩을 위해
  activeStyle?: FlattenInterpolation<ThemeProps<DefaultTheme>>;
}

const CarouselItem = ({
  id,
  width,
  margin,
  label,
  currentIndex,
  slideCount,
  className, // 스타일 오버라이딩을 위해
  activeStyle, // active 슬라이드 스타일
  children,
}: CarouselItemProps) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (currentIndex === undefined || slideCount === undefined) {
      return;
    }

    const currentId = Number(id?.slice(-2)) - 9;

    if (currentId === (currentIndex % slideCount) + 1) {
      setIsActive(true);
      return;
    }

    setIsActive(false);
  }, [id, currentIndex, slideCount]);

  return (
    <CarouselItemWrapper
      id={id}
      className={className}
      width={width}
      margin={margin}
      isActive={isActive}
      activeStyle={activeStyle}
      role="tabpanel"
      aria-roledescription="slide"
      aria-label={label}
    >
      {children}
    </CarouselItemWrapper>
  );
};

const CarouselItemWrapper = styled.li<
  CarouselItemProps & {
    isActive: boolean;
  }
>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: ${({ width }) => `${width}px`};
  height: 100%;
  min-height: ${pixelToRem(200)};
  margin: ${({ margin }) => `0 ${margin}px`};
  user-select: none;

  ${({ isActive, activeStyle }) => isActive && activeStyle};
`;

export default CarouselItem;
