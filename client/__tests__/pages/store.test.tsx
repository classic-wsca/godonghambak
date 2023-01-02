import userEvent from '@testing-library/user-event';
import { RouterContext } from 'next/dist/shared/lib/router-context';

import Store from '~pages/store';

import { render, createMockRouter } from '../test-utils';

const setup = () => {
  const user = userEvent.setup();
  const router = createMockRouter({});
  const utils = render(
    <RouterContext.Provider value={router}>
      <Store />
    </RouterContext.Provider>,
  );

  return { user, router, ...utils };
};

describe('매장 찾기 페이지 테스트', () => {
  it('페이지 제목을 렌더링해야 한다.', () => {
    // given
    const { getByRole } = setup();
    const title = getByRole('heading', { name: '고동함박 매장 안내' });

    // when
    // then
    expect(title).toBeInTheDocument();
  });

  it.each(['신도림점', '송리단길점', '송도 타임스페이스점', '인천 스퀘어원점'])(
    '매장 목록을 렌더링해야 한다.',
    (name) => {
      // given
      const { getByRole } = setup();
      const store = getByRole('listitem', { name });

      // when
      // then
      expect(store).toBeInTheDocument();
    },
  );

  it.each(['신도림점', '송리단길점', '송도 타임스페이스점', '인천 스퀘어원점'])(
    '매장을 클릭하면 해당 매장 페이지로 이동해야 한다.',
    async (name) => {
      // given
      const { user, router, getByRole } = setup();
      const store = getByRole('link', { name });
      const path = `/store/${encodeURIComponent(name)}`;

      // when
      await user.click(store);

      // then
      expect(router.push).toHaveBeenCalledWith(path, path, {});
    },
  );
});
