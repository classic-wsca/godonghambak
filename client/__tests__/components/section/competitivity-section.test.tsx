import { CompetitivitySection } from '~components/section';

import { render, screen } from '../../test-utils';

describe('Competitivity section', () => {
  it('should be rendered correctly', () => {
    render(<CompetitivitySection />);

    const section = screen.getByRole('region', { name: /경쟁력/i });

    expect(section).toBeInTheDocument();
  });
});
