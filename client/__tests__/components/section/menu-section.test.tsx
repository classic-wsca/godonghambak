import { MenuSection } from '~components/section';

import { render, screen } from '../../test-utils';

describe('Menu section component test', () => {
  it('should be rendered correctly', () => {
    render(<MenuSection />);

    const section = screen.getByRole('region', { name: /고동함박 메뉴 소개/i });

    expect(section).toBeInTheDocument();
  });
});
