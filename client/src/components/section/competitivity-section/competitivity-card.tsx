import type { PropsWithChildren } from 'react';
import type { ImageObject } from '~types/common';

import Image from 'next/image';
import styled from 'styled-components';

import { pixelToRem } from '~utils/style-utils';

const CompetitivityCard = ({
  src,
  alt,
  children,
}: PropsWithChildren<ImageObject>) => {
  return (
    <Card>
      <CardImage>
        <Image src={src} alt={alt} layout="fill" />
      </CardImage>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

const Card = styled.li`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: ${pixelToRem(32)};
  width: 50%;
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

export default CompetitivityCard;
