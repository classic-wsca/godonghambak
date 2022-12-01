import styled from 'styled-components';

import { MenuCarousel } from '~components/carousel';
import { Heading, Text } from '~components/common';
import { pixelToRem } from '~utils/style-utils';

const MenuSection = () => {
  return (
    <Wrapper role="region" aria-labelledby="menuIntroduce">
      <Header>
        <Heading id="menuIntroduce" as="h2">
          고동함박 메뉴 소개
        </Heading>
        <Text>
          맛없고 퍽퍽한 함박 스테이크는 이제 그만!
          <br /> 꼭! 한 번은 먹어보고 싶은 고동함박의 특별한 메뉴들
        </Text>
      </Header>
      <MenuCarousel />
    </Wrapper>
  );
};

const Wrapper = styled.section`
  position: relative;
  margin: 0 auto;
  padding: ${pixelToRem(100)} 0;

  @media ${({ theme }) => theme.breakPoints.large} {
    padding: 8vh 0;
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  color: ${({ theme }) => theme.colors.dark};

  h2 {
    margin: ${pixelToRem(20)} 0;
  }

  p {
    margin-bottom: ${pixelToRem(100)};
    font-weight: 400;
    line-height: 1.5;
  }

  @media ${({ theme }) => theme.breakPoints.large} {
    h2 {
      margin: 0;
      font-size: ${({ theme }) => theme.fontSizes['5xl']};
    }

    p {
      margin-top: ${pixelToRem(24)};
      margin-bottom: ${pixelToRem(60)};
    }
  }

  @media ${({ theme }) => theme.breakPoints.medium} {
    h2 {
      font-size: ${({ theme }) => theme.fontSizes['4xl']};
    }

    p {
      margin-top: ${pixelToRem(16)};
      margin-bottom: ${pixelToRem(32)};
      font-size: ${({ theme }) => theme.fontSizes.sm};
    }
  }

  @media ${({ theme }) => theme.breakPoints.small} {
    h2 {
      font-size: ${({ theme }) => theme.fontSizes['3xl']};
    }

    p {
      font-size: ${({ theme }) => theme.fontSizes.xs};
    }
  }
`;

export default MenuSection;
