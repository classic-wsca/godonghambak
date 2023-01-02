import { StoreCard } from '~components/card';

import { render, screen } from '../../test-utils';

const setup = () => {
  const props = {
    region: '서울',
    name: '신도림점',
    address: '서울시 영등포구 경인로 72길 6 1층',
    image: '/images/store.png',
  };

  const utils = render(<StoreCard data-testid="card" {...props} />);

  return { ...props, ...utils };
};

describe('스토어 카드 컴포넌트 테스트', () => {
  it('카드를 렌더링하면 지역이 보여져야 한다.', () => {
    // given
    const { region } = setup();

    // when
    // then
    expect(screen.getByRole('heading', { name: region })).toBeInTheDocument();
  });

  it('카드를 렌더링하면 매장명이 보여져야 한다.', () => {
    // given
    const { name } = setup();

    // then
    expect(screen.getByRole('heading', { name })).toBeInTheDocument();
  });

  it('카드를 렌더링하면 매장 주소가 보여져야 한다.', () => {
    // given
    const { address } = setup();

    // then
    expect(screen.getByText(address)).toBeInTheDocument();
  });

  it('카드를 렌더링하면 매장 사진이 보여져야 한다.', () => {
    // given
    const { name } = setup();

    // then
    expect(screen.getByAltText(name)).toBeInTheDocument();
  });
});
