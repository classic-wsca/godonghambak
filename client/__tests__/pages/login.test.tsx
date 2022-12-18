import LoginPage from '~pages/login';

import { render } from '../test-utils';

const setup = () => {
  const utils = render(<LoginPage />);

  return { ...utils };
};

describe('로그인 페이지 테스트', () => {
  it('로그인 페이지 제목을 렌더링해야 한다.', () => {
    // given
    const { getByRole } = setup();
    const title = getByRole('heading', { name: /로그인/i });

    // when
    // then
    expect(title).toBeInTheDocument();
  });

  it('로그인 페이지 문구를 렌더링해야 한다.', () => {
    // given
    const { getByText } = setup();
    const paragraph = getByText(
      '즐거움과 재미가 가득한 고동함박에 오신 것을 환영합니다!',
    );

    // when
    // then
    expect(paragraph).toBeInTheDocument();
  });

  it('로그인 폼을 렌더링해야 한다.', () => {
    // given
    const { getByRole } = setup();
    const loginForm = getByRole('form', { name: /login/i });

    // when
    // then
    expect(loginForm).toBeInTheDocument();
  });
});
