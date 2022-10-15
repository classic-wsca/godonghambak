/* eslint-disable react/no-array-index-key */
import type { PropsWithChildren, ReactElement } from 'react';
import type { CarouselItemProps } from './carousel-item';

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from 'react';

import styled, { css } from 'styled-components';

import { Button } from '~components/common';
import LeftArrowSVG from '~public/svgs/chevron-left.svg';
import RightArrowSVG from '~public/svgs/chevron-right.svg';

interface CarouselProps extends PropsWithChildren {
  margin: number;
  duration: number;
}

const Carousel = ({ margin, duration, children }: CarouselProps) => {
  const originalSlideCount = useMemo(() => React.Children.count(children), [children]); // prettier-ignore
  const [currentIndex, setCurrentIndex] = useState(originalSlideCount);
  const [slideWidth, setSlideWidth] = useState(window.innerWidth - margin * 2);

  const carouselRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const trackAnimation = useRef(true);
  const slideCount = originalSlideCount * 3;
  const slideWidthWithMargin = slideWidth + margin * 2;
  const trackWidth = slideWidthWithMargin * slideCount;

  const makeSlideClone = useCallback(() => {
    const arrayChildren = React.Children.toArray(children);
    const slides = [...arrayChildren, ...arrayChildren, ...arrayChildren];

    return slides;
  }, [children]);

  const moveSlideWithoutAnimation = useCallback(
    (targetSlideIndex: number) => {
      setTimeout(() => {
        trackAnimation.current = false;
        setCurrentIndex(targetSlideIndex);
      }, duration);
      setTimeout(() => {
        trackAnimation.current = true;
      }, duration + 100);
    },
    [duration],
  );

  const movePrev = useCallback(() => {
    setCurrentIndex((prev) => prev - 1);

    if (currentIndex === originalSlideCount - 1) {
      moveSlideWithoutAnimation(slideCount - 2);
    }
  }, [currentIndex, originalSlideCount, slideCount, moveSlideWithoutAnimation]);

  const moveNext = useCallback(() => {
    setCurrentIndex((prev) => prev + 1);

    if (currentIndex === slideCount - 2) {
      moveSlideWithoutAnimation(originalSlideCount - 1);
    }
  }, [currentIndex, originalSlideCount, slideCount, moveSlideWithoutAnimation]);

  const moveClickedSlide = (e: React.MouseEvent<HTMLButtonElement>) => {
    const targetSlideIndex = Number(e.currentTarget.value);
    setCurrentIndex(targetSlideIndex);
  };

  const updateWidth = useCallback(() => {
    if (!carouselRef.current) {
      return;
    }

    const newSlideWidth = carouselRef.current.offsetWidth - margin * 2;
    setSlideWidth(newSlideWidth);

    trackAnimation.current = false;
    setTimeout(() => {
      trackAnimation.current = true;
    }, 100);
  }, [margin]);

  useEffect(() => {
    window.addEventListener('resize', updateWidth);

    return () => window.removeEventListener('resize', updateWidth);
  }, [updateWidth]);

  return (
    <CarouselContainer ref={carouselRef}>
      <Track
        ref={trackRef}
        width={trackWidth}
        distance={currentIndex * slideWidthWithMargin}
        trackAnimation={trackAnimation.current}
        duration={duration}
      >
        {React.Children.map(makeSlideClone(), (child, index) =>
          React.cloneElement(
            child as ReactElement<PropsWithChildren<CarouselItemProps>>,
            {
              key: index,
              width: slideWidth,
              margin,
            },
          ),
        )}
      </Track>
      <Indicators>
        <Button type="button" variant="icon" size="medium" onClick={movePrev}>
          <LeftArrowSVG />
        </Button>
        {React.Children.map(children, (child, index) => (
          <Indicator
            type="button"
            value={index}
            isCurrent={currentIndex % originalSlideCount === index}
            onClick={moveClickedSlide}
          >
            {index + 1}
          </Indicator>
        ))}
        <Button type="button" variant="icon" size="medium" onClick={moveNext}>
          <RightArrowSVG />
        </Button>
      </Indicators>
    </CarouselContainer>
  );
};

const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
`;

// prettier-ignore
const Track = styled.div<{ width: number; distance: number; trackAnimation: boolean; duration: number }>` 
  position: relative;
  width: ${({ width }) => `${width}px`};
  transform: ${({ distance }) => `translateX(-${distance}px)`};
  transition: ${({ trackAnimation, duration }) =>
    trackAnimation ? `transform ${duration}ms` : 'none'};
  white-space: nowrap;
`;

const Indicators = styled.div`
  display: flex;
  justify-content: center;

  button {
    margin: 5px;
  }
`;

const Indicator = styled.button<{ isCurrent: boolean }>`
  ${({ theme, isCurrent }) =>
    isCurrent &&
    css`
      background-color: ${theme.colors.green};
      color: white;
    `}
`;

export default Carousel;
