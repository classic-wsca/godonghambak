import { render, screen } from '../../test-utils';

import { CompetitivitySection } from '~components/section';

describe('Competitivity section', () => {
  it('should be rendered correctly', () => {
    render(<CompetitivitySection />);

    const section = screen.getByRole('region', { name: /경쟁력/i });

    expect(section).toBeInTheDocument();
  });
});
