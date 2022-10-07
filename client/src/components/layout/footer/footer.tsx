/* eslint-disable react/no-array-index-key */
import type { UnderlineAnimation } from '~styles/animations';

import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';

import { FOOTER_PAGE_INFOS, FOOTER_COMPANY_INFOS } from '~constants/footer';
import { underlineAnimation } from '~styles/animations';
import { pixelToRem } from '~utils/style-utils';

const Footer = () => {
  return (
    <FooterContainer>
      <PageInfo>
        {FOOTER_PAGE_INFOS.map(({ title, items }) => (
          <PageDetailList key={title}>
            <PageDetailTitle>{title}</PageDetailTitle>
            {items.map(({ content, href, highlight }) => (
              <li key={content}>
                <Link href={href} passHref>
                  <PageDetailItem
                    href="replace"
                    color="#707070"
                    highlight={highlight ? '#fdc47c' : ''}
                    aria-label={content}
                  >
                    {content}
                  </PageDetailItem>
                </Link>
              </li>
            ))}
          </PageDetailList>
        ))}
      </PageInfo>
      <DivisionLine />
      <CompanyInfo>
        <CompanyDetailList>
          {FOOTER_COMPANY_INFOS.map((item, index) =>
            index === 0 ? (
              <CompanyDetailItem key={index} highlight>
                <Link
                  href="https://www.instagram.com/godonghambak/"
                  passHref
                  aria-label="company link"
                >
                  <a href="replace">{item}</a>
                </Link>
              </CompanyDetailItem>
            ) : (
              <CompanyDetailItem key={index}>{item}</CompanyDetailItem>
            ),
          )}
        </CompanyDetailList>
        <Logo>
          <Link href="/" passHref>
            <a href="replace" aria-label="site logo">
              <Image
                src="/images/logo.png"
                alt="logo"
                width={160}
                height={44}
              />
            </a>
          </Link>
        </Logo>
      </CompanyInfo>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  position: relative;
  max-width: ${pixelToRem(1440)};
  margin: 0 auto;
  padding: ${pixelToRem(140)} ${pixelToRem(120)};
  color: ${({ theme }) => theme.colors.dark};

  @media ${({ theme }) => theme.breakPoints.extraLarge} {
    padding: ${pixelToRem(140)} ${pixelToRem(60)};
  }

  @media ${({ theme }) => theme.breakPoints.medium} {
    padding: ${pixelToRem(140)} ${pixelToRem(16)};
  }
`;

const PageInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  @media ${({ theme }) => theme.breakPoints.extraLarge} {
    /* grid-template-columns: repeat(3, 1fr); */
  }
`;

const Logo = styled.div`
  @media ${({ theme }) => theme.breakPoints.extraLarge} {
    display: none;
  }

  img {
    user-select: none;
    pointer-events: none;
  }
`;

const PageDetailList = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: ${pixelToRem(20)};
  margin: 0;
`;

const PageDetailTitle = styled.h4`
  margin-top: 0;
  margin-bottom: ${pixelToRem(20)};
`;

const PageDetailItem = styled.a<UnderlineAnimation>`
  display: inline-block;
  font-size: ${({ theme }) => theme.fontSizes.small};
  transition: font-weight 250ms ease-in, color 250ms ease-in;

  &:hover {
    color: ${({ theme, highlight }) => !highlight && theme.colors.dark};
    font-weight: 500;
  }

  ${underlineAnimation}
`;

const CompanyInfo = styled.div`
  color: ${({ theme }) => theme.colors.gray_600};
`;

const CompanyDetailList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${pixelToRem(8)};
`;

const CompanyDetailItem = styled.li<{ highlight?: boolean }>`
  font-size: ${({ theme }) => theme.fontSizes.small};
  color: ${({ theme, highlight }) => highlight && theme.colors.dark};
`;

const DivisionLine = styled.hr`
  margin-top: ${pixelToRem(60)};
  margin-bottom: ${pixelToRem(40)};
  border: none;
  border-top: 1px solid ${({ theme }) => theme.colors.gray};
`;

export default Footer;
