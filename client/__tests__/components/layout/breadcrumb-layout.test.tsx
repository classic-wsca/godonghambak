import { RouterContext } from 'next/dist/shared/lib/router-context';
import { NextRouter } from 'next/router';

import { BreadcrumbLayout } from '~components/layout';

import { render, createMockRouter } from '../../test-utils';

const setup = (router: NextRouter) => {
  const utils = render(
    <RouterContext.Provider value={router}>
      <BreadcrumbLayout />
    </RouterContext.Provider>,
  );

  return { ...utils };
};

describe('Breadcrumb 레이아웃 컴포넌트 테스트', () => {
  it('Breadcrumb를 화면에 렌더링해야 한다.', () => {
    // given
    const { queryByLabelText } = setup(createMockRouter({}));
    const breadcrumb = queryByLabelText('breadcrumbs');

    // when
    // then
    expect(breadcrumb).toBeInTheDocument();
  });

  it.each(['/brand', '/store', '/menu'])(
    '현재 페이지에 맞게 현재 경로를 화면에 렌더링해야 한다.',
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
