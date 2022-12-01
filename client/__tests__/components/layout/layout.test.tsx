import { RouterContext } from 'next/dist/shared/lib/router-context';
import { NextRouter } from 'next/router';

import { Layout } from '~components/layout';

import { render, createMockRouter } from '../../test-utils';

const setup = (router: NextRouter) => {
  const utils = render(
    <RouterContext.Provider value={router}>
      <Layout />
    </RouterContext.Provider>,
  );

  return { ...utils };
};

describe('기본 레이아웃 컴포넌트 테스트', () => {
  it('should render navbar', () => {
    // given
    const { getByRole } = setup(createMockRouter({}));
    const navbar = getByRole('navigation');

    // when
    // then
    expect(navbar).toBeInTheDocument();
  });

  it('should render footer', () => {
    // given
    const { getByRole } = setup(createMockRouter({}));
    const footer = getByRole('contentinfo');

    // when
    // then
    expect(footer).toBeInTheDocument();
  });

  it('should not render breadcrumb if current page is homepage', () => {
    // given
    const { queryByLabelText } = setup(createMockRouter({}));
    const breadcrumb = queryByLabelText('breadcrumbs');

    // when
    // then
    expect(breadcrumb).not.toBeInTheDocument();
  });

  it.each(['/brand', '/store', '/menu'])(
    'should render breadcrumb except for the homepage',
    (path) => {
      // given
      const mockRouter = createMockRouter({
        pathname: path,
        asPath: path,
        query: {},
      });
      const { queryByLabelText } = setup(mockRouter);
      const breadcrumb = queryByLabelText('breadcrumbs');

      // when
      // then
      expect(breadcrumb).toBeInTheDocument();
    },
  );
});
