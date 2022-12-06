import type { ReactNode } from 'react';

import { RouterContext } from 'next/dist/shared/lib/router-context';

import { Layout } from '~components/layout';

import { render, createMockRouter } from '../../test-utils';

const setup = (children?: ReactNode) => {
  const router = createMockRouter({});
  const utils = render(
    <RouterContext.Provider value={router}>
      <Layout>{children}</Layout>
    </RouterContext.Provider>,
  );

  return { ...utils };
};

describe('기본 레이아웃 컴포넌트 테스트', () => {
  it('내비게이션 바를 화면에 렌더링해야 한다.', () => {
    // given
    const { getByRole } = setup();
    const navbar = getByRole('navigation');

    // when
    // then
    expect(navbar).toBeInTheDocument();
  });

  it('푸터를 화면에 렌더링해야 한다.', () => {
    // given
    const { getByRole } = setup();
    const footer = getByRole('contentinfo');

    // when
    // then
    expect(footer).toBeInTheDocument();
  });

  it('전달 받은 자식 요소를 화면에 렌더링해야 한다.', () => {
    // given
    const { getByText } = setup(<p>Hello World!</p>);
    const childElement = getByText('Hello World!');

    // when
    // then
    expect(childElement).toBeInTheDocument();
  });
});
