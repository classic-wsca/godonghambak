/* eslint-disable react/no-array-index-key */
import type { CarouselItemProps } from './carousel-item';
import type { PropsWithChildren, ReactElement } from 'react';
import type { MouseAndTouchEvent } from '~types/event';

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from 'react';
import styled from 'styled-components';

import { Button } from '~components/common';
import { useInterval } from '~hooks/index';
import LeftArrowSVG from '~public/svgs/chevron-left.svg';
import RightArrowSVG from '~public/svgs/chevron-right.svg';
import { pixelToRem } from '~utils/style-utils';

export interface CarouselProps extends PropsWithChildren {
  className?: string;
  width?: number;
  margin?: number;
  duration?: number;
  draggable?: boolean;
  autoplay?: boolean;
  autoplayInterval?: number;
  autoplayReverse?: boolean;
  button?: boolean;
  indicator?: boolean;
}

const Carousel = ({
  className, // 스타일 오버라이딩을 위해
  width, // slideWidth
  margin = 130, // slide 사이 여백
  duration = 300, // animation duration
  draggable = true, // 드래그 가능 여부
  autoplay = true, // autoSlide 기능 여부
  autoplayInterval = 4000, // autoSlide 시간
  autoplayReverse = false, // autoSlide 방향, default 오른쪽
  button = true, // button 여부
  indicator = true, // indicator 여부
  children,
}: CarouselProps) => {
  const slideCount = useMemo(() => React.Children.count(children), [children]); // prettier-ignore
  const [currentIndex, setCurrentIndex] = useState(slideCount);
  const [slideWidth, setSlideWidth] = useState(0);
  const [initialPosition, setInitialPosition] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [paused, setPaused] = useState(false);

  const carouselRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const trackAnimationRef = useRef(true);
  const startX = useRef<number>(0);
  const draggedDistance = useRef<number>(0);
  const slideWidthWithMargin = slideWidth + margin * 2;

  const makeSlideClone = useCallback(() => {
    const arrayChildren = React.Children.toArray(children);
    const slides = [...arrayChildren, ...arrayChildren, ...arrayChildren];

    return slides;
  }, [children]);

  const setTrackInitialPosition = useCallback(() => {
    if (!carouselRef.current) {
      return;
    }

    const distance =
      carouselRef.current.offsetWidth / 2 - slideWidth / 2 - margin;

    setInitialPosition(distance);
  }, [margin, slideWidth]);

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

  const movePrev = useCallback(
    (e?: MouseAndTouchEvent<HTMLButtonElement>) => {
      if (e && 'touches' in e) {
        e.preventDefault();
      }

      setCurrentIndex((prev) => prev - 1);

      if (currentIndex === slideCount) {
        moveSlideWithoutAnimation(slideCount * 2 - 1);
      }
    },
    [currentIndex, slideCount, moveSlideWithoutAnimation],
  );

  const moveNext = useCallback(
    (e?: MouseAndTouchEvent<HTMLButtonElement>) => {
      if (e && 'touches' in e) {
        e.preventDefault();
      }

      setCurrentIndex((prev) => prev + 1);

      if (currentIndex === slideCount * 2 - 1) {
        moveSlideWithoutAnimation(slideCount);
      }
    },
    [currentIndex, slideCount, moveSlideWithoutAnimation],
  );

  const moveClickedSlide = (e: React.MouseEvent<HTMLButtonElement>) => {
    const targetSlideIndex = Number(e.currentTarget.value);
    setCurrentIndex(targetSlideIndex);
  };

  const handleDragStart = (e: MouseAndTouchEvent<HTMLUListElement>) => {
    if (!draggable) {
      return;
    }

    setIsDragging(true);

    startX.current = 'touches' in e ? e.changedTouches[0].pageX : e.pageX;
  };

  const handleDragMove = useCallback(
    (e: MouseAndTouchEvent<HTMLUListElement>) => {
      if (!isDragging || !trackRef.current || !draggable) {
        return;
      }

      const currentX = 'touches' in e ? e.changedTouches[0].pageX : e.pageX;
      const originalTrackPosition =
        slideWidthWithMargin * currentIndex - initialPosition;
      draggedDistance.current = currentX - startX.current;
      const translateValue = draggedDistance.current - originalTrackPosition;

      trackRef.current.style.transform = `translateX(${
        translateValue - initialPosition
      }px)`;
    },
    [
      slideWidthWithMargin,
      currentIndex,
      initialPosition,
      isDragging,
      draggable,
    ],
  );

  const handleDragEnd = useCallback(
    (e: MouseAndTouchEvent<HTMLUListElement>) => {
      if (!trackRef.current || !draggable) {
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
      const isDragToLeft =
        draggedSlideCount < 0 &&
        currentIndex + Math.abs(movedSlideCount) > slideCount * 2 - 1;
      const isDragToRight =
        draggedSlideCount > 0 &&
        currentIndex - Math.abs(movedSlideCount) < slideCount;

      if (isDragToLeft) {
        const targetSlideIndex = slideCount + slideCountToMove;
        moveSlideWithoutAnimation(targetSlideIndex);
      }

      if (isDragToRight) {
        const targetSlideIndex = slideCount * 2 - slideCountToMove - 1;
        moveSlideWithoutAnimation(targetSlideIndex);
      }

      startX.current = 0;
      draggedDistance.current = 0;
      trackRef.current.style.transform = '';
    },
    [
      slideWidthWithMargin,
      currentIndex,
      slideCount,
      moveSlideWithoutAnimation,
      draggable,
    ],
  );

  const handleFocus = () => {
    setPaused(true);
  };

  const handleBlur = () => {
    setPaused(false);
  };

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent): void => {
      if (!carouselRef.current) {
        return;
      }

      if (e.key === 'ArrowLeft') {
        movePrev();
      } else if (e.key === 'ArrowRight') {
        moveNext();
      }
    },
    [movePrev, moveNext],
  );

  useEffect(() => {
    if (!carouselRef.current) {
      return;
    }

    setSlideWidth(width || carouselRef.current.offsetWidth - margin * 2);
  }, [carouselRef, width, margin]);

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
    <CarouselWrapper
      ref={carouselRef}
      className={className}
      onMouseEnter={handleFocus}
      onTouchStart={handleFocus}
      onMouseLeave={handleBlur}
      onTouchEnd={handleBlur}
      onKeyDown={handleKeyDown}
      onFocus={handleFocus}
      onBlur={handleBlur}
      role="region"
      aria-roledescription="carousel"
      tabIndex={0} // 마크업 순서에 따라 초점을 가질 수 있도록
    >
      <Track
        ref={trackRef}
        width={slideWidthWithMargin * slideCount * 3}
        distance={slideWidthWithMargin * currentIndex}
        initialPosition={initialPosition}
        trackAnimation={trackAnimationRef.current}
        duration={duration}
        onMouseDown={handleDragStart}
        onTouchStart={handleDragStart}
        onMouseMove={handleDragMove}
        onTouchMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onTouchEnd={handleDragEnd}
        onMouseLeave={handleDragEnd}
        aria-label="slides"
        aria-live={paused ? 'polite' : 'off'}
      >
        {React.Children.map(makeSlideClone(), (child, index) =>
          React.cloneElement(
            child as ReactElement<PropsWithChildren<CarouselItemProps>>,
            {
              key: index,
              id: `carousel-item-${index + 1}`,
              width: slideWidth,
              margin,
              label: `${(index % slideCount) + 1} of ${slideCount}`,
              currentIndex,
              slideCount,
            },
          ),
        )}
      </Track>
      {button && (
        <>
          <LeftButton
            type="button"
            variant="icon"
            size="medium"
            topValue={trackRef.current ? trackRef.current.offsetHeight / 2 : 0}
            leftValue={margin - 100}
            onClick={movePrev}
            onTouchEnd={movePrev}
            aria-label="prev-button"
          >
            <LeftArrowSVG />
          </LeftButton>
          <RightButton
            type="button"
            variant="icon"
            size="medium"
            topValue={trackRef.current ? trackRef.current.offsetHeight / 2 : 0}
            rightValue={margin - 100}
            onClick={moveNext}
            onTouchEnd={moveNext}
            aria-label="next-button"
          >
            <RightArrowSVG />
          </RightButton>
        </>
      )}
      {indicator && (
        <Indicators role="tablist" aria-label="slides">
          {React.Children.map(children, (_, index) => (
            <Indicator
              id={`carousel-tab-${index}`}
              type="button"
              value={index}
              isCurrent={index === currentIndex % slideCount}
              onClick={moveClickedSlide}
              role="tab"
              aria-label={`slide ${index}`}
              aria-selected={
                index === currentIndex % slideCount ? 'true' : 'false'
              }
              aria-controls={`carousel-item-${index}`}
              data-slide={`slide ${index}`}
            />
          ))}
        </Indicators>
      )}
    </CarouselWrapper>
  );
};

const CarouselWrapper = styled.section`
  position: relative;
  width: 100%;
  max-width: ${pixelToRem(1440)};
  margin: 0 auto;
  overflow: hidden;
`;

const Track = styled.ul<{
  width: number;
  distance: number;
  initialPosition: number;
  trackAnimation: boolean;
  duration: number;
}>`
  position: relative;
  // left 값으로 초기 포지션을 조절해줘야 슬라이드가 두개 일때도 밀리지 않고 제대로 이동 가능
  left: ${({ initialPosition }) => pixelToRem(initialPosition)};
  width: ${({ width }) => pixelToRem(width)};
  height: 100%;
  margin-block-start: 0;
  margin-block-end: 0;
  padding-inline-start: 0;
  transform: ${({ distance }) => `translateX(-${pixelToRem(distance)})`};
  transition: ${({ trackAnimation, duration }) =>
    trackAnimation ? `transform ${duration}ms` : 'none'};
  white-space: nowrap;
`;

const Indicators = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${pixelToRem(30)};
  z-index: 1000;

  button {
    margin: 0 ${pixelToRem(8)};
  }

  @media ${({ theme }) => theme.breakPoints.extraLarge} {
    position: absolute;
    left: 50%;
    bottom: ${pixelToRem(30)};
    transform: translateX(-50%);
  } ;
`;

const Indicator = styled.button<{ isCurrent: boolean }>`
  width: ${pixelToRem(12)};
  height: ${pixelToRem(12)};
  border-radius: 50%;
  background-color: ${({ theme, isCurrent }) =>
    isCurrent ? theme.colors.green : theme.colors.gray};

  @media ${({ theme }) => theme.breakPoints.large} {
    width: ${pixelToRem(10)};
    height: ${pixelToRem(10)};
  }
`;

const LeftButton = styled(Button)<{ topValue: number; leftValue: number }>`
  position: absolute;
  top: ${({ topValue }) => pixelToRem(topValue)};
  left: ${({ leftValue }) => pixelToRem(leftValue)};
  transform: translateY(-50%);

  @media ${({ theme }) => theme.breakPoints.extraLarge} {
    display: none;
  } ;
`;

const RightButton = styled(Button)<{ topValue: number; rightValue: number }>`
  position: absolute;
  top: ${({ topValue }) => pixelToRem(topValue)};
  right: ${({ rightValue }) => pixelToRem(rightValue)};
  transform: translateY(-50%);

  @media ${({ theme }) => theme.breakPoints.extraLarge} {
    display: none;
  } ;
`;

export default Carousel;
