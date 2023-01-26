import Image from 'next/image';
import styled from 'styled-components';

import { Heading, Text } from '~components/common';
import { pixelToRem } from '~utils/style-utils';

interface FranchiseCardProps {
  id: string;
  title: string;
  content: string;
  image: string;
}

const FranchiseCard = ({ id, title, content, image }: FranchiseCardProps) => {
  return (
    <Card>
      <CardImage>
        <Image src={image} alt={title} layout="fill" />
      </CardImage>
      <CardContent>
        {id && (
          <Heading as="h4" size="6xl" m={0}>
            {id}
          </Heading>
        )}
        <Heading as="h3" size="5xl" m={0}>
          {title}
        </Heading>
        <Text m={0}>{content}</Text>
      </CardContent>
    </Card>
  );
};

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${pixelToRem(20)};
  width: ${pixelToRem(320)};
  height: ${pixelToRem(320)};
  padding: ${pixelToRem(50)} 0 ${pixelToRem(40)} 0;
  border: ${pixelToRem(4)} solid ${({ theme }) => theme.colors.dark};
  border-radius: ${pixelToRem(10)};
  color: ${({ theme }) => theme.colors.dark};
`;

const CardImage = styled.div`
  position: relative;
  flex-shrink: 0;
  width: ${pixelToRem(40)};
  height: ${pixelToRem(40)};

  img {
    object-fit: contain;
  }
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${pixelToRem(16)};
  text-align: center;

  p {
    line-height: 1.5;
    white-space: pre-line;
  }
`;

export default FranchiseCard;
