import type { ReactElement } from 'react';

import Link from 'next/link';
import styled from 'styled-components';

import { StoreCard } from '~components/card';
import { Heading } from '~components/common';
import { BreadcrumbLayout } from '~components/layout';
import { STORE_LIST } from '~constants/store';
import { pixelToRem } from '~utils/style-utils';

const Store = () => {
  return (
    <Wrapper>
      <Section>
        <StoreHeading as="h2">고동함박 매장 안내</StoreHeading>
        <StoreCards>
          {STORE_LIST.map(({ address, name, image }) => (
            <li key={name} aria-label={name}>
              <Link href={`/store/${name}`} passHref>
                <a href="replace" aria-label={name}>
                  <StoreCard
                    region={`${address.slice(0, 2)}`}
                    name={name}
                    address={address}
                    image={image}
                  />
                </a>
              </Link>
            </li>
          ))}
        </StoreCards>
      </Section>
    </Wrapper>
  );
};

Store.getLayout = function getLayout(page: ReactElement) {
  return <BreadcrumbLayout>{page}</BreadcrumbLayout>;
};

const Wrapper = styled.div`
  position: relative;
  max-width: ${pixelToRem(1440)};
  margin: 0 auto;
  padding: 0 ${pixelToRem(120)};
  color: ${({ theme }) => theme.colors.dark};

  @media ${({ theme }) => theme.breakPoints.extraLarge} {
    padding: 0 ${pixelToRem(60)};
  }

  @media ${({ theme }) => theme.breakPoints.medium} {
    padding: 0 ${pixelToRem(16)};
  }
`;

const StoreHeading = styled(Heading)`
  font-size: ${({ theme }) => theme.fontSizes['6xl']};
  text-align: center;

  @media ${({ theme }) => theme.breakPoints.large} {
    font-size: ${({ theme }) => theme.fontSizes['5xl']};
  }

  @media ${({ theme }) => theme.breakPoints.medium} {
    font-size: ${({ theme }) => theme.fontSizes['3xl']};
  }

  @media ${({ theme }) => theme.breakPoints.small} {
    font-size: ${({ theme }) => theme.fontSizes['2xl']};
  }
`;

const Section = styled.section`
  margin: ${pixelToRem(120)} 0;
  text-align: center;
  word-break: keep-all;

  @media ${({ theme }) => theme.breakPoints.medium} {
    margin: ${pixelToRem(80)} 0;
  }

  @media ${({ theme }) => theme.breakPoints.small} {
    margin: ${pixelToRem(40)} 0;
  }
`;

const StoreCards = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: space-between;
  width: 100%;
  margin-top: ${pixelToRem(80)};

  & > li:first-of-type > a > div {
    border-top: 1px solid ${({ theme }) => theme.colors.gray};
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray};
  }

  & > li > a > div {
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray};
  }

  @media ${({ theme }) => theme.breakPoints.medium} {
    margin-top: ${pixelToRem(60)};
  }

  @media ${({ theme }) => theme.breakPoints.small} {
    margin-top: ${pixelToRem(40)};
  }
`;

export default Store;
