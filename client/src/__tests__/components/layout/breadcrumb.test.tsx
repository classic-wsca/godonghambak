import type { NextRouter } from 'next/router';

import userEvent from '@testing-library/user-event';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import { render, screen, createMockRouter } from '../../test-utils';

import { Breadcrumb } from '~components/layout';
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

  it('should be rendered accordingly by the pathname', () => {
    const mockRouter = createMockRouter({
      pathname: '/store',
      asPath: '/store',
    });

    const { breadcrumbs, getByText } = setup(mockRouter);

    expect(breadcrumbs).toBeInTheDocument();
    expect(getByText('홈')).toBeInTheDocument();
    expect(getByText('고동함박')).toBeInTheDocument();
    expect(getByText('매장 찾기')).toBeInTheDocument();
  });

  it('should navigate accordingly', async () => {
    const mockRouter = createMockRouter({
      pathname: '/menu/[category]',
      asPath: '/menu',
      query: {
        category: 'set',
      },
    });

    const { user, getByText } = setup(mockRouter);
    const menuLink = getByText(/메뉴 소개/i);

    await user.click(menuLink);

    expect(mockRouter.push).toHaveBeenCalledWith('/menu', '/menu', {});
  });
});
