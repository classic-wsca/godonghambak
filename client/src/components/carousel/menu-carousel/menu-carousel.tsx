import Image from 'next/image';
import styled, { css } from 'styled-components';

import { Carousel, CarouselItem } from '~components/common';
import { MENU_CAROUSEL_ITEMS } from '~constants/carousel';
import { useWindowSize } from '~hooks/index';
import { pixelToRem } from '~utils/style-utils';

const MenuCarousel = () => {
  const { width } = useWindowSize();

  const setSlideWidth = (): number => {
    if (width && width <= 568) {
      return 0;
    }
    if (width && width <= 1200) {
      return 245;
    }
    return 275;
  };

  const setDraggable = (): boolean => {
    if (!width) {
      return false;
    }

    return width <= 568;
  };

  return (
    <MenuCarouselWrapper
      width={setSlideWidth()}
      margin={0}
      duration={400}
      draggable={setDraggable()}
      autoplayInterval={2000}
      button={false}
      indicator={false}
    >
      {MENU_CAROUSEL_ITEMS.map(({ title, imgUrl }) => (
        <MenuCarouselItem key={imgUrl} activeStyle={activeStyle}>
          <Slide>
            <ImageBox>
              <Image src={imgUrl} alt={title} layout="fill" objectFit="cover" />
            </ImageBox>
          </Slide>
        </MenuCarouselItem>
      ))}
    </MenuCarouselWrapper>
  );
};

const MenuCarouselWrapper = styled(Carousel)`
  max-width: 100vw;
  padding: ${pixelToRem(90)} 0;

  & > ul {
    margin-left: ${pixelToRem(-60)};
    background-color: ${({ theme }) => theme.colors.pink};
  }

  @media ${({ theme }) => theme.breakPoints.large} {
    padding: 0;

    & > ul {
      margin-left: 0;
    }
  }

  @media ${({ theme }) => theme.breakPoints.small} {
    cursor: pointer;
  }
`;

const MenuCarouselItem = styled(CarouselItem)`
  transition: all 0.4s ease 0.4s;
`;

const Slide = styled.div`
  width: 100%;
  border: ${pixelToRem(15)} solid ${({ theme }) => theme.colors.pink};
  border-radius: ${pixelToRem(10)};
  background-color: ${({ theme }) => theme.colors.pink};
`;

const ImageBox = styled.div`
  position: relative;
  width: 100%;
  height: ${pixelToRem(337)};
  border-radius: ${pixelToRem(10)};
  overflow: hidden;

  img {
    pointer-events: none;
  }

  @media ${({ theme }) => theme.breakPoints.extraLarge} {
    height: ${pixelToRem(296)};

    @media ${({ theme }) => theme.breakPoints.small} {
      height: 130vw;
    }
  }
`;

const activeStyle = css`
  position: relative;
  margin: 0 ${pixelToRem(60)};
  transform: scale(1.5);
  z-index: 10;

  @media ${({ theme }) => theme.breakPoints.large} {
    margin: 0;
    transform: none;
  }
`;

export default MenuCarousel;
