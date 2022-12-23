import type { Direction } from '~types/common';

import { FeatureCard } from '~components/card';

import { render, screen } from '../../test-utils';

interface TestComponentProps {
  title: string;
  content: string;
  image: string;
  direction?: Extract<Direction, 'left' | 'right'>;
}

const TestComponent = ({
  title,
  content,
  image,
  direction = 'left',
}: TestComponentProps) => {
  return (
    <FeatureCard
      title={title}
      content={content}
      image={image}
      direction={direction}
    />
  );
};

describe('피처 카드 컴포넌트 테스트', () => {
  it('카드의 제목을 렌더링 할 수 있어야 한다.', () => {
    // given
    const title = '육즙 가득 품은 함박 스테이크';
    const content = '매일매일 조리하는 함박 스테이크';
    const image = '/images/feature-hambak';

    // when
    render(<TestComponent title={title} content={content} image={image} />);

    // then
    expect(
      screen.getByRole('heading', { name: '육즙 가득 품은 함박 스테이크' }),
    ).toBeInTheDocument();
  });

  it('카드의 내용을 렌더링 할 수 있어야 한다.', () => {
    // given
    const title = '육즙 가득 품은 함박 스테이크';
    const content = '매일매일 조리하는 함박 스테이크';
    const image = '/images/feature-hambak';

    // when
    render(<TestComponent title={title} content={content} image={image} />);

    // then
    expect(
      screen.getByText('매일매일 조리하는 함박 스테이크'),
    ).toBeInTheDocument();
  });

  it('카드의 이미지를 렌더링 할 수 있어야 한다.', () => {
    // given
    const title = '육즙 가득 품은 함박 스테이크';
    const content = '매일매일 조리하는 함박 스테이크';
    const image = '/images/feature-hambak';

    // when
    render(<TestComponent title={title} content={content} image={image} />);

    // then
    expect(
      screen.getByAltText('육즙 가득 품은 함박 스테이크'),
    ).toBeInTheDocument();
  });

  it('카드의 방향을 변경해도 렌더링 할 수 있어야 한다.', () => {
    // given
    const title = '육즙 가득 품은 함박 스테이크';
    const content = '매일매일 조리하는 함박 스테이크';
    const image = '/images/feature-hambak';
    const direction = 'right';

    // when
    render(
      <TestComponent
        title={title}
        content={content}
        image={image}
        direction={direction}
      />,
    );

    // then
    expect(
      screen.getByAltText('육즙 가득 품은 함박 스테이크'),
    ).toBeInTheDocument();
  });
});
