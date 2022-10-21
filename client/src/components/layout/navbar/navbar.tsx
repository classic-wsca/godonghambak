import type { NavigationSubRoutes } from '~types/navigation';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import NavItem from './nav-item';
import NavToggle from './nav-toggle';

import { Button } from '~components/common';

import { useToggle, useStopAnimationOnResize } from '~hooks/index';
import { NAVIGATION_ROUTES } from '~constants/navigation';
import { pixelToRem } from '~utils/style-utils';

const Navbar = () => {
  const router = useRouter();
  const [isOpen, toggle] = useToggle();
  const { ref, isOnResize } = useStopAnimationOnResize();

  const isCurrentRoute = (href: string, subRoutes: NavigationSubRoutes[]) => {
    if (href === router.asPath) {
      return true;
    }

    const filteredSubRoutes = subRoutes.filter(
      ({ href: subHref }) => subHref === router.asPath,
    );

    return !!filteredSubRoutes.length;
  };

  return (
    <>
      <Header>
        <Link href="/" passHref>
          <Logo href="replace" aria-label="logo">
            <Image src="/images/logo.png" alt="logo" layout="fill" priority />
          </Logo>
        </Link>
        <Nav ref={ref} isOpen={isOpen} isOnResize={isOnResize}>
          <Image src="/images/logo-mb.png" alt="logo" width={40} height={36} />
          <NavList>
            {NAVIGATION_ROUTES.map(({ text, href, subRoutes }) => (
              <li key={text}>
                <NavItem
                  href={href}
                  text={text}
                  aria-label={text}
                  subRoutes={subRoutes}
                  isActive={isCurrentRoute(href, subRoutes)}
                />
              </li>
            ))}
          </NavList>
          <LoginButtonGroup>
            <Link href="/login" passHref>
              <Button as="a" type="button" variant="ghost" aria-label="login">
                Login
              </Button>
            </Link>
            <Link href="/join" passHref>
              <Button as="a" type="button" aria-label="join">
                Join
              </Button>
            </Link>
          </LoginButtonGroup>
        </Nav>
        <NavToggle isOpen={isOpen} onClick={toggle} />
      </Header>
      <Backdrop
        data-testid="navigation-backdrop"
        isOpen={isOpen}
        onClick={toggle}
      />
    </>
  );
};

const Header = styled.header`
  position: sticky;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 85%;
  margin: 0 auto;
  padding: 0 ${pixelToRem(50)};
  border-radius: 0 0 ${pixelToRem(20)} ${pixelToRem(20)};
  background-color: ${({ theme }) => theme.colors.light};
  box-shadow: 0 1px 2px rgba(0, 0, 0, 12%), 0 4px 8px rgba(0, 0, 0, 6%);
  z-index: 999;

  @media screen and (max-width: 1300px) {
    width: 90%;
  }

  @media ${({ theme }) => theme.breakPoints.extraLarge} {
    width: 100%;
  }

  @media ${({ theme }) => theme.breakPoints.large} {
    height: ${pixelToRem(60)};
    padding: ${pixelToRem(20)};
    border-radius: 0;
  }
`;

const Nav = styled.nav<{ isOpen: boolean; isOnResize: boolean }>`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: ${pixelToRem(60)};
  border-radius: 0 0 ${pixelToRem(20)} ${pixelToRem(20)};
  background-color: ${({ theme }) => theme.colors.light};
  z-index: 1000;

  img {
    display: none !important;
  }

  @media ${({ theme }) => theme.breakPoints.extraLarge} {
    gap: ${pixelToRem(40)};
  }

  @media ${({ theme }) => theme.breakPoints.large} {
    position: absolute;
    top: 0;
    right: 0;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 40vw;
    min-height: 100vh;
    padding: ${pixelToRem(12)} ${pixelToRem(24)};
    border-radius: 0;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.2), 0 2px 4px rgba(0, 0, 0, 0.1);
    transform: ${({ isOpen }) => (isOpen ? 'none' : `translateX(40vw)`)};
    transition: ${({ isOnResize }) =>
      isOnResize
        ? 'none'
        : `transform 500ms cubic-bezier(0.6, 0.05, 0.28, 0.91)`};

    img {
      display: block !important;
    }
  }

  @media ${({ theme }) => theme.breakPoints.medium} {
    width: 60vw;
    transform: ${({ isOpen }) => (isOpen ? 'none' : `translateX(60vw)`)};
  }

  @media ${({ theme }) => theme.breakPoints.small} {
    width: 100%;
    transform: ${({ isOpen }) => (isOpen ? 'none' : `translateX(100%)`)};
  }
`;

const NavList = styled.ul`
  display: flex;
  gap: ${pixelToRem(50)};
  margin: 0;
  color: ${({ theme }) => theme.colors.dark};

  & > li {
    position: relative;
  }

  & > li:hover > a {
    color: ${({ theme }) => theme.colors.yellow};
  }

  & > li:hover > a:after {
    transform: scaleX(1);
    transform-origin: bottom left;
  }

  @media ${({ theme }) => theme.breakPoints.extraLarge} {
    gap: ${pixelToRem(40)};
  }

  @media ${({ theme }) => theme.breakPoints.large} {
    flex-direction: column;
    gap: 0;
    width: 100%;
  }
`;

const LoginButtonGroup = styled.div`
  display: flex;
  gap: ${pixelToRem(20)};

  @media ${({ theme }) => theme.breakPoints.extraLarge} {
    gap: ${pixelToRem(10)};
  }

  @media ${({ theme }) => theme.breakPoints.large} {
    width: 100%;
    gap: ${pixelToRem(40)};
    justify-content: space-between;

    a {
      width: 100%;
    }
  }
`;

const Logo = styled.a`
  position: relative;
  display: block;
  width: ${pixelToRem(160)};
  height: ${pixelToRem(44)};

  img {
    width: 100%;
  }

  @media ${({ theme }) => theme.breakPoints.large} {
    width: ${pixelToRem(120)};
    height: ${pixelToRem(33)};
  }
`;

const Backdrop = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => `${theme.colors.dark}40`};
  z-index: 998;
`;

export default Navbar;
