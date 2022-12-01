import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';

import { FOOTER_NAVIGATION_ROUTES } from '~constants/navigation';
import { pixelToRem } from '~utils/style-utils';

import PageList from './page-list';

const Footer = () => {
  return (
    <FooterContainer>
      <PageInfo>
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
        {FOOTER_NAVIGATION_ROUTES.map(({ text, subRoutes }) => (
          <PageList key={text} text={text} subRoutes={subRoutes} />
        ))}
      </PageInfo>
      <DivisionLine />
      <CompanyInfo>
        <ul>
          <li>
            <Link href="https://www.instagram.com/godonghambak/" passHref>
              <a href="replace" aria-label="company link">
                고동컴퍼니
              </a>
            </Link>
          </li>
          <li>
            주소지: 서울특별시 구로구 경인로 661, 신도림 푸르지오 오피스 104동
            601호
          </li>
          <li>대표이사: 노경봉</li>
          <li>사업자 등록번호: 000-00-00000</li>
          <li>Copyright ⓒ 2022 고동함박 All Rights Reserved</li>
        </ul>
      </CompanyInfo>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  position: relative;
  max-width: ${pixelToRem(1440)};
  margin: 0 auto;
  padding: ${pixelToRem(140)} ${pixelToRem(120)};
  background-color: ${({ theme }) => theme.colors.light};
  color: ${({ theme }) => theme.colors.dark};

  @media ${({ theme }) => theme.breakPoints.extraLarge} {
    padding: ${pixelToRem(140)} ${pixelToRem(60)};
  }

  @media ${({ theme }) => theme.breakPoints.medium} {
    padding: ${pixelToRem(60)} ${pixelToRem(16)};
  }
`;

const PageInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 50px;

  @media ${({ theme }) => theme.breakPoints.extraLarge} {
    grid-template-columns: repeat(3, 1fr);
  }

  @media ${({ theme }) => theme.breakPoints.medium} {
    display: flex;
    flex-direction: column;
    gap: 0;
  }
`;

const Logo = styled.div`
  position: relative;

  img {
    user-select: none;
    pointer-events: none;
  }

  @media ${({ theme }) => theme.breakPoints.extraLarge} {
    display: none;
  }
`;

const CompanyInfo = styled.div`
  color: ${({ theme }) => theme.colors.gray_600};

  li {
    padding: ${pixelToRem(4)} 0;
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }

  li:first-child {
    color: ${({ theme }) => theme.colors.dark};
  }
`;

const DivisionLine = styled.hr`
  margin-top: ${pixelToRem(60)};
  margin-bottom: ${pixelToRem(40)};
  border: none;
  border-top: 1px solid ${({ theme }) => theme.colors.gray};
`;

export default Footer;
