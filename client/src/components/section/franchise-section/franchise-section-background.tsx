/* eslint-disable react/no-array-index-key */

import type { Position } from '~types/common';

import Image from 'next/image';
import React, { useState, useCallback } from 'react';
import styled from 'styled-components';

import { CHARACTER_CAROUSEL_ITEMS } from '~constants/carousel';
import { useThrottle } from '~hooks/index';

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

  &:nth-of-type(1) {
    top: 60%;
    left: -4%;
    width: 16vmin;
    height: 16vmin;
  }

  &:nth-of-type(2) {
    bottom: -5%;
    left: 10%;
    width: 30vmin;
    height: 30vmin;
  }

  &:nth-of-type(3) {
    top: -8%;
    left: -8%;
    width: 38vmin;
    height: 38vmin;
  }

  &:nth-of-type(4) {
    bottom: 15%;
    right: 2%;
    width: 22vmin;
    height: 22vmin;
  }

  &:nth-of-type(5) {
    top: -5%;
    right: 15%;
    width: 18vmin;
    height: 18vmin;
  }

  &:nth-of-type(6) {
    top: 30%;
    right: -8%;
    width: 16vmin;
    height: 16vmin;
  }
`;

export default FranchiseSectionBackground;
