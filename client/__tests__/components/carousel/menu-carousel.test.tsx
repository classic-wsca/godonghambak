import userEvent from '@testing-library/user-event';

import { MenuCarousel } from '~components/carousel/menu-carousel';

import { render, screen, act } from '../../test-utils';
import { getRandomBrowserSize, triggerResize } from '../../test-utils/window';

const setup = () => {
  const user = userEvent.setup();
  const utils = render(<MenuCarousel />);
  const carousel = screen.getByRole('region');

  return { user, carousel, ...utils };
};

describe('Menu Carousel', () => {
  it('should be rendered correctly', () => {
    const { carousel } = setup();

    expect(carousel).toBeInTheDocument();
  });

  it('should be rendered at several browser sizes', () => {
    const { carousel } = setup();
    const randomBrowserSize = getRandomBrowserSize();

    act(() => {
      triggerResize('width', randomBrowserSize);
    });

    expect(carousel).toBeInTheDocument();
  });

  it('should be able to be focused', async () => {
    const { user, carousel } = setup();

    await user.tab();

    expect(carousel).toHaveFocus();
  });
});
