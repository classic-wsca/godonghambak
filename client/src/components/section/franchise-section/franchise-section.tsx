import Link from 'next/link';
import styled from 'styled-components';

import { Button, Heading, Text } from '~components/common';
import { pixelToRem } from '~utils/style-utils';

import FranchiseSectionBackground from './franchise-section-background';

const FranchiseSection = () => {
  return (
    <Wrapper role="region" aria-label="franchiseSection">
      <FranchiseSectionBackground />
      <Content>
        <Heading as="h2" fontWeight={400} size="9xl" m={0}>
          즐거움과 재미가 가득한 고동함박, <br />
          가족이 되실 분들을 모집합니다!
        </Heading>
        <Text size="3xl" mb={64} lineHeight={1.6}>
          고동함박은 파트너 여러분들의 다양한 창업 조건에 맞는 &lsquo;맞춤형
          점포 개설&rsquo;을 통해 음식점 창업의 문턱을 낮추고 진정한 상생의
          가치를 구현합니다
        </Text>
      </Content>
      <Link href="/franchise" passHref>
        <Button
          type="button"
          as="a"
          size="x-large"
          color="yellow"
          aria-label="franchise-link"
        >
          가맹점 개설 안내
        </Button>
      </Link>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: ${pixelToRem(1440)};
  height: 100%;
  margin: 0 auto;
  padding: ${pixelToRem(200)} 0;
  background-color: ${({ theme }) => theme.colors.green};
  color: ${({ theme }) => theme.colors.light};
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  word-break: keep-all;
  z-index: 10;

  h2 {
    font-family: 'Black Han Sans', 'Noto Sans KR', -apple-system, sans-serif;
  }

  p {
    width: 80%;
  }

  @media ${({ theme }) => theme.breakPoints.large} {
    h2 {
      font-size: ${({ theme }) => theme.fontSizes['7xl']};
    }

    p {
      font-size: ${({ theme }) => theme.fontSizes.xl};
    }
  }

  @media ${({ theme }) => theme.breakPoints.medium} {
    h2 {
      font-size: ${({ theme }) => theme.fontSizes['6xl']};
    }

    p {
      font-size: ${({ theme }) => theme.fontSizes.md};
    }
  }

  @media ${({ theme }) => theme.breakPoints.small} {
    padding: 0 ${pixelToRem(32)};

    h2 {
      font-size: ${({ theme }) => theme.fontSizes['5xl']};
    }

    p {
      font-size: ${({ theme }) => theme.fontSizes.sm};
    }
  }
`;

export default FranchiseSection;
