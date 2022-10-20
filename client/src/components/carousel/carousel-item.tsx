import type { PropsWithChildren } from 'react';

import styled from 'styled-components';
import { pixelToRem } from '~utils/style-utils';

export interface CarouselItemProps extends PropsWithChildren {
  id?: string;
  width?: number;
  margin?: number;
  label?: string;
}

const CarouselItem = ({
  id,
  width,
  margin,
  label,
  children,
}: CarouselItemProps) => {
  return (
    <CarouselItemWrapper
      id={id}
      width={width}
      margin={margin}
      role="tabpanel"
      aria-roledescription="slide"
      aria-label={label}
    >
      {children}
    </CarouselItemWrapper>
  );
};

const CarouselItemWrapper = styled.li<CarouselItemProps>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: ${({ width }) => `${width}px`};
  height: 100%;
  min-height: ${pixelToRem(200)};
  margin: ${({ margin }) => `0 ${margin}px`};
  user-select: none;
  background-color: green;
`;

export default CarouselItem;
