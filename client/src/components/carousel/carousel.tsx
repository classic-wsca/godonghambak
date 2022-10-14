import type { MutableRefObject, PropsWithChildren, ReactElement } from 'react';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled, { css } from 'styled-components';
import { Button } from '~components/common';
import LeftArrowSVG from '~public/svgs/chevron-left.svg';
import RightArrowSVG from '~public/svgs/chevron-right.svg';

interface CarouselItemProps extends PropsWithChildren {
  width?: number;
  margin?: number;
}

export const CarouselItem = ({
  width,
  margin,
  children,
}: CarouselItemProps) => {
  return (
    <CarouselItemWrapper width={width} margin={margin}>
      {children}
    </CarouselItemWrapper>
  );
};

const CarouselItemWrapper = styled.div<CarouselItemProps>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: ${({ width }) => `${width}px`};
  height: 200px;
  margin: ${({ margin }) => `${margin}px`};
  background-color: ${({ theme }) => theme.colors.green};
  color: white;
`;

interface CarouselProps extends PropsWithChildren {
  width: number;
  margin: number;
}

const Carousel = ({ width, margin, children }: CarouselProps) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const originSlideCount = useRef(React.Children.count(children));

  const [currentIndex, setCurrentIndex] = useState(originSlideCount.current);
  const [slideWidth, setSlideWidth] = useState(width - margin * 2);
  const [paused, setPaused] = useState(false);

  const slideCount = useRef(originSlideCount.current);
  const translateDistance = useRef(slideWidth + margin * 2);
  const stopTimerRef: MutableRefObject<NodeJS.Timer | null> = useRef(null);
  const playTimerRef: MutableRefObject<NodeJS.Timer | null> = useRef(null);

  const switchSlideIndexWithoutAnimation = (slideIndex: number) => {
    stopTimerRef.current = setTimeout(() => {
      if (!trackRef.current) {
        return;
      }

      trackRef.current.style.transition = 'none';
      setCurrentIndex(slideIndex);
    }, 300);
  };

  const resetOriginAnimation = () => {
    playTimerRef.current = setTimeout(() => {
      if (!trackRef.current) {
        return;
      }

      trackRef.current.style.transition = 'transform 300ms';
    }, 400);
  };

  const movePrev = useCallback(() => {
    setCurrentIndex((prev) => prev - 1);

    if (currentIndex === originSlideCount.current - 1) {
      switchSlideIndexWithoutAnimation(slideCount.current - 2);
      resetOriginAnimation();
    }
  }, [currentIndex]);

  const moveNext = useCallback(() => {
    setCurrentIndex((prev) => prev + 1);

    if (currentIndex === slideCount.current - 2) {
      switchSlideIndexWithoutAnimation(originSlideCount.current - 1);
      resetOriginAnimation();
    }
  }, [currentIndex]);

  const updateIndex = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.currentTarget;
    setCurrentIndex(Number(target.value));
  };

  const handleMouseEnter = () => {
    setPaused(true);
  };

  const handleMouseLeave = () => {
    setPaused(false);
  };

  // const updateSlideWidth = () => {
  //   if (!carouselRef.current) {
  //     return;
  //   }

  //   setSlideWidth(carouselRef.current.offsetWidth - margin);
  // };

  // const setTrackInitialPosition = useCallback(() => {
  //   if (!trackRef.current || !carouselRef.current) {
  //     return;
  //   }

  //   console.dir(trackRef.current);
  //   const leftValue = trackRef.current.style.width - carouselRef.current.offsetWidth;
  //   console.log(translatedValue);
  //   trackRef.current.style.left = `-${leftValue}px`;
  //   trackRef.current.style.left = '50%';
  // }, [width]);

  const makeSlideClones = () => {
    if (!trackRef.current) {
      return;
    }

    const slides = [...trackRef.current.children];
    slides.forEach((slide) => {
      const cloneSlide = slide.cloneNode(true);
      trackRef.current?.appendChild(cloneSlide);
    });
    slides.reverse().forEach((slide) => {
      const cloneSlide = slide.cloneNode(true);
      trackRef.current?.prepend(cloneSlide);
    });
    slideCount.current = trackRef.current.children.length;
  };

  useEffect(() => {
    makeSlideClones();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!paused) {
        moveNext();
      }
    }, 1000);

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [paused, moveNext]);

  return (
    <Container
      ref={carouselRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Track ref={trackRef} distance={currentIndex * translateDistance.current}>
        {React.Children.map(children, (child) => {
          return React.cloneElement(
            child as ReactElement<PropsWithChildren<CarouselItemProps>>,
            {
              width: slideWidth,
              margin,
            },
          );
        })}
      </Track>
      <Indicators>
        <Button type="button" variant="icon" size="medium" onClick={movePrev}>
          <LeftArrowSVG />
        </Button>
        {React.Children.map(children, (child, index) => (
          <Indicator
            type="button"
            value={index}
            isCurrent={currentIndex % originSlideCount.current === index}
            onClick={updateIndex}
          >
            {index + 1}
          </Indicator>
        ))}
        <Button type="button" variant="icon" size="medium" onClick={moveNext}>
          <RightArrowSVG />
        </Button>
      </Indicators>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
`;

const Track = styled.div<{ distance: number }>`
  position: relative;
  margin: 0 auto;
  transform: ${({ distance }) => `translateX(-${distance}px)`};
  transition: transform 300ms;
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
