import userEvent from '@testing-library/user-event';
import { RouterContext } from 'next/dist/shared/lib/router-context';

import { MainCarousel } from '~components/carousel';
import { MAIN_CAROUSEL_ITEMS } from '~constants/carousel';

import { render, screen, act, createMockRouter } from '../../test-utils';
import { getRandomBrowserSize, triggerResize } from '../../test-utils/window';

const setup = () => {
  const user = userEvent.setup();
  const router = createMockRouter({});
  const utils = render(
    <RouterContext.Provider value={router}>
      <MainCarousel />
    </RouterContext.Provider>,
  );
  const carousel = screen.getByRole('region');
  const linkButtons = screen.getAllByRole('link', { name: 'link-button' });

  return { user, router, carousel, linkButtons, ...utils };
};

describe('MainCarousel', () => {
  it('should be rendered correctly', () => {
    const { carousel } = setup();

    expect(carousel).toBeInTheDocument();
  });

  it('should be rendered at several browser size', () => {
    const { carousel } = setup();
    const randomBrowserSize = getRandomBrowserSize();

    act(() => {
      triggerResize('width', randomBrowserSize);
    });

    expect(carousel).toBeInTheDocument();
  });

  it('should render link buttons', () => {
    const { linkButtons } = setup();

    linkButtons.forEach((linkButton) => expect(linkButton).toBeInTheDocument());
  });

  it('should link when you click link button', async () => {
    const { user, router, linkButtons } = setup();
    const [brandButton, storeButton, menuButton] = linkButtons;
    const routes = MAIN_CAROUSEL_ITEMS.map(({ link }) => link.href);

    await user.click(brandButton);
    expect(router.push).toHaveBeenCalledWith(routes[0], routes[0], {});

    await user.click(storeButton);
    expect(router.push).toHaveBeenCalledWith(routes[1], routes[1], {});

    await user.click(menuButton);
    expect(router.push).toHaveBeenCalledWith(routes[2], routes[2], {});
  });
});
