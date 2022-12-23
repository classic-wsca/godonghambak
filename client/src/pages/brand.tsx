import type { ReactElement } from 'react';

import Image from 'next/image';
import styled from 'styled-components';

import { CharacterCard, FeatureCard } from '~components/card';
import { Heading, Text } from '~components/common';
import { BreadcrumbLayout } from '~components/layout';
import { CHARACTER_CARDS, FEATURE_CARDS } from '~constants/card';
import { INTERIOR_SLIDER_ITEMS } from '~constants/carousel';
import { pixelToRem } from '~utils/style-utils';

const Brand = () => {
  return (
    <Wrapper>
      <MainSection>
        <LogoWrapper>
          <Image src="/images/logo-mb.png" alt="logo" layout="fill" />
        </LogoWrapper>
        <BrandHeading as="h2">
          꼭! 한번 먹어보고 싶은 함박,{' '}
          <Text as="span" color="orange">
            고동함박
          </Text>
        </BrandHeading>
        <Text>
          누구나 어렸을 적, 입에서 살살 녹는 부드러운 함박 스테이크를 먹었던
          기억이 있을 것입니다. 그때의 기억을 되살리는 앤틱한 분위기의 매장
          인테리어와 소품들, 한 입에 먹을 수 있나 싶을 정도의 두께를 가진 함박눈
          같이 살살 녹는 함박 스테이크! 고객님들께 정을 담아 음식을 판매하는
          브랜드 <b>고동함박</b>입니다.
        </Text>
      </MainSection>
      <Section>
        <BrandHeading as="h2">Brand Character</BrandHeading>
        <CharacterCards>
          {CHARACTER_CARDS.map(({ title, content, image }) => (
            <CharacterCard
              key={title}
              title={title}
              content={content}
              image={image}
            />
          ))}
        </CharacterCards>
      </Section>
      <Section>
        <BrandHeading as="h2">Features</BrandHeading>
        <FeatureCards>
          {FEATURE_CARDS.map(({ title, content, image }, index) => (
            <FeatureCard
              key={title}
              title={title}
              content={content}
              image={image}
              direction={index % 2 === 0 ? 'left' : 'right'}
            />
          ))}
        </FeatureCards>
      </Section>
      <Section>
        <BrandHeading as="h2">Interior</BrandHeading>
        <InteriorSlider>
          {INTERIOR_SLIDER_ITEMS.map(({ src, alt }) => (
            <InteriorSlide key="alt">
              <Image src={src} alt={alt} layout="fill" />
            </InteriorSlide>
          ))}
        </InteriorSlider>
      </Section>
    </Wrapper>
  );
};

Brand.getLayout = function getLayout(page: ReactElement) {
  return <BreadcrumbLayout>{page}</BreadcrumbLayout>;
};

const Wrapper = styled.div`
  position: relative;
  max-width: ${pixelToRem(1440)};
  margin: 0 auto;
  padding: 0 ${pixelToRem(120)};
  color: ${({ theme }) => theme.colors.dark};

  @media ${({ theme }) => theme.breakPoints.extraLarge} {
    padding: 0 ${pixelToRem(60)};
  }

  @media ${({ theme }) => theme.breakPoints.medium} {
    padding: 0 ${pixelToRem(16)};
  }
`;

const BrandHeading = styled(Heading)`
  font-size: ${({ theme }) => theme.fontSizes['6xl']};

  @media ${({ theme }) => theme.breakPoints.large} {
    font-size: ${({ theme }) => theme.fontSizes['5xl']};
  }

  @media ${({ theme }) => theme.breakPoints.medium} {
    font-size: ${({ theme }) => theme.fontSizes['3xl']};
  }

  @media ${({ theme }) => theme.breakPoints.small} {
    font-size: ${({ theme }) => theme.fontSizes['2xl']};
  }
`;

const MainSection = styled.section`
  text-align: center;
  word-break: keep-all;
  line-height: 1.5;

  p {
    margin: 0;
    padding: 0 20%;
  }

  @media ${({ theme }) => theme.breakPoints.large} {
    margin-top: ${pixelToRem(120)};

    p {
      padding: 0 10%;
    }
  }

  @media ${({ theme }) => theme.breakPoints.medium} {
    margin-top: ${pixelToRem(80)};

    p {
      font-size: ${({ theme }) => theme.fontSizes.sm};
      padding: 0 5%;
    }
  }

  @media ${({ theme }) => theme.breakPoints.small} {
    p {
      padding: 0;
    }
  }
`;

const LogoWrapper = styled.div`
  position: relative;
  margin: 0 auto;
  width: ${pixelToRem(144)};
  height: ${pixelToRem(120)};

  @media ${({ theme }) => theme.breakPoints.large} {
    width: ${pixelToRem(120)};
    height: ${pixelToRem(102)};
  }

  @media ${({ theme }) => theme.breakPoints.medium} {
    width: ${pixelToRem(84)};
    height: ${pixelToRem(72)};
  }
`;

const Section = styled.section`
  margin: ${pixelToRem(200)} 0;
  text-align: center;
  word-break: keep-all;

  @media ${({ theme }) => theme.breakPoints.medium} {
    margin: ${pixelToRem(120)} 0;
  }

  @media ${({ theme }) => theme.breakPoints.small} {
    margin: ${pixelToRem(60)} 0;
  }
`;

const CharacterCards = styled.div`
  display: flex;
  justify-content: center;
  gap: ${pixelToRem(100)};
  margin-top: ${pixelToRem(80)};

  @media ${({ theme }) => theme.breakPoints.large} {
    gap: ${pixelToRem(70)};
  }

  @media ${({ theme }) => theme.breakPoints.medium} {
    margin-top: ${pixelToRem(60)};
    gap: ${pixelToRem(40)};
  }

  @media ${({ theme }) => theme.breakPoints.small} {
    margin-top: ${pixelToRem(40)};
    flex-direction: column;
  }
`;

const FeatureCards = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${pixelToRem(80)};
  margin-top: ${pixelToRem(80)};

  & > div {
    position: relative;
  }

  & > div::before {
    position: absolute;
  }

  & > div:nth-of-type(1)::before {
    content: '';
    top: ${pixelToRem(-60)};
    left: ${pixelToRem(-300)};
    width: ${pixelToRem(550)};
    height: ${pixelToRem(330)};
    background-color: ${({ theme }) => theme.colors.red};
    transform: rotate(10deg);
  }

  & > div:nth-of-type(2)::before {
    content: '';
    top: ${pixelToRem(-40)};
    right: ${pixelToRem(-360)};
    width: ${pixelToRem(550)};
    height: ${pixelToRem(220)};
    background-color: ${({ theme }) => theme.colors.green};
    transform: rotate(-5deg);
  }

  & > div:nth-of-type(3)::before {
    content: '';
    top: ${pixelToRem(20)};
    left: ${pixelToRem(148)};
    width: ${pixelToRem(240)};
    height: ${pixelToRem(240)};
    background-color: ${({ theme }) => theme.colors.orange};
    transform: rotate(-10deg);
  }

  @media ${({ theme }) => theme.breakPoints.extraLarge} {
    & > div:nth-of-type(1)::before {
      width: ${pixelToRem(520)};
      height: ${pixelToRem(300)};
    }

    & > div:nth-of-type(3)::before {
      left: ${pixelToRem(124)};
      width: ${pixelToRem(220)};
      height: ${pixelToRem(220)};
    }
  }

  @media ${({ theme }) => theme.breakPoints.large} {
    & > div:nth-of-type(1)::before {
      width: ${pixelToRem(480)};
      height: ${pixelToRem(260)};
    }

    & > div:nth-of-type(2)::before {
      top: ${pixelToRem(-30)};
      right: ${pixelToRem(-180)};
      width: ${pixelToRem(330)};
      height: ${pixelToRem(180)};
    }

    & > div:nth-of-type(3)::before {
      left: ${pixelToRem(112)};
      width: ${pixelToRem(180)};
      height: ${pixelToRem(180)};
    }
  }

  @media ${({ theme }) => theme.breakPoints.medium} {
    margin-top: ${pixelToRem(60)};
    gap: ${pixelToRem(40)};
  }

  @media ${({ theme }) => theme.breakPoints.small} {
    margin-top: ${pixelToRem(40)};
    gap: ${pixelToRem(32)};

    & > div:nth-of-type(1)::before {
      transform: none;

      top: ${pixelToRem(16)};
      left: 0;
      width: 100%;
      height: ${pixelToRem(240)};
    }

    & > div:nth-of-type(2)::before {
      transform: none;

      top: ${pixelToRem(16)};
      right: 0;
      width: 100%;
      height: ${pixelToRem(240)};
    }

    & > div:nth-of-type(3)::before {
      transform: none;

      top: ${pixelToRem(16)};
      left: 0;
      width: 100%;
      height: ${pixelToRem(240)};
    }
  }
`;

const InteriorSlider = styled.div`
  margin-top: ${pixelToRem(80)};
  overflow: auto;
  white-space: nowrap;
`;

const InteriorSlide = styled.div`
  position: relative;
  display: inline-block;
  width: ${pixelToRem(520)};
  height: ${pixelToRem(420)};
  margin-right: ${pixelToRem(32)};

  img {
    pointer-events: none;
    user-select: none;
  }

  @media ${({ theme }) => theme.breakPoints.extraLarge} {
    width: ${pixelToRem(440)};
    height: ${pixelToRem(360)};
  }

  @media ${({ theme }) => theme.breakPoints.large} {
    width: ${pixelToRem(400)};
    height: ${pixelToRem(320)};
  }

  @media ${({ theme }) => theme.breakPoints.large} {
    width: ${pixelToRem(320)};
    height: ${pixelToRem(240)};
  }
`;

export default Brand;
