import Image from 'next/image';
import styled from 'styled-components';

import { Heading, Text } from '~components/common';
import { pixelToRem } from '~utils/style-utils';

interface CharacterCardProps {
  title: string;
  content: string;
  image: string;
}

const CharacterCard = ({ title, content, image }: CharacterCardProps) => (
  <Card>
    <CardImage>
      <Image src={image} alt={title} layout="fill" />
    </CardImage>
    <CardContent>
      <Heading as="h4" mt={34} mb={16}>
        {title}
      </Heading>
      <Text size="xl">{content}</Text>
    </CardContent>
  </Card>
);

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CardImage = styled.div`
  position: relative;
  width: ${pixelToRem(280)};
  height: ${pixelToRem(276)};

  @media ${({ theme }) => theme.breakPoints.extraLarge} {
    width: ${pixelToRem(214)};
    height: ${pixelToRem(210)};
  }

  @media ${({ theme }) => theme.breakPoints.large} {
    width: ${pixelToRem(176)};
    height: ${pixelToRem(172)};
  }

  @media ${({ theme }) => theme.breakPoints.medium} {
    width: ${pixelToRem(144)};
    height: ${pixelToRem(140)};
  }
`;

const CardContent = styled.div`
  text-align: center;

  p {
    line-height: 1.5;
    white-space: pre-line;
  }

  @media ${({ theme }) => theme.breakPoints.large} {
    h4 {
      font-size: ${({ theme }) => theme.fontSizes['2xl']};
    }

    p {
      font-size: ${({ theme }) => theme.fontSizes.md};
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
`;

export default CharacterCard;
