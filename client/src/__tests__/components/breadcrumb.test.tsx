import type { NextRouter } from 'next/router';

import { RouterContext } from 'next/dist/shared/lib/router-context';
import userEvent from '@testing-library/user-event';
import { render, screen, createMockRouter } from '../test-utils';

import { Breadcrumb } from '~components/breadcrumb';
import RightBracketSVG from '~public/svgs/chevron-right-thick.svg';

const setup = (
  router: NextRouter,
  seperator: React.ReactNode = <RightBracketSVG />,
) => {
  const user = userEvent.setup();
  const utils = render(
    <RouterContext.Provider value={router}>
      <Breadcrumb seperator={seperator} />
    </RouterContext.Provider>,
  );

  const breadcrumbs = screen.getByLabelText('breadcrumbs');

  return { breadcrumbs, user, ...utils };
};

describe('Breadcrumb component', () => {
  it('shoule be rendered correctly', () => {
    const mockRouter = createMockRouter({
      pathname: '/',
      asPath: '/',
      query: {},
    });

    const { breadcrumbs, getByText } = setup(mockRouter);

    expect(breadcrumbs).toBeInTheDocument();
    expect(getByText('홈')).toBeInTheDocument();
  });

  it('should be rendered according to the pathname', () => {
    const mockRouter = createMockRouter({
      pathname: '/메뉴/[id]',
      asPath: '/메뉴/전체 메뉴',
      query: {
        id: 'all',
      },
    });

    const { breadcrumbs, getByText } = setup(mockRouter);

    expect(breadcrumbs).toBeInTheDocument();
    expect(getByText('홈')).toBeInTheDocument();
    expect(getByText('메뉴')).toBeInTheDocument();
    expect(getByText('전체 메뉴')).toBeInTheDocument();
  });

  it('should navigate accordingly', async () => {
    const mockRouter = createMockRouter({
      pathname: '/menu/[id]',
      asPath: '/menu/all',
      query: {
        id: 'all',
      },
    });

    const { user, getByText } = setup(mockRouter);
    const menuLink = getByText(/menu/i);

    await user.click(menuLink);

    expect(mockRouter.push).toHaveBeenCalledWith('/menu', '/menu', {});
  });
});
