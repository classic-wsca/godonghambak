import type { CarouselProps } from '~components/common/carousel/carousel';

import userEvent from '@testing-library/user-event';
import React from 'react';

import { Carousel, CarouselItem } from '~components/common';

import { render, screen, act, fireEvent, cleanup } from '../../test-utils';

interface TestProps extends CarouselProps {
  items?: string[];
}

const TestComponent = ({ items, ...rest }: TestProps) => {
  return (
    <Carousel {...rest}>
      {items?.map((item) => (
        <CarouselItem key={item}>{item}</CarouselItem>
      ))}
    </Carousel>
  );
};

const setup = ({
  items = ['Item 1', 'Item 2', 'Item 3'],
  ...rest
}: TestProps) => {
  const user = userEvent.setup();
  const utils = render(<TestComponent items={items} {...rest} />);
  const carousel = screen.getByRole('region');
  const track = screen.getByRole('list', { name: /slides/i });
  const slides = screen.getAllByRole('tabpanel', { name: /\d of \d/i });
  const prevButton = screen.getByRole('button', { name: /prev-button/i });
  const nextButton = screen.getByRole('button', { name: /next-button/i });
  const indicators = screen.getAllByRole('tab', { name: /slide/i });

  return {
    user,
    carousel,
    track,
    slides,
    prevButton,
    nextButton,
    indicators,
    ...utils,
  };
};

describe('Carousel 컴포넌트 테스트', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.spyOn(global, 'setTimeout');
    jest.spyOn(global, 'setInterval');
  });

  afterEach(() => {
    jest.useRealTimers();
    cleanup();
  });

  it('should be rendered correctly', () => {
    const { carousel, track, slides, prevButton, nextButton, indicators } =
      setup({});

    expect(carousel).toBeInTheDocument();
    expect(track).toBeInTheDocument();
    slides.forEach((slide) => expect(slide).toBeInTheDocument());
    expect(prevButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
    indicators.forEach((indicator) => expect(indicator).toBeInTheDocument());
  });

  it('should have three times the number of slides received', () => {
    const { slides: fiveSlides } = setup({
      items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'],
    });

    expect(fiveSlides.length).toBe(15);
  });

  it('should set track width currectly', async () => {
    const SLIDE_WIDTH = 400;
    const SLIDE_COUNTS = 3;
    const DEFAULT_MARGIN = 130;

    const { track } = setup({ width: SLIDE_WIDTH });
    const trackWidth = (SLIDE_WIDTH + DEFAULT_MARGIN * 2) * SLIDE_COUNTS * 3;

    expect(track).toHaveAttribute('width', trackWidth.toString());
  });

  it('should remove and redefinition transition of track using setTimeout', () => {
    const initialCalledTimes = 2;
    setup({});

    act(() => {
      window.dispatchEvent(new Event('resize'));
      jest.advanceTimersByTime(100);
    });

    expect(setTimeout).toHaveBeenCalledTimes(initialCalledTimes + 1);
  });

  it('should move slide without animation using setTimeout', async () => {
    const initialCalledTimes = 2;
    const { prevButton, nextButton } = setup({});
    const clickButton = (button: HTMLElement) => {
      fireEvent.click(button);
      act(() => {
        jest.advanceTimersByTime(500);
      });
    };

    clickButton(nextButton);
    expect(setTimeout).toHaveBeenCalledTimes(initialCalledTimes + 0);

    clickButton(nextButton);
    clickButton(nextButton);
    expect(setTimeout).toHaveBeenCalledTimes(initialCalledTimes + 2);

    clickButton(prevButton);
    expect(setTimeout).toHaveBeenCalledTimes(initialCalledTimes + 4);

    clickButton(prevButton);
    clickButton(prevButton);
    clickButton(prevButton);
    expect(setTimeout).toHaveBeenCalledTimes(initialCalledTimes + 6);

    clickButton(nextButton);
    expect(setTimeout).toHaveBeenCalledTimes(initialCalledTimes + 8);
  });

  it('should prevent mousedown event when touch the buttons', () => {
    const { prevButton, nextButton } = setup({});
    const isPreventedPrev = fireEvent.touchEnd(prevButton);
    const isPreventedNext = fireEvent.touchEnd(nextButton);

    // 이벤트가 취소되면 false를 반환한다.
    expect(isPreventedPrev).toBe(false);
    expect(isPreventedNext).toBe(false);
  });

  it('should play slide automatically', () => {
    setup({ autoplay: true, autoplayInterval: 1000 });

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(setInterval).toHaveBeenCalledTimes(1);
  });

  it('should play slide reverse automatically', () => {
    setup({ autoplay: true, autoplayInterval: 1000, autoplayReverse: true });

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(setInterval).toHaveBeenCalledTimes(1);
  });
});
