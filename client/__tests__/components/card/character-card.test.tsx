import { CharacterCard } from '~components/card';

import { render, screen } from '../../test-utils';

interface TestComponentProps {
  title: string;
  content: string;
  image: string;
}

const TestComponent = ({ title, content, image }: TestComponentProps) => {
  return <CharacterCard title={title} content={content} image={image} />;
};

describe('캐릭터 카드 컴포넌트 테스트', () => {
  it('카드의 제목을 렌더링 할 수 있어야 한다.', () => {
    // given
    const title = '고동이';
    const content = '고동함박 요리사';
    const image = '/images/character-godong';

    // when
    render(<TestComponent title={title} content={content} image={image} />);

    // then
    expect(screen.getByRole('heading', { name: '고동이' })).toBeInTheDocument();
  });

  it('카드의 내용을 렌더링 할 수 있어야 한다.', () => {
    // given
    const title = '고동이';
    const content = '고동함박 요리사';
    const image = '/images/character-godong';

    // when
    render(<TestComponent title={title} content={content} image={image} />);

    // then
    expect(screen.getByText('고동함박 요리사')).toBeInTheDocument();
  });

  it('카드의 이미지를 렌더링 할 수 있어야 한다.', () => {
    // given
    const title = '고동이';
    const content = '고동함박 요리사';
    const image = '/images/character-godong';

    // when
    render(<TestComponent title={title} content={content} image={image} />);

    // then
    expect(screen.getByAltText('고동이')).toBeInTheDocument();
  });
});
