import type { ImageObject } from '~types/common';

import Image from 'next/image';
import styled from 'styled-components';

import { pixelToRem } from '~utils/style-utils';

interface CarouselItemProps extends ImageObject {
  width: number;
  height: number;
  margin: number;
  color: 'light' | 'dark';
}

const CarouselItem = ({
  width,
  height,
  margin,
  color,
  src,
  alt,
}: CarouselItemProps) => {
  return (
    <CarouselItemWrapper
      width={width}
      height={height}
      margin={margin}
      aria-label="slide"
    >
      <Image src={src} alt={alt} layout="fill" priority />
      <Description marginTop={height} color={color}>
        {alt}
      </Description>
    </CarouselItemWrapper>
  );
};

const CarouselItemWrapper = styled.li<
  Omit<CarouselItemProps, 'src' | 'alt' | 'color'>
>`
  position: relative;
  display: inline-block;
  width: ${({ width }) => pixelToRem(width)};
  height: ${({ height }) => pixelToRem(height)};
  margin: 0 ${({ margin }) => pixelToRem(margin)};
  user-select: none;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    pointer-events: none;
  }
`;

const Description = styled.p<{ marginTop: number; color: 'light' | 'dark' }>`
  margin-top: ${({ marginTop }) => pixelToRem(marginTop + 16)};
  font-size: ${({ theme }) => theme.fontSizes['3xl']};
  font-weight: 500;
  color: ${({ theme, color }) => theme.colors[color]};
  text-align: center;
`;

export default CarouselItem;
