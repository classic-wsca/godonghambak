import type { NextRouter } from 'next/router';
import type { NavigationRoutes } from '~types/navigation';

import userEvent from '@testing-library/user-event';
import { RouterContext } from 'next/dist/shared/lib/router-context';

import { Navbar } from '~components/navbar';
import NavToggle from '~components/navbar/nav-toggle';
import { NAVIGATION_ROUTES } from '~constants/navigation';
import { getRandomNumber } from '~utils/math-utils';

import { render, screen, createMockRouter } from '../test-utils';

const getRandomLink = (links: NavigationRoutes[] = []) => {
  const randomIndex: number = getRandomNumber(0, links.length);

  return links[randomIndex];
};

const getRandomLinks = () => {
  const randomNavLink = getRandomLink(NAVIGATION_ROUTES);
  const randomSubLink = getRandomLink(
    randomNavLink.subRoutes as NavigationRoutes[],
  );

  return { randomNavLink, randomSubLink };
};

const setup = (mockRouter: Partial<NextRouter> = {}) => {
  const user = userEvent.setup();
  const router = createMockRouter(mockRouter);
  const utils = render(
    <RouterContext.Provider value={router}>
      <Navbar />
    </RouterContext.Provider>,
  );
  const navbar = screen.getByRole('navigation');
  const { randomNavLink, randomSubLink } = getRandomLinks();
  const loginButton = screen.getByRole('link', { name: /login/i });
  const joinButton = screen.getByRole('link', { name: /join/i });
  const toggleButton = screen.getByLabelText('toggle-navigation');

  return {
    user,
    router,
    navbar,
    randomNavLink,
    randomSubLink,
    loginButton,
    joinButton,
    toggleButton,
    ...utils,
  };
};

describe('Navbar component', () => {
  it('should render correctly', () => {
    const { navbar } = setup();

    expect(navbar).toBeInTheDocument();
  });

  it('should render navigation link', () => {
    const { randomNavLink } = setup();
    const navLink = screen.getByRole('link', { name: randomNavLink.text });

    expect(navLink).toBeInTheDocument();
  });

  it('should link page when click the navigation link', async () => {
    const { user, router, randomNavLink, getByRole } = setup();
    const navLink = getByRole('link', { name: randomNavLink.text });

    await user.click(navLink);

    expect(router.push).toHaveBeenCalledWith(
      `${randomNavLink.href}`,
      `${randomNavLink.href}`,
      {},
    );
  });

  it('should link page when click the navigation sub link', async () => {
    const { user, router, randomSubLink, getByText } = setup();
    const subLink = getByText(randomSubLink.text);

    await user.click(subLink);

    expect(router.push).toHaveBeenCalledWith(
      `${randomSubLink.href}`,
      `${randomSubLink.href}`,
      {},
    );
  });

  it('should render login and join button', () => {
    const { loginButton, joinButton } = setup();

    expect(loginButton).toBeInTheDocument();
    expect(joinButton).toBeInTheDocument();
  });

  it('should link page when click login button', async () => {
    const { user, router, loginButton } = setup();

    await user.click(loginButton);

    expect(router.push).toHaveBeenCalledWith('/login', '/login', {});
  });

  it('should link page when click join button', async () => {
    const { user, router, joinButton } = setup();

    await user.click(joinButton);

    expect(router.push).toHaveBeenCalledWith('/join', '/join', {});
  });

  it('should render toggle button', () => {
    const { toggleButton } = setup();

    expect(toggleButton).toBeInTheDocument();
  });

  it('should call toggle function when you click toggle button', async () => {
    const mockProps = {
      isOpen: false,
      onClick: jest.fn(),
    };
    render(<NavToggle {...mockProps} />);
    const toggleButton = screen.getByLabelText('toggle-navigation');

    await userEvent.click(toggleButton);

    expect(mockProps.onClick).toHaveBeenCalledTimes(1);
  });

  it('should change navigation visible state when you click toggle button', async () => {
    const mockProps = {
      isOpen: false,
      onClick: () => {
        mockProps.isOpen = !mockProps.isOpen;
      },
    };
    render(<NavToggle {...mockProps} />);
    const toggleButton = screen.getByLabelText('toggle-navigation');

    await userEvent.click(toggleButton);

    expect(mockProps.isOpen).toBe(true);
  });
});
