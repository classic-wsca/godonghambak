import Image from 'next/image';
import styled from 'styled-components';

import { CharacterCarousel } from '~components/carousel';
import { Text } from '~components/common';
import { CHARACTER_CAROUSEL_ITEMS } from '~constants/carousel';
import { pixelToRem } from '~utils/style-utils';

const FamilySection = () => {
  return (
    <Wrapper role="region" aria-label="familySection">
      <Header>
        <Title>
          <Image src="/images/family-text.png" layout="fill" />
        </Title>
        <Text lineHeight={1.8}>
          고동함박의 가족들이 만드는
          <br />
          특별한 함박 스테이크를 드셔보세요!
        </Text>
      </Header>
      <CharacterCarousel
        images={CHARACTER_CAROUSEL_ITEMS}
        imageSize={{ width: 140, height: 138 }}
        margin={50}
      />
    </Wrapper>
  );
};

const Wrapper = styled.section`
  position: relative;
  margin: 0 auto;
  padding: 10vh 0;
  background-color: ${({ theme }) => theme.colors.red};

  @media ${({ theme }) => theme.breakPoints.medium} {
    padding: 6vh 0;
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  color: ${({ theme }) => theme.colors.light};

  p {
    margin-top: 0;
    margin-bottom: ${pixelToRem(60)};
    font-size: ${({ theme }) => theme.fontSizes['2xl']};
    font-weight: 500;
  }

  @media ${({ theme }) => theme.breakPoints.medium} {
    p {
      margin-bottom: ${pixelToRem(32)};
      font-size: ${({ theme }) => theme.fontSizes.lg};
    }
  }

  @media ${({ theme }) => theme.breakPoints.small} {
    p {
      font-size: ${({ theme }) => theme.fontSizes.md};
    }
  }
`;

const Title = styled.div`
  position: relative;
  width: ${pixelToRem(635)};
  height: ${pixelToRem(85)};
  margin-bottom: ${pixelToRem(40)};

  @media ${({ theme }) => theme.breakPoints.medium} {
    width: ${pixelToRem(423)};
    height: ${pixelToRem(56)};
    margin-bottom: ${pixelToRem(24)};
  }
`;

export default FamilySection;
