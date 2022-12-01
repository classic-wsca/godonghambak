import { MainSection } from '~components/section';

import { render, screen } from '../../test-utils';

describe('메인 섹션 컴포넌트 테스트', () => {
  it('should render correctly', () => {
    render(<MainSection />);
    const mainSection = screen.getByRole('region', { name: /main-section/i });

    expect(mainSection).toBeInTheDocument();
  });

  it('should render carrousel', () => {
    render(<MainSection />);
    const carousel = screen.getByRole('region', { name: /carousel/i });

    expect(carousel).toBeInTheDocument();
  });
});
