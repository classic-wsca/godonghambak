import { CharacterCarousel } from '~components/carousel';
import { CHARACTER_CAROUSEL_ITEMS } from '~constants/carousel';
import { ImageObject } from '~types/common';

import { render, screen, act } from '../../test-utils';
import { triggerResize } from '../../test-utils/window';

const setup = (images: ImageObject[] = CHARACTER_CAROUSEL_ITEMS) => {
  const utils = render(
    <CharacterCarousel
      images={images}
      imageSize={{ width: 140, height: 138 }}
    />,
  );
  const carousel = screen.getByRole('region');
  const items = screen.queryAllByRole('listitem', { name: 'slide' });

  return { carousel, items, ...utils };
};

describe('Chracter carousel', () => {
  it('should be rendered correctly', () => {
    const { carousel } = setup();

    expect(carousel).toBeInTheDocument();
  });

  it('should render nothing if images length are zero', () => {
    const { carousel, items } = setup([]);

    expect(carousel).toBeInTheDocument();
    expect(items.length).toBe(0);
  });

  it('should clone the items according to screen size', () => {
    const { items, getAllByRole } = setup();
    const defaultItemCount = items.length;

    act(() => {
      triggerResize('width', 1440);
    });

    const itemsOfLargeScreen = getAllByRole('listitem', {
      name: /slide/i,
    });

    expect(itemsOfLargeScreen.length).toBeGreaterThanOrEqual(defaultItemCount);

    act(() => {
      triggerResize('width', 600);
    });

    const itemsOfSmallScreen = getAllByRole('listitem', {
      name: /slide/i,
    });

    expect(itemsOfSmallScreen.length).toBeLessThanOrEqual(defaultItemCount);

    act(() => {
      triggerResize('width', 400);
    });

    const itemsOfSmallestScreen = getAllByRole('listitem', {
      name: /slide/i,
    });

    expect(itemsOfSmallestScreen.length).toBeLessThanOrEqual(defaultItemCount);
  });
});
