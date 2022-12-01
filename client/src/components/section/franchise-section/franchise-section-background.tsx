/* eslint-disable react/no-array-index-key */

import type { Position } from '~types/common';

import Image from 'next/image';
import React, { useState, useCallback } from 'react';
import styled from 'styled-components';

import { CHARACTER_CAROUSEL_ITEMS } from '~constants/carousel';
import { useThrottle } from '~hooks/index';
import { pixelToRem } from '~utils/style-utils';

const FranchiseSectionBackground = () => {
  const imageList = [...CHARACTER_CAROUSEL_ITEMS, ...CHARACTER_CAROUSEL_ITEMS];
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  }, []);

  const throttleOnMouseMove = useThrottle<[React.MouseEvent]>(
    handleMouseMove,
    1000 / 60,
  );

  return (
    <Wrapper onMouseMove={throttleOnMouseMove} aria-label="character-images">
      <ImageList>
        {imageList.map(({ src, alt }, index) => (
          <ImageWrapper key={index} position={mousePosition}>
            <Image src={src} alt={`${alt}-${index}`} layout="fill" />
          </ImageWrapper>
        ))}
      </ImageList>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const ImageList = styled.ul`
  position: relative;
  height: 100%;
  margin: 0;
`;

const ImageWrapper = styled.li.attrs<{ position: Position }>(
  ({ position }) => ({
    style: {
      transform: `translate(-${position.x / 25}px, -${position.y / 25}px)`,
    },
  }),
)<{ position: Position }>`
  position: absolute;
  transition: transform 600ms linear;
  z-index: 100;

  &:nth-of-type(1) {
    top: 60%;
    left: -4%;
    width: 12vw;
    height: 12vw;
  }

  &:nth-of-type(2) {
    bottom: -5%;
    left: 10%;
    width: 22vw;
    height: 22vw;
  }

  &:nth-of-type(3) {
    top: -8%;
    left: -8%;
    width: 28vw;
    height: 28vw;
  }

  &:nth-of-type(4) {
    bottom: 15%;
    right: 2%;
    width: 18vw;
    height: 18vw;
  }

  &:nth-of-type(5) {
    top: -5%;
    right: 15%;
    width: 14vw;
    height: 14vw;
  }

  &:nth-of-type(6) {
    top: 30%;
    right: -4%;
    width: 10vw;
    height: 10vw;
  }

  @media screen and (min-width: 1440px) {
    &:nth-of-type(1) {
      width: ${pixelToRem(160)};
      height: ${pixelToRem(160)};
    }

    &:nth-of-type(2) {
      width: ${pixelToRem(280)};
      height: ${pixelToRem(280)};
    }

    &:nth-of-type(3) {
      left: -4%;
      width: ${pixelToRem(360)};
      height: ${pixelToRem(360)};
    }

    &:nth-of-type(4) {
      right: 8%;
      bottom: 5%;
      width: ${pixelToRem(320)};
      height: ${pixelToRem(320)};
    }

    &:nth-of-type(5) {
      width: ${pixelToRem(200)};
      height: ${pixelToRem(200)};
    }

    &:nth-of-type(6) {
      right: -4%;
      width: ${pixelToRem(180)};
      height: ${pixelToRem(180)};
    }
  }

  @media screen and (min-width: 2200px) {
    &:nth-of-type(1) {
      left: 4%;
    }

    &:nth-of-type(2) {
      left: 24%;
    }

    &:nth-of-type(3) {
      left: 12%;
    }

    &:nth-of-type(4) {
      right: 16%;
    }

    &:nth-of-type(5) {
      right: 22%;
    }

    &:nth-of-type(6) {
      right: 4%;
    }
  } ;
`;

export default FranchiseSectionBackground;
