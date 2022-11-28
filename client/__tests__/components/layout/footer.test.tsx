import type { NextRouter } from 'next/router';

import userEvent from '@testing-library/user-event';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import { render, screen, createMockRouter } from '../../test-utils';

import { Footer } from '~components/layout';

const setup = (router: NextRouter = createMockRouter({})) => {
  const user = userEvent.setup();
  const utils = render(
    <RouterContext.Provider value={router}>
      <Footer />
    </RouterContext.Provider>,
  );
  const footer = screen.getByRole('contentinfo');

  return { user, footer, ...utils };
};

describe('Footer component', () => {
  it('should be rendered correctly', () => {
    const { footer } = setup();

    expect(footer).toBeInTheDocument();
  });

  it('should render pages link', () => {
    const { getAllByRole } = setup();

    const links = getAllByRole('link');

    links.forEach((link) => {
      expect(link).toBeInTheDocument();
    });
  });

  it('should link page when click the links', async () => {
    const mockRouter = createMockRouter({});
    const { user, getByLabelText } = setup(mockRouter);

    const logoLink = getByLabelText(/site logo/i);
    const contactLink = getByLabelText(/문의하기 \(Contact Us\)/i);
    const franchiseLink = getByLabelText(/가맹 문의/i);
    const brandLink = getByLabelText(/브랜드 소개/i);

    await user.click(logoLink);
    expect(mockRouter.push).toHaveBeenCalledWith('/', '/', {});

    await user.click(contactLink);
    expect(mockRouter.push).toHaveBeenCalledWith(
      '/franchise#contact',
      '/franchise#contact',
      {},
    );

    await user.click(franchiseLink);
    expect(mockRouter.push).toHaveBeenCalledWith(
      '/franchise',
      '/franchise',
      {},
    );

    await user.click(brandLink);
    expect(mockRouter.push).toHaveBeenCalledWith('/brand', '/brand', {});
  });
});
