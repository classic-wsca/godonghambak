import Image from 'next/image';
import styled from 'styled-components';

import { Heading, Text } from '~components/common';
import { pixelToRem } from '~utils/style-utils';

interface MenuCardProps {
  image: string;
  name: string;
  description: string;
  price: number;
}

const MenuCard = ({ image, name, description, price }: MenuCardProps) => {
  return (
    <Card role="group">
      <CardImage data-testid="card-image">
        <Image src={image} alt={name} layout="fill" />
      </CardImage>
      <CardContent>
        <Heading as="h5" size="5xl">
          {name}
        </Heading>
        <CardText>
          <Text>{description}</Text>
          <Text as="span" size="2xl" fontWeight={500}>
            {price.toLocaleString('ko-KR')}원
          </Text>
        </CardText>
      </CardContent>
    </Card>
  );
};

const Card = styled.div`
  position: relative;
  aspect-ratio: 320 / 440;

  & > div {
    transition: visibility 0.4s ease, opacity 0.4s ease;
  }

  & > div:nth-of-type(2) {
    visibility: hidden;
    opacity: 0;
  }

  &:hover > div:nth-of-type(1) {
    visibility: hidden;
    opacity: 0;
  }

  &:hover > div:nth-of-type(2) {
    visibility: visible;
    opacity: 1;
  }
`;

const CardImage = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  img {
    object-fit: contain;
  }
`;

const CardContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  gap: ${pixelToRem(20)};
  width: 100%;
  height: 100%;
  padding: ${pixelToRem(40)} ${pixelToRem(30)};
  border-radius: ${pixelToRem(10)};
  background-color: ${({ theme }) => theme.colors.yellow};
  text-align: left;

  h5 {
    font-family: 'Hahmlet', 'Noto Sans KR', -apple-system, sans-serif;
    margin: 0;
  }
`;

const CardText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;

  p {
    margin: 0;
    word-break: keep-all;
  }

  span {
    text-align: right;
  }
`;

export default MenuCard;
