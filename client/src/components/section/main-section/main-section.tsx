import styled from 'styled-components';

import { MainCarousel } from '~components/carousel';
import { pixelToRem } from '~utils/style-utils';

const MainSection = () => {
  return (
    <Wrapper role="region" aria-label="main-section">
      <MainCarousel />
    </Wrapper>
  );
};

const Wrapper = styled.section`
  position: relative;
  padding: ${pixelToRem(100)} 0;

  @media ${({ theme }) => theme.breakPoints.large} {
    padding: 0;
  }
`;

export default MainSection;
