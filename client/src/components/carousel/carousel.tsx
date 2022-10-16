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

import LeftArrowSVG from '~public/svgs/chevron-left.svg';
import RightArrowSVG from '~public/svgs/chevron-right.svg';
import { Button } from '~components/common';

import { useInterval } from '~hooks/index';
import { pixelToRem } from '~utils/style-utils';

interface CarouselProps extends PropsWithChildren {
  width?: number;
  margin?: number;
  duration?: number;
  autoplay?: boolean;
  autoplayInterval?: number;
  autoplayReverse?: boolean;
}

const Carousel = ({
  width,
  margin = 0,
  duration = 300,
  autoplay = true,
  autoplayInterval = 4000,
  autoplayReverse = false,
  children,
}: CarouselProps) => {
  const slideCount = useMemo(() => React.Children.count(children), [children]); // prettier-ignore
  const [currentIndex, setCurrentIndex] = useState(slideCount);
  const [slideWidth, setSlideWidth] = useState(width || window.innerWidth - margin * 2); // prettier-ignore
  const [initialPosition, setInitialPosition] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [paused, setPaused] = useState(false);

  const carouselRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const trackAnimationRef = useRef(true);
  const startX = useRef<number>(0);
  const draggedDistance = useRef<number>(0);
  const slideWidthWithMargin = slideWidth + margin * 2;

  const moveSlideWithoutAnimation = useCallback(
    (targetSlideIndex: number) => {
      setTimeout(() => {
        trackAnimationRef.current = false;
        setCurrentIndex(targetSlideIndex);
      }, duration);
      setTimeout(() => {
        trackAnimationRef.current = true;
      }, duration + 100);
    },
    [duration],
  );

  const movePrev = useCallback(() => {
    setCurrentIndex((prev) => prev - 1);

    if (currentIndex === slideCount) {
      moveSlideWithoutAnimation(slideCount * 2 - 1);
    }
  }, [currentIndex, slideCount, moveSlideWithoutAnimation]);

  const moveNext = useCallback(() => {
    setCurrentIndex((prev) => prev + 1);

    if (currentIndex === slideCount * 2 - 1) {
      moveSlideWithoutAnimation(slideCount);
    }
  }, [currentIndex, slideCount, moveSlideWithoutAnimation]);

  const moveClickedSlide = (e: React.MouseEvent<HTMLButtonElement>) => {
    const targetSlideIndex = Number(e.currentTarget.value);
    setCurrentIndex(targetSlideIndex);
  };

  const makeSlideClone = useCallback(() => {
    const arrayChildren = React.Children.toArray(children);
    const slides = [...arrayChildren, ...arrayChildren, ...arrayChildren];

    return slides;
  }, [children]);

  const setTrackInitialPosition = useCallback(() => {
    if (!carouselRef.current || !width) {
      return;
    }

    const distance = carouselRef.current.offsetWidth / 2 - slideWidth / 2;
    setInitialPosition(distance);
  }, [width, slideWidth]);

  const updateSlideWidth = useCallback(() => {
    // 사용자 지정 width가 있을 경우 slideWidth의 크기 변경 필요 없음, 중앙 정렬만 해주고 return
    if (width) {
      setTrackInitialPosition();
      return;
    }

    if (!carouselRef.current) {
      return;
    }

    const newSlideWidth = carouselRef.current.offsetWidth - margin * 2;
    setSlideWidth(newSlideWidth);

    // 브라우저 크기 변경 중 animation 제거
    trackAnimationRef.current = false;
    setTimeout(() => {
      trackAnimationRef.current = true;
    }, 100);
  }, [width, margin, setTrackInitialPosition]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!carouselRef.current || !trackRef.current) {
      return;
    }

    setIsDragging(true);
    startX.current = e.pageX;
  };

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isDragging || !trackRef.current) {
        return;
      }

      const currentX = e.pageX;
      const originalTrackPosition =
        slideWidthWithMargin * currentIndex - initialPosition;
      draggedDistance.current = currentX - startX.current;
      const translateValue = draggedDistance.current - originalTrackPosition;

      trackRef.current.style.transform = `translateX(${
        translateValue - initialPosition
      }px)`;
    },
    [currentIndex, initialPosition, isDragging, slideWidthWithMargin],
  );

  const handleMouseUp = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!trackRef.current) {
        return;
      }

      e.preventDefault();
      setIsDragging(false);

      const draggedSlideCount = draggedDistance.current / slideWidthWithMargin;
      const isOverThreshold = Math.abs(draggedSlideCount % 1) > 0.4;

      let movedSlideCount = Math.floor(Math.abs(draggedSlideCount));
      movedSlideCount = isOverThreshold ? movedSlideCount + 1 : movedSlideCount;
      movedSlideCount *= draggedSlideCount > 0 ? -1 : 1;

      setCurrentIndex((prev) => prev + movedSlideCount);

      const modularValue = Math.abs(movedSlideCount) % slideCount;
      const slideCountToMove = modularValue === 0 ? 2 : modularValue - 1;

      if (
        draggedSlideCount < 0 &&
        currentIndex + Math.abs(movedSlideCount) > slideCount * 2 - 1
      ) {
        const targetSlideIndex = slideCount + slideCountToMove;
        moveSlideWithoutAnimation(targetSlideIndex);
      }

      if (
        draggedSlideCount > 0 &&
        currentIndex - Math.abs(movedSlideCount) < slideCount
      ) {
        const targetSlideIndex = slideCount * 2 - slideCountToMove - 1;
        moveSlideWithoutAnimation(targetSlideIndex);
      }

      startX.current = 0;
      draggedDistance.current = 0;
      trackRef.current.style.transform = '';
    },
    [slideWidthWithMargin, currentIndex, slideCount, moveSlideWithoutAnimation],
  );

  const handleMouseEnter = () => {
    setPaused(true);
  };

  const handleMouseLeave = () => {
    setPaused(false);
  };

  useEffect(() => {
    setTrackInitialPosition();
  }, [setTrackInitialPosition]);

  useEffect(() => {
    window.addEventListener('resize', updateSlideWidth);

    return () => window.removeEventListener('resize', updateSlideWidth);
  }, [updateSlideWidth]);

  useInterval(() => {
    if (paused || !autoplay) {
      return;
    }

    if (autoplayReverse) {
      movePrev();
    } else {
      moveNext();
    }
  }, autoplayInterval);

  return (
    <CarouselContainer
      ref={carouselRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Track
        ref={trackRef}
        width={slideWidthWithMargin * slideCount * 3}
        distance={slideWidthWithMargin * currentIndex}
        initialPosition={initialPosition}
        trackAnimation={trackAnimationRef.current}
        duration={duration}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
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
        {React.Children.map(children, (_, index) => (
          <Indicator
            type="button"
            value={index}
            isCurrent={currentIndex % slideCount === index}
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

const Track = styled.div<{
  width: number;
  distance: number;
  initialPosition: number;
  trackAnimation: boolean;
  duration: number;
}>`
  position: relative;
  width: ${({ width }) => pixelToRem(width)};
  // left 값으로 초기 포지션을 조절해줘야 슬라이드가 두개 일때도 밀리지 않고 제대로 이동 가능
  left: ${({ initialPosition }) => pixelToRem(initialPosition)};
  transform: ${({ distance }) => `translateX(-${pixelToRem(distance)})`};
  transition: ${({ trackAnimation, duration }) =>
    trackAnimation ? `transform ${duration}ms` : 'none'};
  white-space: nowrap;
`;

const Indicators = styled.div`
  display: flex;
  justify-content: center;

  button {
    margin: ${pixelToRem(5)};
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
