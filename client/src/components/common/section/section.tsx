import type { PropsWithChildren } from 'react';
import type { GlobalColors } from '~types/common';

import styled from 'styled-components';

import { pixelToRem } from '~utils/style-utils';

interface SectionProps extends PropsWithChildren {
  backgroundColor?: GlobalColors;
}

const Section = ({ backgroundColor = 'light', children }: SectionProps) => {
  return (
    <SectionBase backgroundColor={backgroundColor}>{children}</SectionBase>
  );
};

const SectionBase = styled.section<{
  backgroundColor: GlobalColors;
}>`
  position: relative;
  background-color: ${({ theme, backgroundColor }) =>
    theme.colors[backgroundColor]};

  @media ${({ theme }) => theme.breakPoints.medium} {
    font-size: ${pixelToRem(14)};
  }
`;

export default Section;
