import type { GlobalColors } from '~types/common';

import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';

import { Carousel, CarouselItem, Button } from '~components/common';
import { MAIN_CAROUSEL_ITEMS } from '~constants/carousel';
import { useWindowSize } from '~hooks/index';
import { pixelToRem } from '~utils/style-utils';

const MainCarousel = () => {
  const { width } = useWindowSize();

  return (
    <Carousel
      margin={width && width < 1200 ? 0 : 130}
      aria-label="main-carousel"
    >
      {MAIN_CAROUSEL_ITEMS.map(
        ({ title, subTitle, content, link, color, imgUrl }, index) => (
          <CarouselItem key={title}>
            <Slide>
              <ContentBox>
                <SubTitle color={color}>{subTitle}</SubTitle>
                <Title color={color}>{title}</Title>
                <Content>{content}</Content>
                <Link href={link.href} passHref>
                  <Button
                    as="a"
                    type="button"
                    color={color}
                    size="large"
                    aria-label="link-button"
                  >
                    {link.text}
                  </Button>
                </Link>
              </ContentBox>
              <ImageBox>
                <Image
                  src={imgUrl}
                  alt={`carousel-image-${index}`}
                  layout="fill"
                  objectFit="cover"
                  priority
                />
              </ImageBox>
            </Slide>
          </CarouselItem>
        ),
      )}
    </Carousel>
  );
};

const Slide = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: inherit;
  border-radius: ${pixelToRem(30)};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

  @media ${({ theme }) => theme.breakPoints.extraLarge} {
    border-radius: 0;
    box-shadow: none;
  }

  @media ${({ theme }) => theme.breakPoints.medium} {
    grid-template-columns: 1fr;
    grid-template-rows: 1.5fr 1fr;
  }
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-top: ${pixelToRem(60)};
  padding-bottom: ${pixelToRem(90)};
  padding-left: ${pixelToRem(50)};
  color: ${({ theme }) => theme.colors.dark};
  z-index: 10;

  a {
    margin: ${pixelToRem(30)} 0;
  }

  @media ${({ theme }) => theme.breakPoints.large} {
    padding-left: ${pixelToRem(40)};
  }

  @media ${({ theme }) => theme.breakPoints.medium} {
    order: 2;
    padding: ${pixelToRem(32)};
    padding-bottom: ${pixelToRem(48)};

    a {
      margin: ${pixelToRem(16)} 0;
      padding: ${pixelToRem(16)} ${pixelToRem(32)};
      font-size: ${({ theme }) => theme.fontSizes.sm};
    }
  }
`;

const Title = styled.h2<{ color: GlobalColors }>`
  margin-top: ${pixelToRem(20)};
  font-family: 'Hahmlet', 'Noto Sans KR', -apple-system, sans-serif;
  font-size: ${({ theme }) => theme.fontSizes['8xl']};
  color: ${({ theme, color }) => theme.colors[color]};

  @media ${({ theme }) => theme.breakPoints.large} {
    font-size: ${({ theme }) => theme.fontSizes['7xl']};
  }

  @media ${({ theme }) => theme.breakPoints.medium} {
    margin: 0;
    font-size: ${({ theme }) => theme.fontSizes['4xl']};
  }
`;

const SubTitle = styled.h3`
  margin-bottom: 0;
  font-size: ${({ theme }) => theme.fontSizes['4xl']};

  @media ${({ theme }) => theme.breakPoints.large} {
    font-size: ${({ theme }) => theme.fontSizes['2xl']};
  }

  @media ${({ theme }) => theme.breakPoints.medium} {
    margin-top: 0;
    margin-bottom: ${pixelToRem(16)};
    font-size: ${({ theme }) => theme.fontSizes.lg};
    font-weight: 500;
  }
`;

const Content = styled.p`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: 300;
  line-height: 1.5;
  white-space: pre-wrap;

  @media ${({ theme }) => theme.breakPoints.large} {
    font-size: ${({ theme }) => theme.fontSizes.lg};
  }

  @media ${({ theme }) => theme.breakPoints.medium} {
    font-size: ${({ theme }) => theme.fontSizes.sm};
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`;

const ImageBox = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 0 ${pixelToRem(30)} ${pixelToRem(30)} 0;
  overflow: hidden;

  img {
    pointer-events: none;
  }

  @media ${({ theme }) => theme.breakPoints.extraLarge} {
    border-radius: 0;
  }

  @media ${({ theme }) => theme.breakPoints.medium} {
    order: 1;
  }
`;

export default MainCarousel;
