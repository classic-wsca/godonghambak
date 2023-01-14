import userEvent from '@testing-library/user-event';

import { MenuCard } from '~components/card';

import { render, screen } from '../../test-utils';

const setup = () => {
  const user = userEvent.setup({ delay: null });
  const props = {
    name: '고동함박',
    description: '울 할머니 오리지널 레시피^^ 새콤달콤 함박스떼끼 소스',
    price: 10900,
    image: '/images/menu/01.png',
  };

  const utils = render(<MenuCard {...props} />);

  return { user, ...props, ...utils };
};

describe('메뉴 카드 컴포넌트 테스트', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it('카드를 렌더링 할 수 있어야 한다.', () => {
    // given
    const { container } = setup();

    // when
    // then
    expect(container).toBeInTheDocument();
  });

  it('카드를 렌더링하면 이미지가 보여야 한다.', () => {
    // given
    const { name } = setup();
    const image = screen.getByAltText(name);

    // when
    // then
    expect(image).toBeInTheDocument();
  });

  it('마우스를 카드에 올리기 전까지 이미지만 보여야 한다.', () => {
    // given
    const { name, description, price } = setup();
    const title = screen.getByText(name);
    const content = screen.getByText(description);
    const span = screen.getByText(`${price.toLocaleString('ko-KR')}원`);

    // when
    // then
    expect(title).not.toBeVisible();
    expect(content).not.toBeVisible();
    expect(span).not.toBeVisible();
  });
});
