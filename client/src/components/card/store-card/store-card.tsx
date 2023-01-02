import Image from 'next/image';
import styled from 'styled-components';

import { Heading, Text } from '~components/common';
import { pixelToRem } from '~utils/style-utils';

interface StoreCardProps {
  region: string;
  name: string;
  address: string;
  image: string;
}

const StoreCard = ({ region, name, address, image }: StoreCardProps) => {
  return (
    <Card>
      <CardContent>
        <Heading as="h5">{region}</Heading>
        <Heading as="h4" mt={34} mb={16}>
          {name}
        </Heading>
        <Text size="xl">{address}</Text>
      </CardContent>
      <CardImage>
        <Image src={image} alt={name} layout="fill" />
      </CardImage>
    </Card>
  );
};

const Card = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: ${pixelToRem(940)};
  margin: 0 auto;
  padding: ${pixelToRem(40)} 0;
  transition: transform 0.3s ease-in-out;
  cursor: pointer;

  @media ${({ theme }) => theme.breakPoints.large} {
    padding: ${pixelToRem(32)} 0;
  }

  @media ${({ theme }) => theme.breakPoints.medium} {
    padding: ${pixelToRem(24)} 0;
  }

  @media ${({ theme }) => theme.breakPoints.small} {
    flex-direction: column;
    align-items: center;
    gap: ${pixelToRem(16)};
    padding: ${pixelToRem(16)} 0;
  }
`;

const CardImage = styled.div`
  position: relative;
  flex-shrink: 0;
  width: ${pixelToRem(360)};
  height: ${pixelToRem(300)};

  @media ${({ theme }) => theme.breakPoints.extraLarge} {
    width: ${pixelToRem(330)};
    height: ${pixelToRem(270)};
  }

  @media ${({ theme }) => theme.breakPoints.large} {
    width: ${pixelToRem(270)};
    height: ${pixelToRem(225)};
  }

  @media ${({ theme }) => theme.breakPoints.medium} {
    width: ${pixelToRem(210)};
    height: ${pixelToRem(150)};
  }

  @media ${({ theme }) => theme.breakPoints.small} {
    order: 1;
    width: 100%;
    height: 64vw;
  }
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: left;
  line-height: 1.5;

  h4,
  h5 {
    width: 100%;
    margin: 0;
  }

  h4 {
    font-size: ${({ theme }) => theme.fontSizes['6xl']};
    margin-bottom: ${pixelToRem(60)};
  }

  h5 {
    font-size: ${({ theme }) => theme.fontSizes['3xl']};
    font-weight: 500;
  }

  p {
    word-break: keep-all;
  }

  @media ${({ theme }) => theme.breakPoints.extraLarge} {
    h4 {
      font-size: ${({ theme }) => theme.fontSizes['5xl']};
    }

    h5 {
      font-size: ${({ theme }) => theme.fontSizes['2xl']};
    }
  }

  @media ${({ theme }) => theme.breakPoints.large} {
    h4 {
      font-size: ${({ theme }) => theme.fontSizes['4xl']};
      margin-bottom: ${pixelToRem(40)};
    }

    h5 {
      font-size: ${({ theme }) => theme.fontSizes.xl};
    }
  }

  @media ${({ theme }) => theme.breakPoints.medium} {
    h4 {
      font-size: ${({ theme }) => theme.fontSizes.xl};
      margin-bottom: ${pixelToRem(24)};
    }

    p {
      font-size: ${({ theme }) => theme.fontSizes.sm};
    }
  }

  @media ${({ theme }) => theme.breakPoints.small} {
    order: 2;
    width: 100%;
    text-align: left;

    h4 {
      font-size: ${({ theme }) => theme.fontSizes.xl};
      margin-bottom: ${pixelToRem(16)};
    }

    h5 {
      font-size: ${({ theme }) => theme.fontSizes.md};
    }

    p {
      width: 100%;
      font-size: ${({ theme }) => theme.fontSizes.sm};
    }
  }
`;

export default StoreCard;
