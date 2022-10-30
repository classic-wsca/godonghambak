import Image from 'next/image';
import styled from 'styled-components';

import { Heading, Text } from '~components/common';
import { pixelToRem } from '~utils/style-utils';

const CompetitivitySection = () => {
  return (
    <Wrapper role="region" aria-labelledby="competitivity">
      <Header>
        <Heading as="h2" m={0} id="competitivity">
          경쟁력
        </Heading>
        <Text m={0}>
          사람들의 마음을 사로잡는 고동함박만의 특별한
          <br /> 경쟁력으로 즐거운 한끼 식사를 준비합니다.
        </Text>
      </Header>
      <CardList>
        <Card>
          <CardImage>
            <Image src="/images/pork.png" alt="국내산 돼지고기" layout="fill" />
          </CardImage>
          <CardContent>
            <Heading as="h3" m={0} mb={12} size="4xl">
              <Text as="b" color="red">
                100%
              </Text>{' '}
              국내산 돼지고기
            </Heading>
            <Text m={0} fontWeight={300} lineHeight={2}>
              고동함박은 <Text as="b">신선한 100% 돼지고기를</Text> 사용합니다.
              매일매일 아침에 오븐에서 갓 굽기 때문에 아무도 따라할 수 없는{' '}
              <Text as="b" color="red">
                육즙이 흘러 넘치는 함박 스테이크
              </Text>
              를 먹는 즐거움을 느껴보세요!
            </Text>
          </CardContent>
        </Card>
        <Card>
          <CardImage>
            <Image
              src="/images/ggalmaehambak.png"
              alt="깔매함박"
              layout="fill"
            />
          </CardImage>
          <CardContent>
            <Heading as="h3" m={0} mb={12} size="4xl">
              모두가 좋아하는 한끼 식사
            </Heading>
            <Text m={0} fontWeight={300} lineHeight={2}>
              고동함박에서 직접 개발한{' '}
              <Text as="b" color="green">
                다양한 레시피와 소스
              </Text>
              들! 사람들의 눈을 사로잡는 거대한 함박 스테이크와{' '}
              <Text as="b" color="green">
                귀여우면서도 고풍스런 느낌을 풍기는 플레이팅
              </Text>
              까지! <Text as="b">남녀노소 모두를 위한 식당, 고동함박.</Text>
            </Text>
          </CardContent>
        </Card>
        <Card>
          <CardImage>
            <Image
              src="/images/interior-01.png"
              alt="매장 사진 01"
              layout="fill"
            />
          </CardImage>
          <CardContent>
            <Heading as="h3" m={0} mb={12} size="4xl">
              즐거움과 재미 가득한 공간
            </Heading>
            <Text m={0} fontWeight={300} lineHeight={2}>
              고동함박에서만 만날 수 있는{' '}
              <Text as="b" color="yellow">
                독특한 인테리어!
              </Text>{' '}
              톡톡 튀는 색깔들의 적절한 조화와 한번 보면 잊혀지지 않는
              고동함박의 캐릭터들!{' '}
              <Text as="b">
                고객과 직원들의{' '}
                <Text as="span" color="yellow">
                  워라밸
                </Text>
                을 존중한 브랜드
              </Text>
            </Text>
          </CardContent>
        </Card>
      </CardList>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  position: relative;
  max-width: ${pixelToRem(1440)};
  margin: 0 auto;
  padding: ${pixelToRem(120)};

  @media ${({ theme }) => theme.breakPoints.extraLarge} {
    padding: 10% 5%;
  }
`;

const Header = styled.div`
  position: absolute;
  margin-top: ${pixelToRem(100)};
  margin-bottom: ${pixelToRem(72)};
  font-weight: 300;
  color: ${({ theme }) => theme.colors.dark};
  line-height: 2;

  h2 {
    position: relative;

    &:before {
      content: 'Competitivity';
      position: absolute;
      top: ${pixelToRem(-52)};
      left: 0;
      font-size: ${({ theme }) => theme.fontSizes['8xl']};
      font-weight: bold;
      color: ${({ theme }) => theme.colors.gray};
      z-index: -1;
    }
  }

  @media ${({ theme }) => theme.breakPoints.large} {
    margin-top: ${pixelToRem(70)};
    margin-bottom: ${pixelToRem(60)};

    h2 {
      font-size: ${({ theme }) => theme.fontSizes['5xl']};

      &:before {
        top: ${pixelToRem(-32)};
        font-size: ${({ theme }) => theme.fontSizes['6xl']};
      }
    }
  }

  @media ${({ theme }) => theme.breakPoints.medium} {
    position: relative;
    margin-top: 0;
    margin-bottom: ${pixelToRem(24)};
    text-align: center;

    h2 {
      font-size: ${({ theme }) => theme.fontSizes['4xl']};

      &:before {
        top: ${pixelToRem(-28)};
        left: 50%;
        font-size: ${({ theme }) => theme.fontSizes['5xl']};
        transform: translateX(-50%);
      }
    }

    p {
      font-size: ${({ theme }) => theme.fontSizes.sm};
      line-height: 1.5;
    }
  }

  @media ${({ theme }) => theme.breakPoints.small} {
    h2 {
      font-size: ${({ theme }) => theme.fontSizes['3xl']};
    }
  }
`;

const CardList = styled.ul`
  margin: 0;

  &:after {
    content: '';
    display: block;
    clear: both;
  }
`;

const Card = styled.li`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: ${pixelToRem(32)};
  width: 50%;

  &:first-of-type {
    float: right;
    padding-right: ${pixelToRem(110)};
  }

  &:nth-of-type(2) {
    float: left;
    padding-top: ${pixelToRem(400)};
    padding-right: ${pixelToRem(110)};
  }

  &:last-of-type {
    float: right;
    padding-top: ${pixelToRem(100)};
    padding-left: ${pixelToRem(110)};
  }

  @media ${({ theme }) => theme.breakPoints.extraLarge} {
    &:first-of-type {
      padding-right: ${pixelToRem(90)};
    }

    &:nth-of-type(2) {
      padding-top: ${pixelToRem(320)};
      padding-right: ${pixelToRem(90)};
    }

    &:last-of-type {
      padding-top: ${pixelToRem(80)};
      padding-left: ${pixelToRem(90)};
    }
  }

  @media ${({ theme }) => theme.breakPoints.large} {
    gap: ${pixelToRem(16)};

    &:first-of-type {
      padding-right: ${pixelToRem(50)};
    }

    &:nth-of-type(2) {
      padding-top: ${pixelToRem(250)};
      padding-right: ${pixelToRem(50)};
    }

    &:last-of-type {
      padding-top: ${pixelToRem(40)};
      padding-left: ${pixelToRem(50)};
    }
  }

  @media ${({ theme }) => theme.breakPoints.medium} {
    &:nth-of-type(2) {
      padding-top: ${pixelToRem(150)};
      padding-right: ${pixelToRem(50)};
    }
  }

  @media ${({ theme }) => theme.breakPoints.small} {
    width: 100%;

    &:first-of-type {
      padding-right: ${pixelToRem(45)};
      padding-bottom: ${pixelToRem(30)};
    }

    &:nth-of-type(2) {
      padding-top: 0;
      padding-left: ${pixelToRem(45)};
      padding-right: 0;
      padding-bottom: ${pixelToRem(30)};
    }

    &:last-of-type {
      padding-top: 0;
      padding-left: 0;
      padding-right: ${pixelToRem(45)};
      padding-bottom: ${pixelToRem(30)};
    }
  }
`;

const CardImage = styled.div`
  position: relative;
  width: 100%;
  max-width: ${pixelToRem(500)};
  overflow: hidden;

  & > span {
    position: unset !important;
  }

  img {
    position: relative !important;
    height: unset !important;
    width: 100% !important;
    object-fit: contain;
  }
`;

const CardContent = styled.div`
  color: ${({ theme }) => theme.colors.dark};
  word-break: keep-all;

  @media ${({ theme }) => theme.breakPoints.large} {
    h3 {
      font-size: ${({ theme }) => theme.fontSizes['2xl']};
    }
  }

  @media ${({ theme }) => theme.breakPoints.medium} {
    h3 {
      font-size: ${({ theme }) => theme.fontSizes.lg};
    }
    p {
      font-size: ${({ theme }) => theme.fontSizes.sm};
      line-height: 1.8;
    }
  }
`;

export default CompetitivitySection;
