import type { Direction } from '~types/common';

import Image from 'next/image';
import styled from 'styled-components';

import { Heading, Text } from '~components/common';
import { pixelToRem } from '~utils/style-utils';

interface FeatureCardProps {
  title: string;
  content: string;
  image: string;
  direction?: Extract<Direction, 'left' | 'right'>;
}

const FeatureCard = ({
  title,
  content,
  image,
  direction = 'left',
}: FeatureCardProps) => {
  return (
    <Card direction={direction}>
      <CardImage>
        <Image src={image} alt={title} layout="fill" />
      </CardImage>
      <CardContent>
        <Heading as="h4">{title}</Heading>
        <Text>{content}</Text>
      </CardContent>
    </Card>
  );
};

const Card = styled.div<{ direction: Extract<Direction, 'left' | 'right'> }>`
  display: flex;
  justify-content: center;
  gap: ${pixelToRem(120)};

  & > div:nth-child(1) {
    order: ${({ direction }) => (direction === 'left' ? '1' : '2')};
  }

  & > div:nth-child(2) {
    order: ${({ direction }) => (direction === 'left' ? '2' : '1')};
  }

  @media ${({ theme }) => theme.breakPoints.extraLarge} {
    gap: ${pixelToRem(80)};
  }

  @media ${({ theme }) => theme.breakPoints.large} {
    gap: ${pixelToRem(60)};
  }

  @media ${({ theme }) => theme.breakPoints.medium} {
    gap: ${pixelToRem(40)};
  }

  @media ${({ theme }) => theme.breakPoints.small} {
    flex-direction: column;
    align-items: center;
    gap: ${pixelToRem(32)};

    & > div:nth-child(1) {
      order: 1;
    }

    & > div:nth-child(2) {
      order: 2;
    }
  }
`;

const CardImage = styled.div`
  position: relative;
  flex-shrink: 0;
  width: ${pixelToRem(360)};
  height: ${pixelToRem(360)};

  @media ${({ theme }) => theme.breakPoints.extraLarge} {
    width: ${pixelToRem(320)};
    height: ${pixelToRem(320)};
  }

  @media ${({ theme }) => theme.breakPoints.large} {
    width: ${pixelToRem(280)};
    height: ${pixelToRem(280)};
  }

  @media ${({ theme }) => theme.breakPoints.medium} {
    width: ${pixelToRem(220)};
    height: ${pixelToRem(220)};
  }

  @media ${({ theme }) => theme.breakPoints.medium} {
    width: ${pixelToRem(280)};
    height: ${pixelToRem(280)};
  }
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: left;
  line-height: 1.5;

  h4 {
    width: 100%;
    margin: 0;
  }

  @media ${({ theme }) => theme.breakPoints.large} {
    h4 {
      font-size: ${({ theme }) => theme.fontSizes['2xl']};
    }
  }

  @media ${({ theme }) => theme.breakPoints.medium} {
    h4 {
      font-size: ${({ theme }) => theme.fontSizes.xl};
    }

    p {
      font-size: ${({ theme }) => theme.fontSizes.sm};
    }
  }

  @media ${({ theme }) => theme.breakPoints.small} {
    text-align: center;
  }
`;

export default FeatureCard;
