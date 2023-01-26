import { FranchiseCard } from '~components/card';

import { render, screen } from '../../test-utils';

const setup = () => {
  const props = {
    id: '01',
    title: '가맹점 창업 문의',
    content: '본사 홈페이지, 전화 (1533-0788) 신청 및 접수',
    image: '/svgs/phone.svg',
  };

  const utils = render(<FranchiseCard {...props} />);

  return { ...props, ...utils };
};

describe('가맹점 카드 컴포넌트 테스트', () => {
  it('카드의 번호가 보여야 한다.', () => {
    // given
    const { id } = setup();

    // when
    // then
    expect(screen.getByRole('heading', { name: id })).toBeInTheDocument();
  });

  it('카드의 제목이 보여야 한다.', () => {
    // given
    const { title } = setup();

    // when
    // then
    expect(screen.getByRole('heading', { name: title })).toBeInTheDocument();
  });

  it('카드의 내용이 보여야 한다.', () => {
    // given
    const { content } = setup();

    // when
    // then
    expect(screen.getByText(content)).toBeInTheDocument();
  });

  it('카드의 이미지가 보여야 한다.', () => {
    // given
    const { title } = setup();

    // when
    // then
    expect(screen.getByAltText(title)).toBeInTheDocument();
  });
});
