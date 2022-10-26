/* eslint-disable react/no-array-index-key */
import type { ImageObject } from '~types/common';
import type { AnimationOption, SlideInAnimation } from '~types/animation';

import styled from 'styled-components';
import CarouselItem from './character-carousel-item';

import { pixelToRem } from '~utils/style-utils';
import { slideInAnimation } from '~styles/animation';

interface CarouselTrackProps extends Partial<Omit<AnimationOption, 'name'>> {
  items: ImageObject[];
  width: number;
  height: number;
  margin: number;
  color: 'light' | 'dark';
}

const CarouselTrack = ({
  items,
  width,
  height,
  margin,
  color,
  duration,
  timingFunction = 'linear',
  iterationCount = 'infinite',
  ...rest
}: CarouselTrackProps) => {
  return (
    <CarouselTrackWrapper
      width={(width + margin * 2) * items.length}
      translateValue={(width + margin * 2) * items.length}
      duration={duration}
      timingFunction={timingFunction}
      iterationCount={iterationCount}
      aria-label="slides"
      {...rest}
    >
      {items.map(({ src, alt }, index) => (
        <CarouselItem
          key={`${alt}-${index}`}
          src={src}
          alt={alt}
          width={width}
          height={height}
          margin={margin}
          color={color}
        />
      ))}
    </CarouselTrackWrapper>
  );
};

const CarouselTrackWrapper = styled.ul<{ width: number } & SlideInAnimation>`
  position: absolute;
  width: ${({ width }) => pixelToRem(width)};
  margin-block-start: 0;
  margin-block-end: 0;
  padding-inline-start: 0;

  ${slideInAnimation};
`;

export default CarouselTrack;
