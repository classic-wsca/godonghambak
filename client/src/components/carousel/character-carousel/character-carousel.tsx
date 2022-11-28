/* eslint-disable react/no-array-index-key */
import type { ImageObject, Dimension } from '~types/common';
import type { AnimationOption } from '~types/animation';

import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

import CarouselTrack from './charater-carousel-track';

import { useWindowSize } from '~hooks/index';
import { pixelToRem } from '~utils/style-utils';

interface CharacterCarouselProps
  extends Partial<Omit<AnimationOption, 'name'>> {
  images: ImageObject[];
  imageSize: Dimension;
  margin?: number;
  color?: 'light' | 'dark';
}

const CharacterCarousel = ({
  images,
  imageSize,
  margin = 0,
  color = 'light',
  duration = 12,
  ...rest
}: CharacterCarouselProps) => {
  const [items, setItems] = useState<ImageObject[]>([]);
  const [itemSize, setItemSize] = useState(imageSize);
  const [itemMargin, setItemMargin] = useState(margin);
  const [animationDuration, setAnimationDuration] = useState(duration);
  const { width: screenWidth } = useWindowSize();

  const makeClones = useCallback(() => {
    if (!screenWidth || !images.length) {
      return;
    }

    const itemWidth = itemSize.width + itemMargin * 2;
    const totalItemsWidth = itemWidth * images.length;
    const valueToMultiply = Math.ceil(screenWidth / totalItemsWidth);
    const newItems: ImageObject[] = [].concat(
      ...Array(valueToMultiply).fill(images),
    );

    setItems(newItems);
  }, [screenWidth, images, itemSize, itemMargin]);

  const handleItemSize = useCallback(() => {
    if (!screenWidth) {
      return;
    }

    if (screenWidth > 768) {
      setItemSize(imageSize);
      return;
    }

    setItemSize({
      width: imageSize.width * 0.7,
      height: imageSize.height * 0.7,
    });
  }, [imageSize, screenWidth]);

  const handleItemMargin = useCallback(() => {
    if (!screenWidth) {
      return;
    }

    if (screenWidth > 768) {
      setItemMargin(margin);
      return;
    }

    setItemMargin(margin * 0.7);
  }, [margin, screenWidth]);

  const handleAnimationDuration = useCallback(() => {
    if (!screenWidth) {
      return;
    }

    if (screenWidth > 768) {
      setAnimationDuration(duration);
      return;
    }

    if (screenWidth > 505) {
      setAnimationDuration(duration * 0.7);
      return;
    }

    setAnimationDuration(duration * 0.4);
  }, [duration, screenWidth]);

  useEffect(() => {
    makeClones();
  }, [makeClones]);

  useEffect(() => {
    handleItemSize();
    handleItemMargin();
    handleAnimationDuration();
  }, [handleAnimationDuration, handleItemMargin, handleItemSize]);

  return (
    <CarouselWrapper
      width={(itemSize.width + itemMargin * 2) * items.length}
      role="region"
      aria-roledescription="character-carousel"
    >
      <CarouselTrack
        items={items}
        width={itemSize.width}
        height={itemSize.height}
        margin={itemMargin}
        color={color}
        duration={animationDuration}
        {...rest}
      />
      <CarouselTrack
        items={items}
        width={itemSize.width}
        height={itemSize.height}
        margin={itemMargin}
        color={color}
        duration={animationDuration}
        {...rest}
      />
    </CarouselWrapper>
  );
};

const CarouselWrapper = styled.div<{ width: number }>`
  position: relative;
  width: ${({ width }) => pixelToRem(width)};
  max-width: ${pixelToRem(1440)};
  height: ${pixelToRem(200)};
  margin: 0 auto;
  overflow: hidden;

  & > ul:last-child {
    left: ${({ width }) => pixelToRem(width)};
  }

  @media ${({ theme }) => theme.breakPoints.large} {
    height: ${pixelToRem(180)};
  }

  @media ${({ theme }) => theme.breakPoints.medium} {
    height: ${pixelToRem(140)};
  }
`;

export default CharacterCarousel;
